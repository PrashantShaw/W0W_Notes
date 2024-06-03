import { SignupForm } from '@/components/auth/SignupForm'
import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const SignupPage = () => {
    return (
        <div className='min-h-screen flex justify-center items-center border'>
            <Card className='relative w-[28rem] min-h-[32rem] shadow'>
                <div className="absolute right-6 top-6">
                    <LoginButton />
                </div>
                <CardHeader>
                    <CardTitle>Create an account</CardTitle>
                    <CardDescription>Enter your email below to create your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <SignupForm />
                </CardContent>
                {/* <CardFooter>
                </CardFooter> */}
            </Card>

        </div>
    )
}

const LoginButton = () => {
    return <Button
        variant={"ghost"}
        size={'sm'}
        asChild
    >
        <Link href="/login">Login</Link>
    </Button>
}

export default SignupPage