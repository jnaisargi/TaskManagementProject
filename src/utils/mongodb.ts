const express = require('express');
const {mongoose} = require('mongoose');

export let db;

export const connectToDB = () => {
    let mongodb = 'mongodb://127.0.0.1/my_database';
    mongoose.connect(mongodb);
    db = mongoose.connection;

    db.on('connected', () => { console.log('Connected to MongoDB'); });
    db.on('error', () => { console.log('Error connecting to DB'); });
    return db;
}