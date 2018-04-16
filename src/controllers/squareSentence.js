import * as SquareSentenceModel from "../models/squareSentence";
import { getUserID, sendData, Status } from "../utils";

/**
 * 获得广场上的书摘
 * @param {Context} ctx
 */
export async function getSquareSenteces(ctx) {
    const result = await SquareSentenceModel.getAllSquareSentences(getUserID(ctx));
    sendData(ctx, result);
}

/**
 * 分享书摘
 * @param {Context} ctx
 */
export async function postSquareSentences(ctx) {
    const {
        user: {user_id}
    } = ctx.paramData.session;
    const { isbn, thoughts, sentence_ids } = ctx.paramData.body;

    await SquareSentenceModel.insertSquareSentences(getUserID(ctx), sentence_ids, thoughts, isbn);
    sendData(ctx, {});
}
/**
 * 去除分享到广场中的句子中的#号
 * 因为我使用#号分割
 * @param {Context} ctx 
 */
function prepareSentences(ctx) {
    let sentences = ctx.paramData.body.sentences;
    for (let i = 0; i < sentences.length; ++i) {
        sentences[i] = sentences[i].replace('#', '');
    }
    return sentences.join('#');
}
/**
 * 点赞
 * @param {Context} ctx
 */
export async function putSquareSentences(ctx) {
    const { user_id } = ctx.paramData.session;
    const { square_id } = ctx.paramData.body;
    await SquareSentenceModel.addZan(square_id, user_id);
    sendData(ctx, {});
}