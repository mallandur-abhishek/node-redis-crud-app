import { isEmptyObject } from '../utils';

export const checkIfUserExists = async (client, id = '') => {
    const user = await client.hGetAll(id);
    return !isEmptyObject(user);
  };

export const parseUser = (user = {}) => Object.entries(user).reduce((acc, [key, value] = []) => ({ ...acc, [key]: JSON.parse(value) }), {});
