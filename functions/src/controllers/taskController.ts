import { Request, Response } from 'express';
import { UserTaskModel } from '../model/userTasksSchema';
import { CustomRequest } from '../utils/jwtTokenUtil';

export const createTask = async (req: Request, res: Response) => {
    const userdata = (req as CustomRequest).userData;
    const { title } = req.body;
    const { description } = req.body;
    const { priority } = req.body;
    const { dueDate } = req.body;
    const { assignedTo } = req.body;
    const { username } = req.body;

    try {
        console.log(username);
        if (!username || userdata.username !== username) {
            throw new Error('Username is invalid.');
        }

        const taskDetails = new UserTaskModel({
            username,
            title,
            description,
            priority,
            dueDate,
            assignedTo,
        });

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
        const userdata = (req as CustomRequest).userData;
        const { username } = req.body;
        const id = req.body._id;
        const { title } = req.body;
        const { description } = req.body;
        const { priority } = req.body;
        const { dueDate } = req.body;
        const { assignedTo } = req.body;

        console.log(username);
        if (!username || userdata.username !== username) {
            throw new Error('Username is invalid.');
        }

        const taskDetails = {
            username,
            title,
            description,
            priority,
            dueDate,
            assignedTo,
        };

        const updatedData = await UserTaskModel.findByIdAndUpdate(
            { _id: id },
            taskDetails,
            { new: true },
        );
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
