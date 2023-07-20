# node-redis-API
CRUD RESTFUL API using Node JS, Express JS, and Redis.


## API Features
```
1. Create Employee
2. Get all Employees
3. Get Each Employee by ID
4. Delete Employee
5. Update Employee
```

## Getting Started

Ensure Redis is [Installed](https://redis.io/docs/getting-started/installation/) and [running](https://redis.io/docs/getting-started/) on the machine.

  1. `git clone https://github.com/mallandur-abhishek/node-redis-crud-app.git`
  2. `cd node-redis-crud-app`
  3. `npm install`
  4. `npm start`

The above will get you a copy of the project up and running on your local machine.

## Dependencies
```
  1. REDIS
  2. NodeJS
  3. ExpressJS
```

## Packages
```
  1. body-parser
  2. md5
  3. dotenv
  4. morgan
  5. debug
  6. express-validator
  7. eslint
```

## API Endpoints

All API endpoints return a status code of 200 for successful calls and 400 including an error object for unsuccessful calls.

```
| EndPoint                                |   Functionality                      |
| --------------------------------------- | ------------------------------------ |
| POST /employees                         | Create Employee                      |
| GET /employees/:employeeId              | Get Employee                         |
| GET /employees                          | Get all Employees                    |
| PUT /employees/:employeeId              | Update Employee                      |
| DELETE /employees/:employeeId           | Delete Employee                      |
```

## Create Employee Example

To Create a Employee, Provide the Name and Age of the employee (along with optional fields like email, salaryAmount, degreeDetails):
```
{
"name": "John Doe",
"age": 26
"email": "sample@gmail.com",
}
```
## Create Employee Example Response
```
{
    "status": 201,
    "message": "Employee Created Successfully!",
    "employee": {
        "email": "sample@gmail.com",
        "name": "John Doe",
        "age": 26,
        "employeeId": "acb479080840025a9c03f8453f5c853c"
    }
}
```


The API responds with JSON data by default.

