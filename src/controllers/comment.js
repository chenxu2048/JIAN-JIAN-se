import * as CommentModel from "../models/comment";
import { sendData, getUserID, Status } from "../utils";

/**
 * 增加评论
 * @param {Context} ctx 
 * @author 吴博文
 */
export async function addComment(ctx) {
    const { squareId, comment } = ctx.paramData.body;
    const { user_id } = ctx.paramData.session;
    await CommentModel.addCommentBySquareId(squareId, user_id, comment);
    sendData(ctx, {}, Status.OK);
}

/**
 * 获取某个广场的评论信息
 * @param {Context} ctx 
 */
export async function getComment(ctx) {
    const { squareId } = ctx.query.body;
    const result = await CommentModel.retriveCommentBySquareId(squareId);
    sendData(ctx, result);
}