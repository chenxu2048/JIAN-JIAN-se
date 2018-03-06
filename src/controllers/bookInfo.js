import {resolveISBN} from '../services/ISBNService'
import { sendData } from '../utils';

/**
 * 用于处理 /isbn
 * @param {Context} ctx
 * @author 吴博文
 */
export async function queryBookInfo(ctx, next) {
    const queryResult = await resolveISBN(ctx.paramData.query.isbn);
    sendData(ctx, queryResult);
    return next();
}