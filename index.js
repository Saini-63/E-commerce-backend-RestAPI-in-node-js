import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';

// dot env config
dotenv.config();


//PORT
const PORT = process.env.PORT || 8080;


//rest object
const app = express();

//middleware
app.use(morgan('dev'));
app.use(express.json());

//route
app.get('/', (req, res) => {
    return res.status(200).send("<h1>Welcome to Node server</h1>");
})

//Listen
app.listen(PORT, () => {
    console.log(`Server  is running on port ${PORT}`);
})

