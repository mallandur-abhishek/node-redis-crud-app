import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import routes from './routes';
import STATUS_CODES from './utils/http/statusCodes';
import HTTP_STANDARD_RESPONSES from './utils/http/responses';

const app = express();

app.use(logger());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Handle Routes
app.use('/', routes);

// Middleware - Error handler
app.use((req, res) => {
  res.status(STATUS_CODES.NOT_FOUND).send(HTTP_STANDARD_RESPONSES.ENDPOINT_DOES_NOT_EXIST);
});

export default app;
