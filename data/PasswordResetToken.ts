import { db } from "@/lib/db"

export const PasswrodResetTokenByToken= async (token:string)=>{
    try {
        const passwordresettoken=await db.passwordRestToken.findUnique({
            where:{token}
        })
        return passwordresettoken
    } catch  {
        return null
    }
}
export const PasswrodResetTokenByEmail= async (email:string)=>{
    try {
        const passwordresetemail=await db.passwordRestToken.findFirst({
            where:{email}
        })
        return passwordresetemail
    } catch  {
        return null
    }
}