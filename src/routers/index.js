import bodyParser from 'koa-bodyparser';
import Router from 'koa-express-router';

import * as RedisServ from '../services/redis';
import * as AuthServ from '../services/auth';
import { SoftError, Status } from '../utils';

/**
 * 导出根路由
 * @param {Koa} app
 */
export default function route(app) {
  const root = new Router({ prefix: '/api' });

  const session = RedisServ.session(app);
  const bodyparser = getBodyParser();

  root.use(
    session,
    bodyparser,
    initParam,
    AuthServ.block,
  );
}

function getBodyParser() {
  const options = {
    jsonLimit: '10mb',
    textLimit: '10mb',
    /**
     * @param {Error} e
     * @param {Context} ctx
     */
    onerror(e) {
      throw new SoftError(Status.BAD_REQUEST, '请求解析失败', 422, e);
    },
  };
  return bodyParser(options);
}

/**
 * 初始化Context.paramData
 * @param {Context} ctx
 * @param {()=>Promise<void>} next
 */
async function initParam(ctx, next) {
  ctx.paramData = {
    body: ctx.request.body,
    query: { ...ctx.request.query },
    session: ctx.session,
    host: ctx.host,
  };
  return next();
}
