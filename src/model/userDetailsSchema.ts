import mongoose, { InferSchemaType } from 'mongoose';

const Schema = mongoose.Schema;

const userDetailsSchema = new Schema ({
    firstName: { type: String, required: true},
    lastName: { type: String},
    emailId:{ type: String, required: true},
    username:{ type: String, required: true, unique: true},
    password:{ type: String, required: true},
    age:{ type: Number}
})

type UserDetails = InferSchemaType<typeof userDetailsSchema>;

export const UserModel = mongoose.model('UserDetails', userDetailsSchema);