import { parseUser } from '../utils';
import { isExisty, isEmptyObject } from '../../utils';
import STATUS_CODES from '../../utils/http/statusCodes';
import HTTP_STANDARD_RESPONSES from '../../utils/http/responses';

const getEmployee = async (redisClient, req, res) => {
    const { params: { employeeId } = {} } = req;

    try {
      if (isExisty(employeeId)) {
        const user = await redisClient.hGetAll(employeeId);
        if (!isEmptyObject(user)) {
          return res.status(STATUS_CODES.OK).send({ result: [parseUser(user)], count: 1 });
        }
        return res.status(STATUS_CODES.NOT_FOUND).send(HTTP_STANDARD_RESPONSES.USER_NOT_FOUND);
      }
    } catch (error) {
        console.log(error);
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send({ ...HTTP_STANDARD_RESPONSES.SOMETHING_WENT_WRONG, error });
    }

    return res.status(STATUS_CODES.BAD_REQUEST).send(HTTP_STANDARD_RESPONSES.INVALID_INPUT);
};

export default getEmployee;
