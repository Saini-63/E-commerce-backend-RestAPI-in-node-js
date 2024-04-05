import express from 'express';
import { getUserProfileController, loginController, logoutController, registerController } from '../controllers/userController.js';
import { isAuth } from './../middlewares/userAuthMiddleware.js';

//router Object
const router = express.Router();

//<=========routes==========>
// Register
router.post('/register', registerController);

//Login
router.get('/login', loginController)

//Profile
router.get('/profile', isAuth, getUserProfileController)

//LogOut
router.get('/logout', isAuth, logoutController)

//export 
export default router;