import jwt, {JwtPayload} from 'jsonwebtoken';
import { Request, Response, NextFunction} from 'express';

export const createJwtToken = (username) => {
    let jwtSecretKey: string = process.env.JWT_SECRET_KEY as any;
    let tokenPayload = {
        'username': username
    }
    return jwt.sign(tokenPayload, jwtSecretKey, { expiresIn: 1000 });
}

export interface CustomRequest extends Request {
    userData: {
        username: string
    },
}

export const validateJwtToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if(!token) {
            throw new Error();
        }

        const decoded: any = jwt.verify(token, process.env.JWT_SECRET_KEY as any);
        console.log('token', token);
        
        (req as CustomRequest).userData = {
            username: decoded.username
        };

        next();
    }
    catch(error) {
        console.log(error);
        res.status(401).send('Please Authenticate!');
    }
}