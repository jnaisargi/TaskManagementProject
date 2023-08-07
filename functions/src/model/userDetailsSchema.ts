import mongoose from 'mongoose';

const { Schema } = mongoose;

const userDetailsSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String },
    emailId: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number },
});

// eslint-disable-next-line import/prefer-default-export
export const UserModel = mongoose.model('UserDetails', userDetailsSchema);
