import React from 'react'
import { Header } from './header'
import { BackButton } from './BackButton'
import {
    Card,
    CardHeader,
    CardFooter
} from '@/components/ui/card'

const ErrorCard = () => {
  return (
    <Card className='w-[400px] shadow-md'>
        <CardHeader>
            <Header label=' Somethign Went Wrong'/>
        </CardHeader>
        <CardFooter>
            <BackButton
            label='Back to login'
            href='/auth/login'>

            </BackButton>
        </CardFooter>
    </Card>
  )
}

export default ErrorCard
