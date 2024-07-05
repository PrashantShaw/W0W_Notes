'use server'

import { INote, NoteFormData, ZNoteSchema } from "@/lib/utils/definitions";
import { connectToDatabase } from "@/lib/database/db.connect";
import Notes from "@/lib/models/notes.model";
import { auth } from "@/auth/auth.config";
import { getNormalObject } from "@/lib/utils";
import { revalidatePath } from "next/cache";


//  SomeModel.someMethod().lean() returns plain old javascript objects instead of mongoose document as response.
/**
 * Updates a note in the database if @param 'noteId' is provided 
 * or else creates a new Note with @param 'noteData'
 */
export async function createOrUpdateNoteAction(
    noteData: NoteFormData,
    noteId?: string
) {
    try {
        const validatedFields = ZNoteSchema.safeParse(noteData)
        console.log('CreateNoteAction data :: ', noteData, validatedFields)

        if (!validatedFields.success) {
            const serverValidationErrors = Object.fromEntries(validatedFields?.error?.issues.map(({ path, message }) => [path[0], message]))
            return {
                errors: serverValidationErrors,
                success: false,
                message: 'Invalid Note Data!'
            }
        }

        const session = await auth()
        const isUpdating = !!noteId

        await connectToDatabase()
        const { title, description, label, priority, status } = validatedFields.data
        const validatedData = {
            title,
            description,
            label,
            priority,
            status,
            user: session?.user.userId
        }

        if (isUpdating) {
            // create a new Note if no Note found.
            const updatedNote = await Notes.findOneAndUpdate(
                { _id: noteId },
                validatedData,
                { new: true, upsert: true, setDefaultsOnInsert: true }
            ).lean()
            console.log('Updated Note :: ', updatedNote)
            revalidatePath('/dashboard')
            return {
                message: 'Note Successfully Updated!',
                data: getNormalObject(updatedNote ?? {}),
                status: 200,
                success: true,
            }
        }
        // else create a new Note
        const newNote = new Notes(validatedData)
        let savedNote: INote = await newNote.save()
        savedNote = getNormalObject(savedNote)
        console.log('saved Note :: ', savedNote)

        return {
            message: 'Note Successfully Created',
            data: savedNote,
            status: 200,
            success: true,
        }

    } catch (error: any) {
        console.log('Server Error: Failed to Create Note!', error)
        return {
            message: 'Server Error: Failed to Create Note!',
            data: null,
            status: 500,
            success: false
        }
    }

    // redirect('/dashboard')
}

export async function deleteManyNotes(noteIdsList: string[]) {
    try {
        console.log('noteIdsList :: ', noteIdsList)
        const deleteResult = await Notes.deleteMany({ _id: { $in: noteIdsList } }).lean();
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
        const updateResult = await Notes.findOneAndUpdate(filter, update, { new: true }).lean()
        console.log('updateResult :: ', updateResult)
        return {
            message: 'Note Successfully Created',
            data: getNormalObject(updateResult ?? {}),
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