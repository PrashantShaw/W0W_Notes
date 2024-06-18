'use server'

import { INote, NoteFormData, ZNoteSchema } from "@/lib/utils/definitions";
import { connectToDatabase } from "@/lib/database/db.connect";
import Notes from "@/lib/models/notes.model";
import { auth } from "@/auth/auth.config";
import { redirect } from "next/navigation";
import { getNormalObject } from "@/lib/utils";
import { revalidatePath } from "next/cache";

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
        savedNote = getNormalObject(savedNote)
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

export async function deleteManyNotes(noteIdsList: string[]) {
    try {
        console.log('noteIdsList :: ', noteIdsList)
        const deleteResult = await Notes.deleteMany({ _id: { $in: noteIdsList } });
        console.log('delete result :: ', deleteResult)
        return {
            message: 'Note Successfully Created',
            data: deleteResult,
            success: true,
            status: 200
        }
    } catch (error: any) {
        return {
            message: 'Server Error: Failed to Delete Notes!', error,
            data: null,
            success: false,
            status: 500,
        }
    }
    // revalidatePath('/dashboard')
}