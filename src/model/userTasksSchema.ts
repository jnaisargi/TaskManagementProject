import mongoose, { InferSchemaType } from 'mongoose';

const Schema = mongoose.Schema;

const userTaskSchema = new Schema ({
    username:{type: String, required: true},
    title: {type: String, required: true},
    description: {type: String},
    priority: {type: Number},
    due_date: {type: Date},
    assigned_to: {type:String}
})

type userTask = InferSchemaType<typeof userTaskSchema>;

export const userTaskModel = mongoose.model('userTasks', userTaskSchema);