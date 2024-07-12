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

type NoteDoalogProps = {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    note: INote | null
}

const NoteDialog = ({ open, setOpen, note }: NoteDoalogProps) => {
    console.log('NoteDialog open :: ', open)
    return <>
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogContent className="sm:max-w-md" >
                <DialogHeader>
                    <DialogTitle>{note?.title}</DialogTitle>
                    <DialogDescription>
                        {note?.description}
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">

                </div>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </>
}

export default NoteDialog