'use server'
import {v4 as uuidv4} from 'uuid'
import { getVerificationTokenByEmail } from '@/data/VertificationToken'
import { db } from '@/lib/db'
import { PasswrodResetTokenByEmail } from '@/data/PasswordResetToken'

export const generatePasswordByToken= async (email:string)=>{       //generating a new pasword 
    const token=uuidv4()
    const expires=new Date(new Date().getTime() +3600*1000)
    const exisitingtoken=await PasswrodResetTokenByEmail(email)     // checking if data is present inor not 
    if(exisitingtoken){
        await db.passwordRestToken.delete({                         // deleting if the data is present 
            where:{id:exisitingtoken.id}
        })
    }
    const passwordgeneratetoken=await db.passwordRestToken.create({         // creating a new token if it is present 
        data:{
            email,token,expires
        }
    })
    return passwordgeneratetoken
}

export  const TokenVerified= async (email:string)=>{
    console.log("Token verified",email)
    const token=uuidv4()
    const expiry=new Date(new Date().getTime() +3600*1000)
    const existingtoken=await getVerificationTokenByEmail(email)
    console.log(existingtoken)
    if(existingtoken){
        await db.verificationToken.delete({
            where:{
                id:existingtoken.id
            }
        })
    }
    const userData={
            email,
            token,
            expiry
    }
    // console.log("userData",userData)
    const verificationToken= await db.verificationToken.create({
            data:userData
    })
    console.log('User created:', verificationToken);
    return verificationToken
    
    
}