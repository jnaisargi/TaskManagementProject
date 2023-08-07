import { Request, Response } from 'express';
import { UserModel } from '../model/userDetailsSchema';

const signup = async (req: Request, res: Response) => {
    try {
        const { firstName } = req.body;
        const { lastName } = req.body;
        const { emailId } = req.body;
        const { username } = req.body;
        const { password } = req.body;
        const { age } = req.body;

        const signUpDetails = new UserModel({
            firstName,
            lastName,
            emailId,
            username,
            password,
            age,
        });

        await UserModel.create(signUpDetails);
        return res.status(200).send('Signup Successful.');
    } catch (error) {
        return res.status(400).send('Singup failed.');
    }
};

export default signup;
