import React from 'react'

const AuthLayout = (
    {children}:React.ReactNode) => {
  return (
    <div className=' h-full flex items-center justify-center bg-blue-300'>
      {children}
    </div>
  )
}

export default AuthLayout
