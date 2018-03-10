import { insertSquareSentences, getAllSquareSentences } from "../models/squareSentence";
import { getUserID, sendData, Status } from "../utils";

/**
 * 获得广场上的书摘
 * @param {Context} ctx
 */
export async function getSquareSenteces(ctx) {
    const result = await getAllSquareSentences();
    
}

/**
 * 分享书摘
 * @param {Context} ctx
 */
export async function postSquareSentences(ctx) {
    await insertSquareSentences(getUserID(ctx), ctx.paramData.body.sentences.join('#')
                                , ctx.paramData.body.thoughts);
    sendData(Status.OK, {});
}

/**
 * 点赞
 * @param {Context} ctx
 */
export async function putSquareSentences(ctx) {
    
}