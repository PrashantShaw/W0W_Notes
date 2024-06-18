import { connectToDatabase } from "@/lib/database/db.connect"
import Notes from "@/lib/models/notes.model"
import { INote } from "@/lib/utils/definitions"
import { getNormalObject } from "@/lib/utils"

export async function getNotes(noteId: string) {
    try {
        await connectToDatabase()
        // FIXME: use 'fetch' to fetch the notes (as well as all other GET requests), as it caches the response.
        const notes = await Notes.find({ user: noteId })
        // console.log(notes)

        const normalObj: INote[] = getNormalObject(notes)
        return normalObj

    } catch (error) {
        console.log('Failed to fetch notes!', error,)
        return []
    }
}