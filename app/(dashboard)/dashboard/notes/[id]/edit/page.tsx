import { NoteForm } from '@/components/dashboard/Notes/NoteForm'
import { getNoteById } from '@/lib/helpers/dashboard.helpers'
import React from 'react'

type EditeNoteProps = {
    params: {
        id: string
    }
}
const EditNote = async ({ params }: EditeNoteProps) => {
    const noteId = params.id
    const note = await getNoteById(noteId)
    return (
        <div className='flex flex-col px-6 py-8 md:px-20 md:py-10'>
            <div className="mb-10">
                <h1 className='text-4xl font-semibold text-slate-900 mb-2'>Edit Note</h1>
                <p className='text-slate-600'>Stay up to date with your tasks, always stay a fresh.</p>
            </div>
            <NoteForm formValues={note} />
        </div>
    )
}

export default EditNote