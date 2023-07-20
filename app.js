import dotenv from 'dotenv';
import app from './server';

// import environmental variables from our variables.env file
dotenv.config();

// Start Server
app.set('port', process.env.PORT || 7777);

const server = app.listen(app.get('port'), () => {
  console.log('##########################################################');
  console.log('#####               STARTING SERVER                  #####');
  console.log('##########################################################\n');
  console.log(`Express running → PORT ${server.address().port}`);
});

export default server;
