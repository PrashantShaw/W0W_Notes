import { NoteForm } from '@/components/dashboard/Notes/NoteForm'
import React from 'react'

const CreateNote = () => {
    return (
        <div className='flex flex-col px-20 py-10'>
            <div className="mb-10">
                <h1 className='text-4xl font-semibold text-slate-900 mb-2'>Create Note</h1>
                <p className='text-slate-600'>Create a note to manage your tasks, achieve efficent and hasstle free workflow.</p>
            </div>
            <NoteForm />
        </div>
    )
}

export default CreateNote