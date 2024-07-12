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
                    <DialogDescription className='text-lg leading-6 pt-3 pb-2'>
                        {note?.description}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2">
                    <div className="">
                        <p className='text-sm'>Priority</p>
                        <p className='text-lg font-semibold'>{note?.priority}</p>
                    </div>
                    <div className="">
                        <p className='text-sm'>Status</p>
                        <p className='text-lg font-semibold'>{note?.status}</p>
                    </div>
                </div>
                <div className="mt-[2rem]">
                    <p className='text-right text-xs text-slate-400'>Created At</p>
                    <p className='text-right text-sm text-slate-400'>{datTimeFormatted}</p>
                </div>

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