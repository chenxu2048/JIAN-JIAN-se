import { retriveCommentBySquareId, addCommentBySquareId } from "../models/comment";
import { sendData, getUserID, Status } from "../utils";

/**
 * 增加评论
 * @param {Context} ctx 
 * @author 吴博文
 */
export async function addComment(ctx) {
    try {
        await addCommentBySquareId(ctx.paramData.body.squareId, getUserID(ctx)
                            , ctx.paramData.body.comment);
        sendData(ctx, {}, Status.OK);
    } catch (error) {
        sendData(ctx, {}, Status.INTERNAL_ERROR);
        console.log(`ADD::COMMENT::ERROR::`);
        console.log(error);
    } 
}

/**
 * 获取某个广场的评论信息
 * @param {Context} ctx 
 */
export async function getComment(ctx) {
    let result = await retriveCommentBySquareId(ctx.paramData.query.squareId);
    sendData(ctx, result);
}