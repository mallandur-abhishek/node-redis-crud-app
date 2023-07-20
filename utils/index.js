export const isExisty = input => input !== undefined && input !== null;

export const isArray = arr => Object.prototype.toString.call(arr) === '[object Array]';
export const isEmptyArray = arr => isArray(arr) && arr.length === 0;

export const isObject = obj => Object.prototype.toString.call(obj) === '[object Object]';
export const isEmptyObject = obj => isObject(obj) && Object.keys(obj).length === 0;

export const isNumeric = value => typeof value === 'number';
