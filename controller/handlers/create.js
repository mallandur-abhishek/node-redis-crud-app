import md5 from 'md5';
import { checkIfUserExists } from '../utils';
import STATUS_CODES from '../../utils/http/statusCodes';
import HTTP_STANDARD_RESPONSES from '../../utils/http/responses';

const createEmployee = async (redisClient, req, res) => {
    const { body = {} } = req;
    const { employeeName = '', age = null } = body;
    const newUserId = md5(`${employeeName}__${age}`); // Since name & age are the only REQUIRED fields
    const userObj = {
      ...body,
      employeeId: newUserId,
    };

    if (await checkIfUserExists(redisClient, newUserId)) {
      return res.status(STATUS_CODES.BAD_REQUEST).send(HTTP_STANDARD_RESPONSES.USER_EXISTS);
    }

    // Add New User
    try {
      await redisClient.hSet(
          newUserId,
          Object.entries(userObj).reduce((acc, [key, value] = []) => ([...acc, key, JSON.stringify(value)]), []),
      );
    } catch (error) {
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send({ ...HTTP_STANDARD_RESPONSES.SOMETHING_WENT_WRONG, error });
    }

    return res.status(STATUS_CODES.CREATED).send({ ...HTTP_STANDARD_RESPONSES.USER_CREATED, employee: userObj });
};

export default createEmployee;
