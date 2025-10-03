// Implement Login and Registration routes here
import express from 'express';
import { register, login, logout } from '../Controllers/authController.js';

const router = express.Router();


//create the routes which are defined in controller folder
router.post('/login', login);
router.post('/register', register);
router.post('/logout', logout);

export default router;