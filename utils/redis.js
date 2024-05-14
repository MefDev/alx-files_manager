import { createClient } from 'redis';
class RedisClient {
    constructor() {
        this.client = createClient();
        this.client.on('error', (error) => {
            console.error(error);
        });
    }

    isAlive() {
        return this.client.connected;
    }
    async get(key) {
        new Promise((resolve, reject) => {
            this.client.get(key, (err, reply) => {
                if (err) reject(err);
                resolve(reply);
            });
        });
    }
    async set(key, value, duration) {
        new Promise((resolve, reject) => {
            this.client.set(key, value, (err, reply) => {
                if (err) reject(err);
                resolve(reply);
            });
            this.client.expire(key, duration);
        });
    }
    del(key) {
        new Promise((resolve, reject) => {
            this.client.del(key, (err, reply) => {
                if (err) reject(err);
                resolve(reply);
            });
        });
    }
}
const redisClient = new RedisClient();
export default redisClient;
