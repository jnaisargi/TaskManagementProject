import nodemailer from 'nodemailer';
import { google} from 'googleapis';
import { UserTask } from '../model/userTasksSchema';

export const sendNotification = async (updatedData: UserTask, receiverMailId: string) => {
    
    console.log('Inside sendNotification----');

    const oAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URI);
    oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN});

    try {
        const accessToken: string = (await oAuth2Client.getAccessToken()).token as any;

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                type: 'OAuth2',
                user: 'nodejsdummy7@gmail.com',
                clientId : process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN,
                accessToken: accessToken
            }
        });
    
        var mailOptions = {
            name: 'Update on Task',
            from: '"Management System" nodejsdummy7@gmail.com',
            to: receiverMailId,
            subject: 'Task Updated',
            html: `<h1>Hi ${updatedData.username}, your task is updated</h1><br></br>
            <h3>Title - </h3><h3>${updatedData.title}</h3><br></br>
            <h3>Description - </h3><h3>${updatedData.description}</h3><br></br>
            <h3>Due Date - </h3><h3>${updatedData.due_date}</h3><br></br>
            <h3>Priority - </h3><h3>${updatedData.priority}</h3><br></br>
            <h3>AssignedTo - </h3><h3>${updatedData.assigned_to}</h3><br></br>`
        }
    
        await transporter.sendMail(mailOptions);

        // addNotificationDetailsToDB(updatedData, receiverMailId);
    }
    catch (error) {
        console.log(error);
        throw error;
    }
   
}

/*
function addNotificationDetailsToDB(updatedData: UserTask, receiverMailId: string) {
    try {
        // const userdata = (req as CustomRequest).userData;
        // const recepient_mailId = receiverMailId;
        // const task_id = updatedData.
    }
    catch(error) {
        throw error;
    }
    
}
*/