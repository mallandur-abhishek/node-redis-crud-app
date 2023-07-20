/*
**    MiddleWare to Validate Request Input
*/

import { check, param, validationResult } from 'express-validator';
import HTTP_STANDARD_RESPONSES from '../utils/http/responses';
import STATUS_CODES from '../utils/http/statusCodes';
import { isNumeric } from '../utils';

const MIN_STRING_LENGTH = 6;
const AGE_CONSTRAINTS = {
  min: 18,
  max: 100,
};

const employeeNameCheck = check('employeeName', 'Name is missing').trim().isLength({ min: MIN_STRING_LENGTH })
.withMessage(`Employee Name must have more than ${MIN_STRING_LENGTH} characters!`)
.bail();

const ageCheck = check('age', 'Age is missing!').isInt({ min: AGE_CONSTRAINTS.min, max: AGE_CONSTRAINTS.max }).withMessage(`Age must be a number between ${AGE_CONSTRAINTS.min} - ${AGE_CONSTRAINTS.max}!`)
.bail();

export const validationChecks = {
  employeeIdParam: param('employeeId').exists().isMD5().withMessage('Invalid employeeId!'),
  employeeName: employeeNameCheck.optional(),
  employeeNameRequired: employeeNameCheck.notEmpty(),
  age: ageCheck.optional(),
  ageRequired: ageCheck.notEmpty(),
  email: check('email').optional().isEmail().withMessage('Provided email is invalid!'),
  salaryAmount: check('salaryAmount').isInt().withMessage('Salary must be a valid number!')
.custom((value = null) => {
  if (!isNumeric(value)) {
    throw new Error('Salary amount is invalid!');
  }
  return true;
})
.optional(),
  degreeDetails: check('degreeDetails').isArray().custom((degrees = []) => {
    degrees.forEach(degree => {
      if (typeof degree !== 'string') {
        throw new Error(`Degree ${degree} is invalid!`);
      }
    });
    return true;
  }).optional(),
};

// eslint-disable-next-line consistent-return
export const validateInput = async (req, res, next) => {
    // validationResult function checks for errors & returns an object
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const { errors: [{ msg: message = 'Missing field!' }] } = errors;
        return res.status(STATUS_CODES.BAD_REQUEST).send({ ...HTTP_STANDARD_RESPONSES.INVALID_INPUT, message });
    }

    next();
};

export const postReqValidations = [
  validationChecks.employeeNameRequired,
  validationChecks.ageRequired,
  validationChecks.email,
  validationChecks.salaryAmount,
  validationChecks.degreeDetails,
];
