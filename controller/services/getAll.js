import { isEmptyObject } from '../../utils';
import { parseUser } from '../utils';
import STATUS_CODES from '../../utils/http/statusCodes';
import HTTP_STANDARD_RESPONSES from '../../utils/http/responses';

const getEmployees = async (redisClient, req, res) => {
    const result = [];

    try {
      // eslint-disable-next-line no-restricted-syntax
      for await (const key of redisClient.scanIterator()) {
          const user = await redisClient.hGetAll(key);
          if (!isEmptyObject(user)) result.push(parseUser(user));
      }
    } catch (error) {
      console.log(error);
      return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send({ ...HTTP_STANDARD_RESPONSES.SOMETHING_WENT_WRONG, error });
    }

    return res.status(STATUS_CODES.OK).send({ result, count: result.length });
};

export default getEmployees;
