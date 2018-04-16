import {insertSentenceByISBN, retriveSentencesByISBN, removeSentence, addBulkSentences} from '../models/sentence';
import { sendData, Status, getUserID, SoftError, filterEmoji } from '../utils';
import { retriveSquareById } from '../models/squareSentence';
import { STATUS_CODES } from 'http';

/**
 * 添加一条书评
 * @param {Context} ctx
 * @param {} next
 */
export async function postSentence(ctx, next) {
    await insertSentenceByISBN(ctx.paramData.query.isbn, getUserID(ctx),
                                filterEmoji(ctx.paramData.body.content),
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

/**
 * 获取路径中的广场Id
 * @param {Context} ctx
 */
export async function fetchSquareId(ctx, next, id) {
    const [result] = await retriveSquareById(id);
    if (!result) {
        throw new SoftError(Status.NOT_FOUND, "当前动态不存在", STATUS_CODES.NOT_FOUND);
    }
    ctx.paramData.squareId = id;
    return next();
}

export async function pickSentenceFromSquare(ctx) {
    const { squareId } = ctx.paramData;
    await addBulkSentences(getUserID(ctx), squareId);
    sendData(ctx, {});
}