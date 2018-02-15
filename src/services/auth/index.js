import { SoftError, Status } from '../../utils';

/**
 * 限制未登录请求
 * @param {Context} ctx
 * @param {()=>Promise<void>} next
 */
export async function block(ctx, next) {
  const { user } = ctx.session;
  if (user) {
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
