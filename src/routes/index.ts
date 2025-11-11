import express from 'express';
import UsersController from '../controllers/UsersController';

const router = express.Router();

router.get('/users', UsersController.getAllUsers);
router.get('/users/:id', UsersController.getUserById);
router.post('/users', UsersController.createUser);
router.put('/users/:id', UsersController.updateUser);
router.delete('/users/:id', UsersController.deleteUser);

export default router;
