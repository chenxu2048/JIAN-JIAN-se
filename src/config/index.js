import development from './conf.dev';
import production from './conf.prod';

export const { NODE_ENV = 'development' } = process.env;

const config = getConfig();
export default config;
export const isInDev = NODE_ENV === 'development';
export const mysql = config.mysql;
export const redis = config.redis;
export const port = config.port;
export const session = config.session;
export const wechat = config.wechatAuth;

/** @return {typeof development} */
function getConfig() {
  const map = { development, production };
  const conf = map[NODE_ENV] || development;
  const { PORT = conf.port } = process.env;
  Object.assign(conf, { port: PORT });
  return conf;
}
