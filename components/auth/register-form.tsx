'use client'
import {useForm} from 'react-hook-form'
import { useState, useTransition } from 'react'
import {zodResolver} from '@hookform/resolvers/zod'
import * as z from 'zod'
import { RegisterSchema } from '@/schemas/index'
import {
    Form,
    FormField,
    FormControl,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { CardWrapper } from './card-wrapper'
import { Input } from '@/components/ui/input'
import { Button } from '../ui/button'
import { FormError } from '../form-error'
import { FormSucess } from '../form-success'
import { register } from '@/actions/register'
import axios from'axios'



const RegisterForm = () => {
    const[isPending,startTransistion]=useTransition()
    const [isError,setIsError]=useState<string|undefined>('')
    const [isSucess,setIsSucess]=useState<string|undefined>('')
    const form=useForm<z.infer<typeof RegisterSchema>>({
        resolver:zodResolver(RegisterSchema),
        defaultValues:{
            email:'',
            password:'',
            name:''
        }
    })
    const onSubmit=(values:z.infer<typeof RegisterSchema>)=>{
            // axios.post('/auth/login',values).then((response)=>console.log(response))
            setIsError('')
            setIsSucess('')
            startTransistion(()=>{
                register(values)
                .then((data)=>{
                    setIsError(data.error)
                    setIsSucess(data.sucess)
                })
            })
    }
  return (
    <CardWrapper headerLabel='Create a Account'
    backButtonLabel='Already have an account?'
    backButtonHref='/auth/login'
    showSocial
    >
        <Form {...form}>
            <form 
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-6'>
                <div className='space-y-4'>
                <FormField
                    control={form.control}
                    name='name'
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>name</FormLabel>
                            <FormControl>
                                <Input
                                {...field}
                                placeholder='Enter name'
                                type='name'
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name='email'
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                {...field}
                                placeholder='Enter email'
                                type='email'
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name='password'
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                {...field}
                                placeholder='Enter password'
                                type='password'
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                    />
                </div>
                    <FormError message={isError}/>
                    <FormSucess message={isSucess}/>
                <Button className='w-full items-center' type='submit'>
                    Register
                </Button>
            </form>
        </Form>
    </CardWrapper>
  )
}

export default RegisterForm
