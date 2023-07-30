import {Request, Response, NextFunction} from 'express';
import {userTaskModel} from '../model/userTasksSchema';
import { CustomRequest } from '../utils/jwtTokenUtil';


export const createTask = async (req: Request, res: Response) => {

    const userdata = (req as CustomRequest).userData;
    const title = req.body.title;
    const description = req.body.description;
    const priority = req.body.priority;
    const due_date = req.body.due_date;
    const assigned_to = req.body.assigned_to;
    const username = req.body.username;

    try {
        console.log(username);
        if(!username || userdata.username !== username) {
            throw new Error('Username is invalid.');
        }

        let taskDetails = new userTaskModel({
            username: username,
            title: title,
            description: description,
            priority: priority,
            due_date: due_date,
            assigned_to: assigned_to
        });

        userTaskModel.create(taskDetails);
        return res.status(201).json(taskDetails);
    }
    catch (error) {
        console.log ("Error while creating task" + error);
        return res.status(400).send({message: error.message});
    }
}

export const findByPriority = async (req: Request, res: Response) => {

    try {
        const userdata = (req as CustomRequest).userData;
        const priority = req.params.priority;
        const username = req.params.username;

        console.log(username);
        if(!username || userdata.username !== username) {
            throw new Error('Username is invalid.');
        }
 
        const query = userTaskModel.find({ username: username, priority: priority });
        const retrievedData = await query.exec();
        res.status(200).json(retrievedData);
    }
    catch (error) {
        console.log("Error while retrieving task" + error);
        return res.status(400).send({message: error.message});
    }
}

export const findAll = async (req: Request, res: Response) => {

    try {
        const userdata = (req as CustomRequest).userData;
        const username = req.params.username;

        console.log(username);
        if(!username || userdata.username !== username) {
            throw new Error('Username is invalid.');
        }
 
        const query = userTaskModel.find({ username: username });
        const retrievedData = await query.exec();
        res.status(200).json(retrievedData);
    }
    catch (error) {
        console.log("Error while retrieving task" + error);
        return res.status(400).send({message: error.message});
    }
}

export const updateTask = async (req: Request, res: Response) => {
    try {
        const userdata = (req as CustomRequest).userData;
        const username = req.body.username;
        const id = req.body._id;
        const title = req.body.title;
        const description = req.body.description;
        const priority = req.body.priority;
        const due_date = req.body.due_date;
        const assigned_to = req.body.assigned_to;

        console.log(username);
        if(!username || userdata.username !== username) {
            throw new Error('Username is invalid.');
        }

        let taskDetails = {
            username: username,
            title: title,
            description: description,
            priority: priority,
            due_date: due_date,
            assigned_to: assigned_to
        };

        const updatedData = await userTaskModel.findByIdAndUpdate({ _id : id }, taskDetails,{new: true});
        return res.status(200).send(updatedData);


    }
    catch (error) {
        console.log("Error while updating task" + error)
        return res.status(400).send({message: error.message});
    }
}

export const deleteTask = async (req: Request, res: Response) => {
    try {
        const username = req.params.username;
        const taskId = req.params.taskId;
        const userData = (req as CustomRequest).userData;

        if (!username || username !== userData.username) {
            throw new Error("Username is invalid");
        }
        
        const query = userTaskModel.findByIdAndDelete(taskId, {new : true});
        const result = query.exec();
        return res.status(200).send({message: "record deleted", deletedTaskDetails: result});
    }
    catch(error) {
        console.log("Error while deleting task" + error);
        return res.status(400).send({message: error.message});
    }
}