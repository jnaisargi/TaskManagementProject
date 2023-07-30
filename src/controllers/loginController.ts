import { Request, Response } from 'express';
import {db} from '../utils/mongodb';
import * as jwtUtil from '../utils/jwtTokenUtil';

export const login = async (req: Request, res: Response) => {

    var username = req.body.username;
    var password = req.body.password;
   
    try {
        const result = await db.collection('userdetails').findOne({username: username, password: password}) 
            if (result && result.username == username && result.password == password) {   
                let token: string = jwtUtil.createJwtToken(result.username);
                console.log(token);
                return  res.status(200).json({'username' : username, 'token' : token});
            }
            else {
                return res.status(404).send('Username or Password incorrect.');
            }
    }
    catch(error) {
        console.log(error.message);
        return res.send(error);
    }
    
};

