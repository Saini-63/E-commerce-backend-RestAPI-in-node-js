import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';

//Database import
import connectDB from './config/db.js';

// routes import 
import testRoutes from './routes/testRoutes.js';
import userRoutes from './routes/userRoutes.js';

// dot env config
dotenv.config();

//database Connection
connectDB();

//PORT
const PORT = process.env.PORT || 8080;

//rest object
const app = express();

//middleware
app.use(morgan('dev'));
app.use(express.json());

//route
app.use('/api/v1', testRoutes);
app.use('/api/v1/user', userRoutes);

//Listen
app.listen(PORT, () => {
    console.log(`Server  is running on port ${PORT}`);
})

