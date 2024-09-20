'use server'
import * as z from "zod"
import { RegisterSchema} from "@/schemas"
import { error } from "console"
export const register= async (value:z.infer<typeof RegisterSchema>)=>{
    const validateFields=RegisterSchema.safeParse(value)
    if(!validateFields.success){
        return {error:"invalid login"}
    }
    return{sucess:"login sucessfull"}
}