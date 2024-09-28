import NextAuth from "next-auth"
import {PrismaAdapter} from '@auth/prisma-adapter'
import authConfig from "./auth.config"
import { db } from "./lib/db"
import { getuserById } from "./data/user"
import { UserRole } from "@prisma/client"
export const { auth, handlers, signIn, signOut } = 
NextAuth({
    pages:{
        signIn:'/auth/login',
        error:'/auth/error'
    },
    events:{
        async linkAccount({user}){
            try {
                await db.user.update({
                  where: { id: user.id },
                  data: { emailVerified: new Date() }
                })
              } catch (error) {
                console.error(error)
              }
        }
    },
    callbacks:{
        async signIn({user,account}){
            if(account?.provider!=="credentials") return true

            const exsistingUser= await getuserById(user.id)
            if(!exsistingUser) return false
            return true
        },
        async session({token,session}){
            console.log({
                sessiontoken:token
            })
            if(token.sub&&session.user){
                session.user.id=token.sub
            }
            if(token.role&& session.user){
                session.user.role=token.role as UserRole
            }
            return session
        },
        async jwt({token}){
            // console.log(token)
            if(!token.sub) return token

            const existinguser= await getuserById(token.sub)
            if(!existinguser) return token 
            console.log(existinguser.role)
            token.role=existinguser.role

            return token
        }
    },
    adapter:PrismaAdapter(db),
    session:{strategy:'jwt'},
    ...authConfig
})