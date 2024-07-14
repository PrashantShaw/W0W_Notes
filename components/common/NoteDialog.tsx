'use client'

import { Dispatch, SetStateAction, useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { INote } from '@/lib/utils/definitions'
import { Badge } from '@/components/ui/badge'
import date from 'date-and-time';
import Link from 'next/link'

type NoteDoalogProps = {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    note: INote | null
}

const NoteDialog = ({ open, setOpen, note }: NoteDoalogProps) => {
    // console.log('NoteDialog open :: ', open)
    const dateTime = new Date(note?.createdAt!)
    const datTimeFormatted = date.format(dateTime!, "DD-MM-YYYY, hh:mm:ss A")
    return <>
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogContent className="sm:max-w-md" >
                <DialogHeader>
                    <DialogTitle className='flex items-center gap-2'>
                        <h2 className='text-2xl'>{note?.title}</h2>
                        <Badge>{note?.label}</Badge>
                    </DialogTitle>
                    <div className="grid grid-cols-2 pt-6 pb-4">
                        <div className="">
                            <p className='text-sm text-slate-400'>Priority</p>
                            <p className='text-lg '>{note?.priority}</p>
                        </div>
                        <div className="">
                            <p className='text-sm text-slate-400'>Status</p>
                            <p className='text-lg '>{note?.status}</p>
                        </div>
                    </div>
                    <div className="">
                        <p className='text-right text-xs text-slate-400'>Created At</p>
                        <p className='text-right text-sm text-slate-400'>{datTimeFormatted}</p>
                    </div>
                    <DialogDescription className='text-lg text-slate-700 leading-6 pb-6'>
                        <p className='text-sm text-slate-400 pb-1'>Description</p>
                        <p>{note?.description}</p>
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className="">
                    <Button className='w-[6rem]' asChild>
                        <Link href={`/dashboard/notes/${note?._id}/edit`}>Edit</Link>
                    </Button>
                    <DialogClose asChild>
                        <Button className='w-[6rem]' variant={"secondary"}>Close</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </>
}

export default NoteDialog