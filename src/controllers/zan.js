import * as SquareSentenceModel from "../models/squareSentence";
import { getUserID, sendData } from "../utils";

/**
 * 
 * @param {Context} ctx 
 */
export async function zanSquare(ctx) {
    const {squareId} = ctx.paramData.query;
    const {affectedRows} = await SquareSentenceModel.addZan(squareId, getUserID(ctx));
    sendData(ctx, {result : affectedRows > 0});
}

export async function cancleZanSquare(ctx) {
    const {squareId} = ctx.paramData.query;
    const {affectedRows} = await SquareSentenceModel.removeZanRecord(squareId, getUserID(ctx));
    sendData(ctx, {result : affectedRows > 0});
}