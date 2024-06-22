import { auth } from '@/auth/auth.config'
import NoteTable from '@/components/dashboard/Notes/NoteTable';
import { Button } from '@/components/ui/button'
import { getNotes } from '@/lib/helpers/dashboard.helpers';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

const DashboardPage = async () => {
    const session = await auth();
    const userId = session?.user.userId
    const notes = await getNotes(userId!);
    // console.log('Dashboard page, notes :: ', notes)

    return (<>
        <div className='flex flex-col p-10 gap-6'>
            <div className="flex w-full items-center justify-between space-x-4">
                <div className="">
                    <h1 className='text-3xl text-slate-800 font-semibold mb-2'>All Notes</h1>
                    <p className='text-slate-600'>A dashboard to manage all your notes, however you like!</p>
                </div>
                <CreateNoteButton />
            </div>
            <NoteTable notes={notes} />

        </div>
    </>)
}

const CreateNoteButton = () => {
    return <Button asChild>
        <Link href='/dashboard/notes/create'>
            <Plus strokeWidth={1.5} className='mr-2' />
            <p className='pr-2'>Create Note</p>
        </Link>
    </Button>
}

export default DashboardPage