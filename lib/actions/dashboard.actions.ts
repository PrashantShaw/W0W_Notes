'use server'

import { INote, NoteFormData, ZNoteSchema } from "@/lib/utils/definitions";
import { connectToDatabase } from "@/lib/database/db.connect";
import Notes from "@/lib/models/notes.model";
import { auth } from "@/auth/auth.config";
import { redirect } from "next/navigation";

export async function createNoteAction(noteData: NoteFormData) {
    try {
        const validatedFields = ZNoteSchema.safeParse(noteData)
        console.log('CreateNoteAction data :: ', noteData, validatedFields)

        if (!validatedFields.success) {
            const serverValidationErrors = Object.fromEntries(validatedFields?.error?.issues.map(({ path, message }) => [path[0], message]))
            return {
                errors: serverValidationErrors,
                success: false
            }
        }

        const session = await auth()

        await connectToDatabase()
        const { title, description, label, priority, status } = validatedFields.data
        const newNote = new Notes({
            title,
            description,
            label,
            priority,
            status,
            user: session?.user.userId
        })
        let savedNote: INote = await newNote.save()
        savedNote = JSON.parse(JSON.stringify(savedNote))
        console.log('saved Note :: ', savedNote)

        // return {
        //     message: 'Note Successfully Created',
        //     note: savedNote,
        //     success: true
        // }

    } catch (error: any) {
        return {
            formError: 'Server Error: Failed to Create Note!', error,
            status: 500,
            success: false
        }
    }

    redirect('/dashboard')
}