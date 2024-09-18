'use client'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import * as z from 'zod'
import { loginSchema } from '@/schemas/index'
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


const LoginForm = () => {
    const form=useForm<z.infer<typeof loginSchema>>({
        resolver:zodResolver(loginSchema),
        defaultValues:{
            email:'',
            password:''
        }
    })
    const onSubmit=(values:z.infer<typeof loginSchema>)=>{
            console.log(values)
    }
  return (
    <CardWrapper headerLabel='Welcome Back'
    backButtonLabel='Dont have an account'
    backButtonHref='/auth/register'
    showSocial
    >
        <Form {...form}>
            <form 
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-6'>
                <div className='space-y-4'>
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
                    <FormError message=''/>
                    <FormSucess message=''/>
                <Button className='w-full items-center' type='submit'>
                    Login
                </Button>
            </form>
        </Form>
    </CardWrapper>
  )
}

export default LoginForm
