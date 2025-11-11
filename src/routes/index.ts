import express from 'express';
import UsersController from '../controllers/users.controller';
import WorkoutPlansController from '../controllers/workout-plans.controller';

const router = express.Router();

// Users routes
router.get('/users', UsersController.getAllUsers);
router.get('/users/:id', UsersController.getUserById);
router.post('/users', UsersController.createUser);
router.put('/users/:id', UsersController.updateUser);
router.delete('/users/:id', UsersController.deleteUser);

// Workout Plans routes
router.get('/workoutPlans', WorkoutPlansController.GetAllWorkoutPlans);
router.get('/workoutPlans/:id', WorkoutPlansController.GetWorkoutPlanById);
router.post('/workoutPlans', WorkoutPlansController.CreateWorkoutPlan);

export default router;
