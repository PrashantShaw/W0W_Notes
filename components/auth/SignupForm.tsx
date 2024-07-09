"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import clsx from "clsx"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { SignupFormData, ZSignupSchema } from "@/lib/utils/definitions"
import { SignupAction } from "@/lib/actions/auth.actions"
import { useRouter } from "next/navigation"
import { CircleCheckBig, LoaderCircle } from "lucide-react"
import { ToastAction } from "@/components/ui/toast"

export function SignupForm() {
    const form = useForm<SignupFormData>({
        resolver: zodResolver(ZSignupSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    })
    const router = useRouter()

    async function onSubmit(data: SignupFormData) {
        const result = await SignupAction(data)
        // console.log('SIgnup Result: ', result)
        if (result?.success) {
            router.push('/login')
            toast({
                duration: 10_000,
                description: (<>
                    <div className="flex items-center gap-2 mb-2"><CircleCheckBig color="green" />
                        <p className="font-semibold text-lg text-slate-800">{result.message}</p>
                    </div>
                    <p>Please Sign In to continue!</p>
                </>)
            })
        }
        if (result?.formError) {
            toast({
                duration: 10_000,
                variant: "destructive",
                title: result?.formError,
                action: (
                    <ToastAction altText="Login" onClick={() => router.push('/login')} >
                        Login
                    </ToastAction>)
            })
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 justify-between">
                <div className="flex flex-col gap-5 justify-between ">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field, fieldState: { error } }) => (
                            <FormItem>
                                {/* <FormLabel className="text-gray-700">Email</FormLabel> */}
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="email"
                                        placeholder="user@example.com"
                                        className={clsx(
                                            'shadow-sm',
                                            error ? 'ring-2 ring-red-600 focus-visible:ring-red-600' : ''
                                        )}
                                    />
                                </FormControl>
                                <FormMessage className="text-xs" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field, fieldState: { error } }) => (
                            <FormItem>
                                {/* <FormLabel className="text-gray-700">Password</FormLabel> */}
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="password"
                                        placeholder="Enter a Password"
                                        className={clsx(
                                            'shadow-sm',
                                            error ? 'ring-2 ring-red-600 focus-visible:ring-red-600' : ''
                                        )}
                                    />
                                </FormControl>
                                <FormMessage className="text-xs" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field, fieldState: { error } }) => (
                            <FormItem>
                                {/* <FormLabel className="text-gray-700">Confirm Password</FormLabel> */}
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="password"
                                        placeholder="Enter Confirm Password"
                                        className={clsx(
                                            'shadow-sm',
                                            error ? 'ring-2 ring-red-600 focus-visible:ring-red-600' : ''
                                        )}
                                    />
                                </FormControl>
                                <FormMessage className="text-xs" />
                            </FormItem>
                        )}
                    />
                </div>
                <CreateAccountButton isSumitting={form.formState.isSubmitting} />
            </form>
        </Form>
    )
}

const CreateAccountButton = ({ isSumitting = false }) => {

    const btnTxt = isSumitting ? 'Loading' : 'Create Account'
    const btnIcon = isSumitting ? <LoaderCircle className="animate-spin mr-2" /> : ''
    return <Button
        disabled={isSumitting}
        type="submit"
        className="w-full shadow"
    >
        {btnIcon} {btnTxt}
    </Button>
}
