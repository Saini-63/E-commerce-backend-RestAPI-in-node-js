import express from 'express';
import { testController } from '../controllers/testController.js';

//router Object
const router = express.Router();

//routes
router.get('/test', testController);

//exports
export default router;