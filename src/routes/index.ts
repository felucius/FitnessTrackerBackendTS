import express from 'express';
import UsersController from '../controllers/users.controller';
import WorkoutPlansController from '../controllers/workout-plans.controller';
import ExercisesController from '../controllers/exercises.controller';

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
router.put('/workoutPlans/:id', WorkoutPlansController.UpdateWorkoutPlan);
router.delete('/workoutPlans/:id', WorkoutPlansController.DeleteWorkoutPlan);

// Exercises routes
router.get('/exercises', ExercisesController.GetAllProgression);
router.get('/exercises/:id', ExercisesController.GetExerciseById);
// router.post('/exercises', ExercisesController.CreateExercise);
// router.delete('/exercises/:id', ExercisesController.DeleteExercise);

export default router;
