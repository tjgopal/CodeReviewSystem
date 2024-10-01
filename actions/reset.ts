import { getuserByEmail } from "@/data/user"
import { sendPasswordReset } from "@/lib/mail"
import { generatePasswordByToken } from "@/lib/token"
import { ResetSchema } from "@/schemas"
import { emit } from "process"
import * as z from 'zod'

export const reset= async (values:z.infer<typeof ResetSchema>)=>{
    const validateField=ResetSchema.safeParse(values)
    if(!validateField.success){
        return {error:"invalid credentianls"}
    }
    console.log(validateField)
    const {email}=validateField.data
    console.log(email)
    
    const exisitingUser=await getuserByEmail(email)
    console.log("exisitng user ",exisitingUser) //null
    
    if(!exisitingUser){
        console.log("error")
        return {error:"no user found "}
    }

    //TODO: add  a new reset mail link 
    const passwordtoken=await generatePasswordByToken(email)
    await sendPasswordReset(
        passwordtoken.email,
        passwordtoken.token
    )

    return {success:"reset link sent"}
}