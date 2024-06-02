"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
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
import { UserSignup } from "@/lib/actions/auth.actions"

export function SignupForm() {
    const form = useForm<SignupFormData>({
        resolver: zodResolver(ZSignupSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    })

    async function onSubmit(data: SignupFormData) {
        const result = await UserSignup(data)
        console.log('SIgnup Result: ', result)
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 justify-between h-[24rem]">
                <div className="flex flex-col gap-5 justify-between ">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field, fieldState: { error } }) => (
                            <FormItem>
                                <FormLabel className="text-gray-700">Email</FormLabel>
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
                                <FormLabel className="text-gray-700">Password</FormLabel>
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
                                <FormLabel className="text-gray-700">Confirm Password</FormLabel>
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
                <Button type="submit" className="w-full shadow">Create account</Button>
            </form>
        </Form>
    )
}
