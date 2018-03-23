import { insertSquareSentences, getAllSquareSentences } from "../models/squareSentence";
import { getUserID, sendData, Status } from "../utils";

/**
 * 获得广场上的书摘
 * @param {Context} ctx
 */
export async function getSquareSenteces(ctx) {
    const result = await getAllSquareSentences();
    for (let i = 0; i < result.length; ++i) {
        result[i].sentences = result[i].sentence.split('#');
        delete result[i].sentence;
    }
    sendData(ctx, result, Status.OK);
}

/**
 * 分享书摘
 * @param {Context} ctx
 */
export async function postSquareSentences(ctx) {
    await insertSquareSentences(getUserID(ctx), prepareSentences(ctx)
                                , ctx.paramData.body.thoughts, ctx.paramData.body.isbn);
    sendData(ctx, {}, Status.OK);
}
/**
 * 去除分享到广场中的句子中的#号
 * 因为我使用#号分割
 * @param {Context} ctx 
 */
function prepareSentences(ctx) {
    console.log(ctx.paramData.body);
    sentences = ctx.paramData.body.sentences;
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
    
}