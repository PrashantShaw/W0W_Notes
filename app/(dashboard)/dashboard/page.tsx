import NoteTable from '@/components/dashboard/Notes/NoteTable';
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react';
import Link from 'next/link';
import React, { Suspense } from 'react'

// TODO: add loading shimmers
// TODO: replace revalidatePath() with revalidateTags() for server actions
// TODO: add shadcn themeing

const DashboardPage = async () => {
    // console.log('Dashboard page, notes :: ', notes)

    return (<>
        <div className='flex flex-col p-10 gap-6'>
            <div className="flex w-full items-center justify-between flex-wrap gap-4">
                <div className="">
                    <h1 className='text-3xl text-slate-800 font-semibold mb-2'>All Notes</h1>
                    <p className='text-slate-600'>A dashboard to manage all your notes, however you like!</p>
                </div>
                <CreateNoteButton />
            </div>
            <Suspense fallback={<h1 className='text-center text-4xl font-semibold text-slate-300 pt-[10rem]'>loading ... </h1>}>
                <NoteTable />
            </Suspense>
        </div>
    </>)
}

const CreateNoteButton = () => {
    return <Button asChild className='w-full sm:w-auto'>
        <Link href='/dashboard/notes/create'>
            <Plus strokeWidth={1.5} className='mr-2' />
            <p className='pr-2'>Create Note</p>
        </Link>
    </Button>
}

export default DashboardPage