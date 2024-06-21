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
        console.log('Server Error: Failed to Delete Notes! :: ', error)
        return {
            message: 'Server Error: Failed to Delete Notes!',
            data: null,
            success: false,
            status: 500,
        }
    }
    // revalidatePath('/dashboard')
}

export async function updateNote(
    noteId: string,
    update: Partial<Omit<INote, '_id' | 'user' | 'createdAt' | 'updatedAt'>>,
) {
    const filter = { _id: noteId }
    try {
        const updateResult = await Notes.findOneAndUpdate(filter, update, { new: true })
        console.log('updateResult :: ', updateResult)
        return {
            message: 'Note Successfully Created',
            data: updateResult,
            success: true,
            status: 200
        }

    } catch (error) {
        console.log('Server Error: Failed to Update Notes! :: ', error)
        return {
            message: 'Server Error: Failed to Update Notes!',
            data: null,
            success: false,
            status: 500
        }

    }
}