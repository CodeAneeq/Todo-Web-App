import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    text: {type: String, required: true},
    status: {type: String, enum: ["complete", "incomplete"], default: "incomplete"}
})

export const todoModel = mongoose.model('todo', todoSchema)