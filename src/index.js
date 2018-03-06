import app from './app';
import { port, host, isInDev } from './config';
import { logger } from './utils';

app.listen(port, () => {
  const server_env = isInDev ? '调试' : '生产';
  logger.info(`服务端在${host}:${port}处启动, 处于${server_env}环境`);
});

process.on('unhandledRejection', (err) => {
  logger.errorTimed(`[UnhandledRejection]:${err.name} - ${err.message}\n${err.stack}`);
  process.exit(1);
});
process.on('uncaughtException', (err) => {
  logger.errorTimed(`[UncaughtException]:${err.name} - ${err.message}\n${err.stack}`);
  process.exit(1);
});
