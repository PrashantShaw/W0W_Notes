import { auth } from '@/auth/auth.config'
import { notesColumns } from '@/components/common/datatable/columns/notes.columns';
import { DataTable } from '@/components/common/datatable/DataTable';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input';
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
                <Button asChild>
                    <Link href='/dashboard/notes/create'>
                        <Plus strokeWidth={1.5} className='mr-2' />
                        <p className='pr-2'>Create Note</p>
                    </Link>
                </Button>
            </div>
            {/* <div className="">
                {notes.map((note, idx) => {
                    return <pre key={idx}>{JSON.stringify({ sl: idx, title: note.title }, null, 2)}</pre>
                })}
            </div> */}
            <div className="">
                <DataTable data={notes} columns={notesColumns} />
            </div>
        </div>
    </>)
}

export default DashboardPage