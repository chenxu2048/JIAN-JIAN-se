import app from './app';
import { port, host, isInDev } from './config';
import { logger } from './utils';

app.listen(port, () => {
  const server_env = isInDev ? '调试' : '生产';
  logger.info(`服务端在${host}:${port}处启动, 处于${server_env}环境`);
});
