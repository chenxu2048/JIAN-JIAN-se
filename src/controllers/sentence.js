import {insertSentenceByISBN, retriveSentencesByISBN, removeSentence} from '../models/sentence';
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
    sendData(ctx, result);
}

/**
 * 删除某条句子
 * @param {Context} ctx
 */
export async function deleteSentences(ctx) {
    // 删除句子，传入id和user_id
    for (let i = 0; i < ctx.paramData.body.sentence_id.length; ++i) {
        await removeSentence(ctx.paramData.body.sentence_id[i], getUserID(ctx));
    }
    sendData(ctx, {}, Status.OK);
}