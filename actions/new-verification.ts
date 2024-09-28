import { getuserByEmail } from "@/data/user"
import { getVerificationTokenByToken } from "@/data/VertificationToken"
import { db } from "@/lib/db"


export const NewVerification = async (token:string)=>{
  const exsistingtoken=await getVerificationTokenByToken(token)
  if(!exsistingtoken) return false

  const tokenexpired=new Date(exsistingtoken.expiry)<new Date()
  if (tokenexpired){
    return {error:"invalid token"}

  } 
  const exisitingUser=await getuserByEmail(exsistingtoken.email)
  if(!exisitingUser){
    return {error:"Email does not exsists"}
  }
  await db.user.update({
    where:{id:exisitingUser.id},
    data:{
      emailVerified:new Date(),
      email:exsistingtoken.email
    }
  })
  await db.verificationToken.delete({
    where:{id:exsistingtoken.id}
  })
  return {success:"email sucesffuly verified"}
}