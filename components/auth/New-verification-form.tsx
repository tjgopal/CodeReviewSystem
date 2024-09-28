'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { CardWrapper } from './card-wrapper'
import {BeatLoader} from 'react-spinners'
import { useSearchParams } from 'next/navigation'
import { NewVerification } from '@/actions/new-verification'
import { FormError } from '../form-error'
import { FormSucess } from '../form-success'

const NewVerificationForm = () => {
    const [error,setError]=useState<string|undefined>()
    const [success,setSuccess]=useState<string|undefined>()
    const serachParams=useSearchParams()
    const token=serachParams.get("token")
    const onSubmit=useCallback(()=>{
        if(!token) {
            setError("missing token ")
            return
        }
        NewVerification(token)
        .then((data)=>{
            console.log(data)
            setSuccess(data.success)
            setError(data.error)
        })
        .catch(()=>{
            setError("Something went wrong")
        })
    },[token])
    useEffect(()=>{
        onSubmit()
    },[onSubmit])
        

  return (
    <CardWrapper
    headerLabel='Confirmation Verification page'
    backButtonLabel='Back to login'
    backButtonHref='/auth/login'>
    <div className='w-full flex justify-center  items-center'>
        <BeatLoader/>
        {error}
        <FormError message={error}/>
        <FormSucess message={success}/>
    </div>
    </CardWrapper>
  )
}

export default NewVerificationForm
