import { insertSquareSentences } from "../models/squareSentence";
import { getUserID, sendData, Status } from "../utils";

/**
 * 获得广场上的书摘
 * @param {Context} ctx
 */
export async function getSquareSenteces(ctx) {
    
}

/**
 * 分享书摘
 * @param {Context} ctx
 */
export async function postSquareSentences(ctx) {
    await insertSquareSentences(getUserID(ctx), ctx.paramData.body.sentence_num,
                                ctx.paramData.body.thoughts,
                                ctx.paramData.body.sentence_id1,
                                ctx.paramData.body.sentence_id2,
                                ctx.paramData.body.sentence_id3);
    sendData(Status.OK, {});
}

/**
 * 点赞
 * @param {Context} ctx
 */
export async function putSquareSentences(ctx) {
    
}