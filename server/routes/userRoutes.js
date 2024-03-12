import { register, login, addAvatar, getAllUsers } from '../controllers/usersController.js';
import express from 'express';
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/addAvatar/:id', addAvatar);
router.get('/allUsers/:id', getAllUsers);

export default router;
