import mongoose from 'mongoose';

const { Schema } = mongoose;

export interface UserDetails {
    firstName: string,
    lastName: string,
    emailId: string,
    priority: string,
    username: string,
    password: string,
    age: number
}


const UserDetailsSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String },
    emailId: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number },
});

// eslint-disable-next-line import/prefer-default-export
export const UserDetailsModel = mongoose.model('UserDetails', UserDetailsSchema);
