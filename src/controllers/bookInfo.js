import { sendData } from '../utils';
import {getBookInfo} from '../models/bookInfo'
/**
 * 用于处理 /isbn
 * @param {Context} ctx
 * @author 吴博文
 */
export async function queryBookInfo(ctx, next) {
    const queryResult = await getBookInfo(ctx.paramData.query.isbn);
    sendData(ctx, queryResult);
    return next();
}