import redis from 'redis';

const connectToRedis = async (port = process.env.REDIS_PORT, host = process.env.REDIS_HOST) => {
    const client = redis.createClient({ host, port });

    client.on('connect', () => {
      console.log('##########################################################');
      console.log('#####            REDIS STORE CONNECTED               #####');
      console.log('##########################################################\n');
    });

    client.on('error', err => {
      console.log(`Redis error: ${err}`);
    });

    await client.connect();
    return client;
};

export default connectToRedis;
