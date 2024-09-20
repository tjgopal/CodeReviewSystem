'use client'

import { Card,
    CardContent,
    CardHeader,
    CardFooter
 } from "../ui/card"
import { BackButton } from "./BackButton"
import { Header } from "./header"
import { Social } from "./Socail"

interface CardWrapperProps{
    children:React.ReactNode
    headerLabel:string
    backButtonLabel:string
    backButtonHref:string
    showSocial?:string
}

export const CardWrapper=(
    {children,headerLabel,backButtonLabel,backButtonHref,showSocial}:CardWrapperProps)=>{
        return(
            <Card className="w-[400px] shadow-md">
                <Header label={headerLabel}/>
                <CardContent>
                {children}
                </CardContent>
                {showSocial &&(
                    <CardFooter>
                        <Social/>
                    </CardFooter>

                ) }
                
                <CardFooter>
                    <BackButton href={backButtonHref}
                    label={backButtonLabel}/>
                </CardFooter>

            </Card>
        )

}