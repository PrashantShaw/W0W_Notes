import { connectToDatabase } from "@/lib/database/db.connect"
import Notes from "@/lib/models/notes.model"
import { INote } from "@/lib/utils/definitions"

export async function getNotes(noteId: string) {
    try {
        await connectToDatabase()
        const notes: INote[] = await Notes.find({ user: noteId })
        console.log(notes)

        return notes

    } catch (error) {
        console.log('Failed to fetch notes!', error,)
        return []
    }
}