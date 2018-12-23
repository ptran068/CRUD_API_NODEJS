import { Router } from 'express';
import UserController from '../controllers/user';

const router = new Router();

// Get all users
router.get('/users', UserController.getUsers);
router.post('/users', UserController.addUser);
router.put('/users/:id', UserController.updateUser);
router.delete('/users/:id', UserController.deleteUser);


export default router;