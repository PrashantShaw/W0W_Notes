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

const SignupPage = () => {
    return (
        <div className='min-h-screen flex justify-center items-center border'>
            <Card className='w-[28rem] min-h-[32rem] shadow'>
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

export default SignupPage