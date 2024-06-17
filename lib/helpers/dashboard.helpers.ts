import { connectToDatabase } from "@/lib/database/db.connect"
import Notes from "@/lib/models/notes.model"
import { INote } from "@/lib/utils/definitions"

export async function getNotes(noteId: string) {
    try {
        await connectToDatabase()
        // FIXME: use 'fetch' to fetch the notes (as well as all other GET requests), as it caches the response.
        const notes: INote[] = await Notes.find({ user: noteId })
        // console.log(notes)

        return JSON.parse(JSON.stringify(notes))

    } catch (error) {
        console.log('Failed to fetch notes!', error,)
        return []
    }
}