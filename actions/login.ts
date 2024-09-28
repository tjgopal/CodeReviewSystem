'use server'
import * as z from "zod"
import { loginSchema } from "@/schemas"

import { signIn } from "@/auth"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { AuthError } from "next-auth"
import { getuserByEmail } from "@/data/user"
import { error } from "console"
import { TokenVerified } from "@/lib/token"
import { sendEmailVerification } from "@/lib/mail"
export const login= async (value:z.infer<typeof loginSchema>)=>{
    const validateFields=loginSchema.safeParse(value)
    if(!validateFields.success){
        return {error:"invalid login"}
    }
    const {email,password}=validateFields.data
    const exsistinguser=await getuserByEmail(email)
    if(!exsistinguser || !exsistinguser.email|| !exsistinguser.password){
        return {error:"Inavlid credentails "}
    }
    if(!exsistinguser.emailVerified){
        const verifiedtoken= await TokenVerified(exsistinguser.email)
        await sendEmailVerification(
            verifiedtoken.email,
            verifiedtoken.token
        )
        return {sucess:"email verified"}
    }
    try {
        await signIn('credentials',{
            email,password,
            redirectTo:DEFAULT_LOGIN_REDIRECT
        })
    } catch (error) {
        if(error instanceof AuthError){
            switch(error.type){
                case "CredentialsSignin":
                    return {error:"Inavlid credentials"}
                default:
                    return {error:"soemthing went wrong "}
            }
        }
        throw error
    }
}