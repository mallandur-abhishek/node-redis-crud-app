import express from 'express';
import appController from './controller/index';

const router = express.Router();

/*
Route to get employee using id
*/
router.get(
  '/api/employees/:employeeId',
  [appController.validationChecks.employeeIdParam],
  appController.validateInput,
  appController.getUser,
);

/*
Route to get all employees
*/
router.get(
  '/api/employees',
  appController.getUsers,
);

/*
Route to Add New User.
*/
router.post(
  '/api/employees',
  appController.postReqValidations,
  appController.validateInput,
  appController.addUser,
);

/*
Route to get Update user
*/
router.put(
  '/api/employees/:employeeId',
  [
    appController.validationChecks.employeeIdParam,
    appController.validationChecks.email,
    appController.validationChecks.age,
    appController.validationChecks.salaryAmount,
    appController.validationChecks.degreeDetails,
  ],
  appController.validateInput,
  appController.checkIfUserExists,
  appController.updateUser,
);

/*
Route to get Delete Each user
*/
router.delete(
  '/api/employees/:employeeId',
  [appController.validationChecks.employeeIdParam],
  appController.validateInput,
  appController.checkIfUserExists,
  appController.deleteUser,
);

export default router;
