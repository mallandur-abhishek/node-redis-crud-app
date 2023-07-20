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

const validationMessages = {
  employeeId: {
    invalid: 'EmployeeId is invalid!',
  },
  age: {
    missing: 'Age is required!',
    invalid: `Age must be a number between ${AGE_CONSTRAINTS.min} - ${AGE_CONSTRAINTS.max}!`,
  },
  employeeName: {
    missing: 'Name is required!',
    invalid: `Employee Name must have more than ${MIN_STRING_LENGTH} characters!`,
  },
  email: {
    invalid: 'Provided email is invalid!',
  },
  salaryAmount: {
    invalid: 'Salary must be a valid number!',
  },
};

export const validationChecks = {
  employeeIdParam: param('employeeId').exists().isMD5().withMessage(validationMessages.employeeId.invalid),
  employeeName: check('employeeName', validationMessages.employeeName.missing).trim().isLength({ min: MIN_STRING_LENGTH })
  .withMessage(validationMessages.employeeName.invalid)
.optional(),
  employeeNameRequired: check('employeeName', validationMessages.employeeName.missing).trim().isLength({ min: MIN_STRING_LENGTH })
  .withMessage(validationMessages.employeeName.invalid)
.notEmpty()
.bail(),
  age: check('age', validationMessages.age.missing).isInt(AGE_CONSTRAINTS).withMessage(validationMessages.age.invalid).optional(),
  ageRequired: check('age', validationMessages.age.missing).isInt(AGE_CONSTRAINTS).withMessage(validationMessages.age.invalid).notEmpty()
.bail(),
  email: check('email').optional().isEmail().withMessage(validationMessages.email.invalid),
  salaryAmount: check('salaryAmount').isInt().withMessage(validationMessages.salaryAmount.invalid)
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

export const postReqValidations = [
  validationChecks.employeeNameRequired,
  validationChecks.ageRequired,
  validationChecks.email,
  validationChecks.salaryAmount,
  validationChecks.degreeDetails,
];

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
