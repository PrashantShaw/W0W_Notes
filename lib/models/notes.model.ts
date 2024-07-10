import mongoose from "mongoose";
import { INote } from "@/lib/utils/definitions";

const { Schema, models, model } = mongoose

const notesSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required!'],
    },
    description: {
        type: String,
        required: [true, 'Description is required!'],
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High',],
        default: 'Medium',
    },
    status: {
        type: String,
        enum: ['ToDo', 'In Progress', 'Cancelled', 'Done', 'Backlog'],
        default: 'Backlog',
    },
    label: {
        type: String,
        enum: ['Bug', 'Feature', 'Documentation',],
        default: 'Bug',
    },
    starred: {
        type: Boolean,
        default: false,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }
}, {
    timestamps: true
})

const Notes = models.notes || model<INote>('notes', notesSchema)

export default Notes;