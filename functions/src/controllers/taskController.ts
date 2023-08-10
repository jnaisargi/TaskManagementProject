import { Request, Response } from 'express';
import { UserTaskModel, UserTask } from '../model/userTasksSchema';
import { UserDetails, UserDetailsModel } from '../model/userDetailsSchema'
import { CustomRequest } from '../utils/jwtTokenUtil';
import { sendNotification } from '../controllers/notificationController';

export const createTask = async (req: Request, res: Response) => {
    const userdata = (req as CustomRequest).userData;
    const { title } = req.body;
    const { description } = req.body;
    const { priority } = req.body;
    const { due_date } = req.body;
    const { assigned_to } = req.body;
    const { username } = req.body;

    try {
        console.log(username);
        if (!username || userdata.username !== username) {
            throw new Error('Username is invalid.');
        }

        const taskDetails: UserTask = {
            username,
            title,
            description,
            priority,
            due_date,
            assigned_to,
        };

        UserTaskModel.create(taskDetails);
        return res.status(201).json(taskDetails);
    } catch (error: any) {
        console.log(`Error while creating task${error}`);
        return res.status(400).send({ message: error.message });
    }
};

export const findByPriority = async (req: Request, res: Response) => {
    try {
        const userdata = (req as CustomRequest).userData;
        const { priority } = req.params;
        const { username } = req.params;

        // console.log(username);
        if (!username || userdata.username !== username) {
            throw new Error('Username is invalid.');
        }

        const query = UserTaskModel.find({ username, priority });
        const retrievedData = await query.exec();
        return res.status(200).json(retrievedData);
    } catch (error: any) {
        console.log(`Error while retrieving task${error}`);
        return res.status(400).send({ message: error.message });
    }
};

export const findAll = async (req: Request, res: Response) => {
    try {
        const userdata = (req as CustomRequest).userData;
        const { username } = req.params;

        // console.log(username);
        if (!username || userdata.username !== username) {
            throw new Error('Username is invalid.');
        }

        const query = UserTaskModel.find({ username });
        const retrievedData = await query.exec();
        return res.status(200).json(retrievedData);
    } catch (error: any) {
        console.log(`Error while retrieving task${error}`);
        return res.status(400).send({ message: error.message });
    }
};

export const updateTask = async (req: Request, res: Response) => {
    try {
        console.log("Inside Update Task---------");
        const userdata = (req as CustomRequest).userData;
        const { username } = req.body;
        const id = req.body._id;
        const { title } = req.body;
        const { description } = req.body;
        const { priority } = req.body;
        const { due_date } = req.body;
        const { assigned_to } = req.body;

        console.log(username);
        if (!username || userdata.username !== username) {
            throw new Error('Username is invalid.');
        }

        const taskDetails: UserTask = {
            username,
            title,
            description,
            priority,
            due_date,
            assigned_to,
        };

        const result: UserDetails = await UserDetailsModel.findOne({ username }) as any;

        const receiverMailId: string = result?.emailId;

        const updatedData: UserTask = (await UserTaskModel.findByIdAndUpdate(
            { _id: id },
            taskDetails,
            { new: true },
        ))?.toJSON() as UserTask;

        await sendNotification(updatedData, receiverMailId);

        return res.status(200).send(updatedData);

    } catch (error: any) {
        console.log(`Error while updating task${error}`);
        return res.status(400).send({ message: error.message });
    }
};

export const deleteTask = async (req: Request, res: Response) => {
    try {
        const { username } = req.params;
        const { taskId } = req.params;
        const { userData } = (req as CustomRequest);

        if (!username || username !== userData.username) {
            throw new Error('Username is invalid');
        }

        const query = UserTaskModel.findByIdAndDelete(taskId, { new: true });
        const result = query.exec();
        return res.status(200).send({ message: 'record deleted', deletedTaskDetails: result });
    } catch (error: any) {
        console.log(`Error while deleting task${error}`);
        return res.status(400).send({ message: error.message });
    }
};
