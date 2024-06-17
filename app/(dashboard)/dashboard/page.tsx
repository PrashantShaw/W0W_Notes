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
    const notes = await getNotes(userId);
    // console.log('Dashboard page, notes :: ', notes)
    return (<>
        <div className='flex flex-col p-10 gap-6'>
            <h1 className='text-3xl text-slate-800 font-semibold'>All Notes</h1>
            <div className="flex w-full items-center space-x-4">
                <Input type="text" placeholder="Search" />
                <Button asChild>
                    <Link href='/dashboard/notes/create'>
                        <Plus strokeWidth={1.5} className='mr-2' />
                        <p className=''>Create</p>
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