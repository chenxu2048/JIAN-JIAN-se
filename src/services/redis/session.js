import KoaRedis from 'koa-redis';
import session from 'koa-session';
import compose from 'koa-compose';
import manager from './Manager';
import { session as sessionConfig, redis as redisConfig } from '../../config';

const { namespaces: { session: namespace } } = redisConfig;
const sessionRedisConfig = {
  db: 0,
  prefix: `${namespace}:`,
};
const client = manager.getClient(0, { ...sessionRedisConfig });
const store = new KoaRedis({ client });
const sessionOpt = { ...sessionConfig, store };

export default app => session(sessionOpt, app);
