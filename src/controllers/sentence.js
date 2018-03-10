import {insertSentenceByISBN, retriveSentencesByISBN} from '../models/sentence';
import { sendData, Status, getUserID } from '../utils';

/**
 * 添加一条书评
 * @param {Context} ctx
 * @param {} next
 */
export async function postSentence(ctx, next) {
    await insertSentenceByISBN(ctx.paramData.query.isbn, getUserID(ctx),
                                ctx.paramData.body.content,
                                ctx.paramData.body.thought);
    sendData(ctx, Status.OK);
}

/**
 * 查看某书的全部书评
 * @param {Context} ctx
 */
export async function getSentences(ctx, next) {
    const result = await retriveSentencesByISBN(ctx.paramData.query.isbn, getUserID(ctx));
    console.log(result);
    sendData(ctx, result);
}
