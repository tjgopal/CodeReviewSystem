'use server'
import * as z from "zod"
import { RegisterSchema} from "@/schemas"
import bcrypt from 'bcryptjs'
import { db } from "@/lib/db"
import { error } from "console"
import { getuserByEmail } from "@/data/user"
export const register= async (value:z.infer<typeof RegisterSchema>)=>{
    const validateFields=RegisterSchema.safeParse(value)
    if(!validateFields.success){
        return {error:"invalid login"}
    }
    const {email,password,name}=validateFields.data
    const hashedpassword=await bcrypt.hash(password,10)
    const existingUser=await getuserByEmail(email)
    if(existingUser){
        return {error:"already email exists"}
    }

    const userData={
        name,
        email,
        password:hashedpassword
    }
    console.log(userData)
    try {
        const user = await db.user.create({
          data: userData,
        });
        console.log('User created:', user);
      } catch (error) {
        console.error('Error creating user:', error);
      
    }
    return{sucess:"user created sucessfull"}
}