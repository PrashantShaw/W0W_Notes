import { connectToDatabase } from "@/lib/database/db.connect"
import Notes from "@/lib/models/notes.model"
import { INote } from "@/lib/utils/definitions"
import { getNormalObject } from "@/lib/utils"

export async function getNotes(userId: string) {
    try {
        await connectToDatabase()
        // FIXME: use 'fetch' to fetch the notes (as well as all other GET requests), as it caches the response.
        const notes = await Notes.find({ user: userId })
        // console.log(notes)

        const normalObj: INote[] = getNormalObject(notes)
        return normalObj

    } catch (error) {
        console.log('Failed to fetch notes!', error,)
        throw new Error('Failed to fetch notes!');
    }
}

export async function getNoteById(noteId: string) {
    try {
        await connectToDatabase()
        const note = await Notes.findById(noteId)
        const normalObj: INote = getNormalObject(note)
        return normalObj;

    } catch (error) {
        console.log('Failed to fetch note!', error)
        throw new Error('Failed to fetch note by _id.');
    }
}