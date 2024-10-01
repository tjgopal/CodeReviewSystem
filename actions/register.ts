'use server'
import * as z from "zod"
import { RegisterSchema} from "@/schemas"
import bcrypt from 'bcryptjs'
import { db } from "@/lib/db"
import { error } from "console"
import { getuserByEmail } from "@/data/user"
import { TokenVerified } from "@/lib/token"
import { sendEmailVerification } from "@/lib/mail"

export const register= async (value:z.infer<typeof RegisterSchema>)=>{
    const validateFields=RegisterSchema.safeParse(value)
    if(!validateFields.success){
        return {error:"invalid login"}
    }
    const {email,password,name}=validateFields.data
    const hashedpassword=await bcrypt.hash(password,10)
    const existingUser=await getuserByEmail(email)
    if(existingUser){
        console.log("adsfads",existingUser)
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
        const userbyemail= await getuserByEmail(userData.email)

      } catch (error) {
        console.error('Error creating user:', error);
      
    }
    const verificationToken = await TokenVerified(email)
   
    await sendEmailVerification(
        verificationToken.email,
        verificationToken.token
    )

    return{sucess:"token sent succesfully"}
}