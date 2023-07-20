import connectToRedis from '../redis';
import * as Validations from './validations';
import HTTP_STANDARD_RESPONSES from '../utils/http/responses';
import STATUS_CODES from '../utils/http/statusCodes';
import createEmployee from './services/create';
import getEmployees from './services/getAll';
import getEmployee from './services/get';
import updateEmployeeDetails from './services/update';
import deleteEmployee from './services/delete';
import { checkIfUserExists } from './utils';

// Redis Connection
let redisClient = null;
(async () => {
  redisClient = await connectToRedis();
})();

const Controller = {
  ...Validations,
};

// Middleware to check user exists before Get, Update and Delete
// eslint-disable-next-line consistent-return
Controller.checkIfUserExists = async (req, res, next) => {
  const { params: { employeeId: id } = {} } = req;
  const userExists = await checkIfUserExists(redisClient, id);

  if (!userExists) {
    return res.status(STATUS_CODES.NOT_FOUND).send(HTTP_STANDARD_RESPONSES.USER_NOT_FOUND);
  }

  next();
};

/*
**  Get all Users
*/
Controller.getUsers = (...args) => getEmployees(redisClient, ...args);

/*
**  Get specific User with id
*/
Controller.getUser = (...args) => getEmployee(redisClient, ...args);

/*
**  Create New User
*/
Controller.addUser = (...args) => createEmployee(redisClient, ...args);

/*
**  Update existing User
*/
Controller.updateUser = (...args) => updateEmployeeDetails(redisClient, ...args);

/*
Function to Delete Each User
*/
Controller.deleteUser = (...args) => deleteEmployee(redisClient, ...args);

export default Controller;
