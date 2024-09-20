'use server'
import * as z from "zod"
import { loginSchema } from "@/schemas"
import { error } from "console"
export const login= async (value:z.infer<typeof loginSchema>)=>{
    const validateFields=loginSchema.safeParse(value)
    if(!validateFields.success){
        return {error:"invalid login"}
    }
    return{sucess:"login sucessfull"}
}