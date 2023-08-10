import mongoose from 'mongoose';

const { Schema } = mongoose;

export interface UserTask {
    username: string,
    title: string,
    description: string,
    priority: number,
    due_date: Date,
    assigned_to: string,
}

const UserTaskSchema = new Schema<UserTask>({
    username: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    priority: { type: Number },
    due_date: { type: Date },
    assigned_to: { type: String },
});

// eslint-disable-next-line import/prefer-default-export
export const UserTaskModel = mongoose.model('userTasks', UserTaskSchema);
