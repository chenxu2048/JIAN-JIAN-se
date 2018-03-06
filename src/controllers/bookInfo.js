import {resolveISBN} from '../services/ISBNService'
import { sendData } from '../utils';

/**
 * 用于处理 /isbn
 * @param {Context} ctx
 * @author 吴博文
 */
export async function queryBookInfo(ctx, next) {
    const queryResult = await resolveISBN(ctx.paramData.query.isbn);
    if (queryResult) {
        sendData(ctx, queryResult);
    } else {
        sendData(ctx, null, "查询失败", "Fail", 404);
    }
}