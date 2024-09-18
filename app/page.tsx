import {Poppins} from "next/font/google"
import {Button} from'@/components/ui/button'
import { cn } from "@/lib/utils"
import { LoginButton } from "@/components/auth/login-button"

const font=Poppins({
  subsets:['latin'],
  weight:['600']

})
export default function Home() {
  
  return (
        <main className='flex flex-col items-center justify-center h-full
        bg-blue-300'>
          <div className='space-y-6 text-center'>
            <h1 className={cn('text-6xl font-bold drop-shadow-md',font.className)}> Auth</h1>
            <p className='text-lg'>simple auth service</p>
            <div>
            <LoginButton>
              <Button variant="secondary" size="lg">
              Sign in 
              </Button>
              </LoginButton>

            </div>
          </div>
        </main>
  )
}
