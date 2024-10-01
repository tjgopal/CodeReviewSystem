import *  as z from 'zod'

export const ResetSchema =z.object({
    email:z.string().email(),
}) 


export const loginSchema =z.object({
    email:z.string().email(),
    password:z.string().min(1,{
        message:"Pasword required"
    })
}) 

export const RegisterSchema =z.object({
    email:z.string().email(),
    password:z.string().min(6,{
        message:"Minimmum 6 digit required"
    }),
    name:z.string().min(1,{
        message:"name required"
    })

}) 