import { db } from "@/lib/db";

export const getuserByEmail= async (email:string)=>{
    try {
        const user=db.user.findUnique({where:{email}})
        return user
    } catch  {
        return null
    }
}

export const getuserById= async (id:string)=>{
    try {
        const user=db.user.findUnique({where:{id}})
        return user
    } catch  {
        return null
    }
}