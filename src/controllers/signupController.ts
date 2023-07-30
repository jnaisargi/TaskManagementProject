import { Request, Response } from 'express';
import {db} from '../utils/mongodb';
import {UserModel} from '../model/userDetailsSchema';

export const signup = async (req: Request, res: Response) => {

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const emailId = req.body.emailId;
    const username = req.body.username;
    const password = req.body.password;
    const age = req.body.age;
    
    try{
        let signUpDetails = new UserModel({
            firstName: firstName,
            lastName: lastName,
            emailId: emailId,
            username: username,
            password: password,
            age: age
        });

        const createdRecord = await UserModel.create(signUpDetails);
        console.log('Sign Up Successful.');
        return res.send('Signup Successful.');
    }
    catch(error) {
        res.status(400).send('Singup failed.')
    }
};