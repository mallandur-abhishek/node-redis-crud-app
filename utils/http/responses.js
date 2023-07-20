import STATUS_CODES from './statusCodes';

const HTTP_STANDARD_RESPONSES = {
    INVALID_INPUT: {
        error: 'Invalid Input!',
        status: STATUS_CODES.BAD_REQUEST,
    },
    USER_EXISTS: {
        error: 'Employee already exists with the given fields!',
        status: STATUS_CODES.BAD_REQUEST,
    },
    USER_CREATED: {
        message: 'Employee Created Successfully!',
        status: STATUS_CODES.CREATED,
    },
    USER_NOT_FOUND: {
        message: 'Employee not found with the given employeeId',
        status: STATUS_CODES.NOT_FOUND,
    },
    USER_UPDATED_SUCCESSFULLY: {
        message: 'Employee details updated successfully!',
        status: STATUS_CODES.OK,
    },
    USER_DELETED_SUCCESSFULLY: {
        message: 'Employee was deleted successfully!',
        status: STATUS_CODES.NO_CONTENT,
    },
    SOMETHING_WENT_WRONG: {
        message: 'Something went wrong!',
        status: STATUS_CODES.INTERNAL_SERVER_ERROR,
    },
    ENDPOINT_DOES_NOT_EXIST: {
        message: 'Method/Endpoint is not supported!',
        status: STATUS_CODES.NOT_FOUND,
    },
};

export default HTTP_STANDARD_RESPONSES;
