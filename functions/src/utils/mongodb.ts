const { mongoose } = require('mongoose');

// eslint-disable-next-line import/no-mutable-exports
export let db: any;

export const connectToDB = () => {
    const mongodb = 'mongodb://127.0.0.1/my_database';
    mongoose.connect(mongodb);
    db = mongoose.connection;

    db.on('connected', () => { console.log('Connected to MongoDB'); });
    db.on('error', () => { console.log('Error connecting to DB'); });
    return db;
};
