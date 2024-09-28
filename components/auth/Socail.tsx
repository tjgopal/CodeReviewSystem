'use client'
import { signIn } from "next-auth/react"
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"
import { Button } from "../ui/button"

import { DEFAULT_LOGIN_REDIRECT } from "@/routes"

export const Social =()=>{
     const onClick=(providers:'google'|'github')=>{
            signIn(providers,{
                callBackUrl:DEFAULT_LOGIN_REDIRECT
            })
     }
    return (
        <div className="w-full flex items-center gap-x-2">
            <Button size='lg'className=' w-full ' 
            variant='outline'
            onClick={()=>onClick('google')}>
                <FcGoogle className="w-5 h-5"/>
                
            </Button>
            <Button size='lg'className=' w-full ' 
            variant='outline'
            onClick={()=>onClick('github')}>
                <FaGithub className="w-5 h-5"/>
                
            </Button>
        </div>
    )
}