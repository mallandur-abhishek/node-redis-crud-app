import STATUS_CODES from '../../utils/http/statusCodes';
import HTTP_STANDARD_RESPONSES from '../../utils/http/responses';

const deleteEmployee = async (redisClient, req, res) => {
  const { params: { employeeId } = {} } = req;

  try {
    await redisClient.del(employeeId);
  } catch (error) {
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send({ ...HTTP_STANDARD_RESPONSES.SOMETHING_WENT_WRONG, error });
  }

  return res.status(STATUS_CODES.NO_CONTENT).send(HTTP_STANDARD_RESPONSES.USER_DELETED_SUCCESSFULLY);
};

export default deleteEmployee;
