import redis from 'redis';
import { redis as redisConfig } from '../../config';
import { HardError, logger } from '../../utils/';

class ClientManager {
  constructor() {
    this.clients = [];
  }

  getClient(id, option = {}) {
    if (!this.clients[id]) {
      this.clients[id] = redis.createClient({ ...ClientManager.defaultConfig(), ...option });
    }
    return this.clients[id];
  }
  static defaultConfig() {
    const retryConfig = {
      retry_strategy(options) {
        const { error, attempt } = options;
        if (error) {
          const { code, stack, syscall } = error;
          logger.errorTimed(`[Redis] Redis出错\n${stack}\ncode: ${code}\nsyscall: ${syscall}`);
          if (code === 'ECONNREFUSED') {
            // End reconnecting on a specific error and flush all commands with
            // a individual error
            return new HardError('The server refused the connection');
          }
        }
        // reconnect after
        return Math.min(attempt * 100, 3000);
      },
    };
    return { ...redisConfig, ...retryConfig };
  }
}

export const manager = new ClientManager();
