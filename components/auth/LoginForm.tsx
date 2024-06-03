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
import { LoginFormData, ZLoginSchema } from "@/lib/utils/definitions"
import { LoginAction, SignupAction } from "@/lib/actions/auth.actions"

export function LoginForm() {
    const form = useForm<LoginFormData>({
        resolver: zodResolver(ZLoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    async function onSubmit(data: LoginFormData) {
        const result = await LoginAction(data)
        console.log('Login Result: ', result)
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
                                        placeholder="Enter your email"
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
                                        placeholder="Enter your Password"
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
                <Button type="submit" className="w-full shadow">Sign In</Button>
            </form>
        </Form>
    )
}
