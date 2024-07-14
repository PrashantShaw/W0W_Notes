
import { auth } from '@/auth/auth.config'
import { getNotes } from '@/lib/helpers/dashboard.helpers'
import React from 'react'
import NoteTableWrapper from './NoteTableWrapper';

const NoteTable = async () => {

    const session = await auth();
    const userId = session?.user.userId
    const notes = await getNotes(userId!, { trashed: false });

    return (
        <div className="">
            <NoteTableWrapper notes={notes} />
        </div>
    )
}

export default NoteTable