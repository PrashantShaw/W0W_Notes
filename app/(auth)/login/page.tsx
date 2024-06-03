import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { LoginForm } from '@/components/auth/LoginForm'
import { Button } from "@/components/ui/button"
import Link from "next/link"

const LoginPage = () => {
    return (
        <div className='min-h-screen flex justify-center items-center border'>
            <Card className='relative w-[28rem] min-h-[32rem] shadow'>
                <div className="absolute right-6 top-6">
                    <SignupButton />
                </div>
                <CardHeader>
                    <CardTitle>User Sign In</CardTitle>
                    <CardDescription>Enter your credentials to sign in</CardDescription>
                </CardHeader>
                <CardContent>
                    <LoginForm />
                </CardContent>
                {/* <CardFooter>
                </CardFooter> */}
            </Card>

        </div>
    )
}

const SignupButton = () => {
    return <Button
        variant={"ghost"}
        size={'sm'}
        asChild
    >
        <Link href="/signup">Sign Up</Link>
    </Button>
}

export default LoginPage