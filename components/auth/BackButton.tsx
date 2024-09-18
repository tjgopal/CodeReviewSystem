'use client'

import  Link  from "next/link"
import { Button } from "../ui/button"


interface BackbuttonProps{
    href:string
    label:string
}

export const BackButton =({href,label}:BackbuttonProps)=>{
    return(
       <Button className="w-full font-normal" size='sm' variant='link'>
        <Link href={href}>
            {label}
        </Link>
       </Button>
    )
}