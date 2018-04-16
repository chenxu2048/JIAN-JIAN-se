import * as CommentModel from "../models/comment";
import * as SquareSentenceModel from "../models/squareSentence";
import { sendData, getUserID, Status, SoftError } from "../utils";

/**
 * 增加评论
 * @param {Context} ctx 
 * @author 吴博文
 */
export async function addComment(ctx) {
    const { comment } = ctx.paramData.body;
    const { squareId } = ctx.paramData.query;
    const {
        user: {user_id}
    } = ctx.paramData.session;
    await CommentModel.addCommentBySquareId(squareId, user_id, comment);
    sendData(ctx, {}, Status.OK);
}

/**
 * 获取某个广场的评论信息
 * 以及点赞等信息
 * @param {Context} ctx 
 */
export async function getComment(ctx) {
    const { squareId } = ctx.paramData.query;
    if (!squareId) {
        throw new SoftError("请检查参数是否完整");
    }
    const comments = await CommentModel.retriveCommentBySquareId(squareId);
    const [{num : zanNum}] = await SquareSentenceModel.getZanNum(squareId);
    const {length} = await SquareSentenceModel.retriveZanRecord(squareId, getUserID(ctx));
    sendData(ctx, {comments, zanNum, whetherZanByMe : length > 0});
}