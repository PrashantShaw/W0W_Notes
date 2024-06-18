"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
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
import { NoteFormData, ZNoteSchema } from "@/lib/utils/definitions"
import clsx from "clsx"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CircleCheckBig, LoaderCircle } from "lucide-react"
import { sleep } from "@/lib/helpers/auth.helpers"
import { createNoteAction } from "@/lib/actions/dashboard.actions"


const defaultValues = {
    title: '',
    description: '',
    priority: 'Medium',
    status: 'Backlog',
    label: 'Bug',
}

export function NoteForm({ formValues = defaultValues }) {
    const form = useForm<NoteFormData>({
        resolver: zodResolver(ZNoteSchema),
        defaultValues: formValues,
    })

    async function onSubmit(data: NoteFormData) {
        console.log('Create Note Data :: ', data)
        const result = await createNoteAction(data)
        console.log('Create Note Result :: ', result)

        toast({
            description: (
                <div className="flex items-center gap-4 mb-2"><CircleCheckBig color="green" />
                    <p className="font-semibold text-slate-900">Note Successfully Created!</p>
                </div>
            ),
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
                <div className="grid grid-cols-3 gap-5 ">
                    <FormField
                        control={form.control}
                        name="priority"
                        render={({ field, fieldState: { error } }) => (
                            <FormItem className=" relative">
                                <FormLabel className="text-gray-700">Priority</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="shadow-sm">
                                            <SelectValue placeholder="Select the Priority" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Low">Low</SelectItem>
                                        <SelectItem value="Medium">Medium</SelectItem>
                                        <SelectItem value="High">High</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage className="text-xs absolute -bottom-5 left-0" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field, fieldState: { error } }) => (
                            <FormItem className=" relative">
                                <FormLabel className="text-gray-700">Status</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="shadow-sm">
                                            <SelectValue placeholder="Select the Priority" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="ToDo">ToDo</SelectItem>
                                        <SelectItem value="In Progress">InProgress</SelectItem>
                                        <SelectItem value="Cancelled">Cancelled</SelectItem>
                                        <SelectItem value="Done">Done</SelectItem>
                                        <SelectItem value="Backlog">Backlog</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage className="text-xs absolute -bottom-5 left-0" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="label"
                        render={({ field, fieldState: { error } }) => (
                            <FormItem className=" relative">
                                <FormLabel className="text-gray-700">Label</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="shadow-sm">
                                            <SelectValue placeholder="Select the Priority" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Bug">Bug</SelectItem>
                                        <SelectItem value="Feature">Feature</SelectItem>
                                        <SelectItem value="Documentation">Documentation</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage className="text-xs absolute -bottom-5 left-0" />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field, fieldState: { error } }) => (
                        <FormItem className=" relative">
                            <FormLabel className="text-gray-700">Title</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    type="text"
                                    placeholder="Enter the Title"
                                    className={clsx(
                                        'shadow-sm',
                                        error ? 'ring-2 ring-red-600 focus-visible:ring-red-600' : ''
                                    )}
                                />
                            </FormControl>
                            <FormMessage className="text-xs absolute -bottom-5 left-0" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field, fieldState: { error } }) => (
                        <FormItem className=" relative">
                            <FormLabel className="text-gray-700">Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    {...field}
                                    rows={5}
                                    placeholder="Description of the Note"
                                    className={clsx(
                                        'shadow-sm resize-none',
                                        error ? 'ring-2 ring-red-600 focus-visible:ring-red-600' : ''
                                    )}
                                />
                            </FormControl>
                            <FormMessage className="text-xs absolute -bottom-5 left-0" />
                        </FormItem>
                    )}
                />
                <div className=""></div>
                <CreateNoteButton isSumitting={form.formState.isSubmitting} />
            </form>
        </Form>
    )
}

const CreateNoteButton = ({ isSumitting = false }) => {

    const btnTxt = isSumitting ? 'Creating' : 'Create Note'
    const btnIcon = isSumitting ? <LoaderCircle className="animate-spin mr-3" /> : ''
    return <Button
        disabled={isSumitting}
        type="submit"
        className="shadow w-[12rem]"
    >
        {btnIcon} {btnTxt}
    </Button>
}

/**
 * title
 * description
 * priority -> Low|Medium|High
 * status -> ToDo|In Progress|Cancelled|Done|Backlog
 * label -> Bug|Feature|Documentation
 */