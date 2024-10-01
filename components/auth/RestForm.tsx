'use client'
import {useForm} from 'react-hook-form'
import { useState, useTransition } from 'react'
import {zodResolver} from '@hookform/resolvers/zod'
import * as z from 'zod'
import { ResetSchema } from '@/schemas/index'
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
import { reset } from '@/actions/reset'




const ResetForm = () => {
    const[isPending,startTransistion]=useTransition()
    const [isError,setIsError]=useState<string|undefined>('')
    const [isSucess,setIsSucess]=useState<string|undefined>('')
    const form=useForm<z.infer<typeof ResetSchema>>({
        resolver:zodResolver(ResetSchema),
        defaultValues:{
            email:'',
        }
    })
    const onSubmit=(values:z.infer<typeof ResetSchema>)=>{
            // axios.post('/auth/login',values).then((response)=>console.log(response))

            setIsError('')
            setIsSucess('')
            startTransistion(()=>{
                reset(values)
                .then((data)=>{
                    console.log(data)
                    setIsError(data.error)
                    setIsSucess(data.success)
                })
            })

    }
  return (
    <CardWrapper headerLabel='Forget Password'
    backButtonLabel='Back to login'
    backButtonHref='/auth/login'
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
                    
                </div>
                    <FormError message={isError}/>
                        {
                        isError && <h1> {isSucess} </h1>
                        }
                    <FormSucess message={isSucess}/>
                        {
                        isSucess && <h1> {isSucess} </h1>
                        }
                <Button className='w-full items-center' type='submit'>
                    Send Resend Link
                </Button>
            </form>
        </Form>
    </CardWrapper>
  )
}

export default ResetForm
