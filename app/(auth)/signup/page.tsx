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
import Image from 'next/image'
import githubIcon from "@/public/icons/Github.svg"
import { signIn } from '@/auth/auth.config'


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
                    <form
                        className='mt-4 border'
                        action={async () => {
                            'use server'
                            await signIn('github')
                        }}
                    >
                        <Button variant={'outline'} className='w-full'>
                            <Image src={githubIcon} alt="github Icon" className="mr-2" />Github</Button>
                    </form>
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