import STATUS_CODES from '../../utils/http/statusCodes';
import HTTP_STANDARD_RESPONSES from '../../utils/http/responses';
import { isExisty } from '../../utils';

const updateEmployeeDetails = async (redisClient, req, res) => {
    const { body = {}, params: { employeeId } = {} } = req;
    const {
 employeeName: newEmployeeName, email: newEmail, age: newAge, salaryAmount: newSalary, degreeDetails: newDegreeDetails,
} = body || {};

    const user = await redisClient.hGetAll(employeeId);
    const {
 employeeName, email, age, salaryAmount, degreeDetails,
} = user || {};

    const userObj = {
        employeeId,
        employeeName: newEmployeeName || (isExisty(employeeName) && JSON.parse(employeeName)),
        email: newEmail || (isExisty(email) && JSON.parse(email)),
        age: newAge || (isExisty(age) && JSON.parse(age)),
        salaryAmount: newSalary || (isExisty(salaryAmount) && JSON.parse(salaryAmount)),
        degreeDetails: newDegreeDetails || (isExisty(degreeDetails) && JSON.parse(degreeDetails)),
    };

    // Add New User
    try {
        await redisClient.hSet(
            employeeId,
            Object.entries(userObj).reduce((acc, [key, value] = []) => ([...acc, key, JSON.stringify(value)]), []),
        );
    } catch (error) {
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send({ ...HTTP_STANDARD_RESPONSES.SOMETHING_WENT_WRONG, error });
    }

    return res.status(STATUS_CODES.OK).send(HTTP_STANDARD_RESPONSES.USER_UPDATED_SUCCESSFULLY);
};

export default updateEmployeeDetails;
