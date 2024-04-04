import express from 'express';
import { loginController, registerController } from '../controllers/userController.js';

//router Object
const router = express.Router();

//<=========routes==========>
// Register
router.post('/register', registerController);

//Login
router.get('/login', loginController)

//export 
export default router;