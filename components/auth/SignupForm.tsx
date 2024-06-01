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

const ZSignupSchema = z.object({
    email: z.string().email({
        message: "Must be a valid email.",
    }),
    password: z.string().min(6, {
        message: "password must be at least 6 characters.",
    }),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not Match!',
    path: ['confirmPassword']
})

export function SignupForm() {
    const form = useForm<z.infer<typeof ZSignupSchema>>({
        resolver: zodResolver(ZSignupSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    })

    function onSubmit(data: z.infer<typeof ZSignupSchema>) {
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
                <Button type="submit" className="w-full shadow items-end">Create account</Button>
            </form>
        </Form>
    )
}
