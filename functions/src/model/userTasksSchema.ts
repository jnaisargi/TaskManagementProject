import mongoose from 'mongoose';

const { Schema } = mongoose;

const userTaskSchema = new Schema({
    username: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    priority: { type: Number },
    due_date: { type: Date },
    assigned_to: { type: String },
});

// eslint-disable-next-line import/prefer-default-export
export const UserTaskModel = mongoose.model('userTasks', userTaskSchema);
