import { Request, Response } from 'express';
// import { db } from '../utils/mongodb';
// import * as jwtUtil from '../utils/jwtTokenUtil';

const login = async (req: Request, res: Response) => {
    // const { username } = req.body;
    // const { password } = req.body;

    console.log('wait here for 2 seconds ----');

    // await new Promise(
    //     (resolve) => {
    //         setTimeout(
    //             () => resolve(0),
    //             3000,
    //         );
    //     },
    // );

    console.log('wait ends here');
    try {
        // const result = await db.collection('userdetails').findOne({ username, password });
        // if (result && result.username === username && result.password === password) {
        //     const token: string = jwtUtil.createJwtToken(result.username);
        //     return res.status(200).json({ username, token });
        // }

        return res.status(200).json({ username: 'Jnaisargi', token:'asdfasdfds' });

        return res.status(404).send('Username or Password incorrect.');
    } catch (error: any) {
        console.log(error.message);
        return res.send(error);
    }
};

export default login;
