/* eslint-disable prettier/prettier */
import express from 'express';
import UsersController from '../controllers/users.controller';
import WorkoutPlansController from '../controllers/workout-plans.controller';
import ExercisesController from '../controllers/exercises.controller';
import ExercisesProgressionsController from '../controllers/exercise-progressions.controller';
import CalendarController from '../controllers/calendar.controller';

const router = express.Router();
const endpoint = '/api';

// Users routes
router.get(`${endpoint}/users`, UsersController.getAllUsers);
router.get(`${endpoint}/users/:id`, UsersController.getUserById);
router.post(`${endpoint}/users`, UsersController.createUser);
router.put(`${endpoint}/users/:id`, UsersController.updateUser);
router.delete(`${endpoint}/users/:id`, UsersController.deleteUser);

// Workout Plans routes
router.get(`${endpoint}/workoutPlans`, WorkoutPlansController.GetAllWorkoutPlans);
router.get(`${endpoint}/workoutPlans/:id`, WorkoutPlansController.GetWorkoutPlanById);
router.post(`${endpoint}/workoutPlans`, WorkoutPlansController.CreateWorkoutPlan);
router.put(`${endpoint}/workoutPlans/:id`, WorkoutPlansController.UpdateWorkoutPlan);
router.delete('${endpoint}/workoutPlans/:id', WorkoutPlansController.DeleteWorkoutPlan);

// Exercises routes
router.get(`${endpoint}/exercises`, ExercisesController.GetAllProgression);
router.get(`${endpoint}/exercises/:id`, ExercisesController.GetExerciseById);
router.post(`${endpoint}/exercises`, ExercisesController.CreateExercise);
router.delete(`${endpoint}/exercises/:id`, ExercisesController.DeleteExercise);

// Exercise progression routes
router.get(`${endpoint}/exerciseProgressions`, ExercisesProgressionsController.GetAllProgression);
router.get(`${endpoint}/exerciseProgressions/:id`, ExercisesProgressionsController.GetProgressionById);
router.post(`${endpoint}/exerciseProgressions`, ExercisesProgressionsController.CreateProgression);
router.put(`${endpoint}/exerciseProgressions/:id`, ExercisesProgressionsController.UpdateProgressions);
router.delete(`${endpoint}/exerciseProgressions/:id`, ExercisesProgressionsController.DeleteProgression);

// Calendar routes
router.get(`${endpoint}/calendar`, CalendarController.GetAllCalendarEvents);
router.get(`${endpoint}/calendar/:id`, CalendarController.GetCalendarEvents);
router.post(`${endpoint}/calendar`, CalendarController.CreateCalendarEvent);
router.delete(`${endpoint}/calendar/:id`, CalendarController.DeleteCalendarEvent);

export default router;
