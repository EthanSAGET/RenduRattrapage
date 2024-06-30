import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import router from './router.js';
import dotenv from 'dotenv';
dotenv.config();



const app = express(); 
app.use(cors()); 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(router); //Définit les routes 

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});