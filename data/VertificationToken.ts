import { db } from "@/lib/db"

export const getVerificationTokenByToken= async (token:string)=>{
    try {
         const verifiedtoken= await db.verificationToken.findUnique({
            where:{token}
         })

         return verifiedtoken
    } catch  {
        return null 
    }
}

export const getVerificationTokenByEmail= async (email:string)=>{
    // try {
         const verifiedtoken= await db.verificationToken.findFirst({where:{email}})
         if(verifiedtoken){
            return verifiedtoken
         }
         else{
            console.log("no verified token")
         }
    // } catch  {

    //     return null 
    // }
}