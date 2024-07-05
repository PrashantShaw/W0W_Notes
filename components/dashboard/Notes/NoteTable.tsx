
import { auth } from '@/auth/auth.config'
import { getNotes } from '@/lib/helpers/dashboard.helpers'
import React from 'react'
import NoteTableWrapper from './NoteTableWrapper';
import { sleep } from '@/lib/helpers/auth.helpers';

const NoteTable = async () => {
    // TODO: remove 'sleep' before production release
    // await sleep(2000)

    const session = await auth();
    const userId = session?.user.userId
    const notes = await getNotes(userId!);

    return (
        <div className="">
            <NoteTableWrapper notes={notes} />
        </div>
    )
}

export default NoteTable