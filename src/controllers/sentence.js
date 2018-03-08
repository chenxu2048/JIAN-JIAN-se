import {insertSentenceByISBN, retriveSentencesByISBN} from '../models/sentence';
import { sendData, Status, getUserID } from '../utils';

/**
 * 添加一条书评
 * @param {Context} ctx
 * @param {} next
 */
export async function postSentence(ctx, next) {
    await insertSentenceByISBN(ctx.paramData.body.isbn, getUserID(ctx), ctx.paramData.body.sentence);
    sendData(ctx, Status.OK);
}

/**
 * 查看某书的全部书评
 * @param {Context} ctx
 */
export async function getSentences(ctx, next) {
    const result = await retriveSentencesByISBN(ctx.paramData.body.isbn, getUserID(ctx));
    console.log(result);
    return result;
}
