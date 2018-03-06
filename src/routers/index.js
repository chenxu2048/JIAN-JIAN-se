import bodyParser from 'koa-bodyparser';
import Router from 'koa-express-router';

import * as RedisServ from '../services/redis';
import { SoftError, Status, sendData } from '../utils';
import {queryBookInfo} from '../controllers/bookInfo';
import * as bookControllers from '../controllers/bookController';
import * as sentenceControllers from '../controllers/sentenceController';
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
    checkIsInWhiteList,
    blockUnauthorized,
  );
  root.route('/isbn')
      .get(queryBookInfo);
  root.route('/books')
      .get(bookControllers.getBooks)
      .post(bookControllers.postBook)
      .delete(bookControllers.deleteBook);
  root.route('/sentence')
      .get(sentenceControllers.getSentences)
      .post(sentenceControllers.postSentence);
  root.route('/square_sentences')
      .get();

  app.use(root.routes(false));
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

// 无需登录即可访问的 API
const whiteList = ['/api/isbn'
];

/**
 * 检查当前路径是否可以不检查登录
 * @param {Context} ctx
 * @param {{(): Promise<any>}} next
 */
async function checkIsInWhiteList(ctx, next) {
  ctx.paramData.inWhiteList = whiteList.some(onePath => ctx.originalUrl.startsWith(onePath));
  return next();
}

/**
 * 限制未登录请求
 * @param {Context} ctx
 * @param {()=>Promise<void>} next
 */
export async function blockUnauthorized(ctx, next) {
  const { user } = ctx.session;
  const { inWhiteList } = ctx.paramData;
  if (inWhiteList || user) {
    ctx.paramData.curUser = user;
    return next();
  }
  throw new SoftError(Status.NOT_AUTHORIZED, '未登录');
}

/**
 * 重定向
 * @param {Context} ctx
 * @param {()=>Promise<void>} next
 */
export function redirect(ctx, next) {

}
