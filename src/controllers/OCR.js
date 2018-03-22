import {OCR as OCRService} from '../services/youdaoOCR';
import { sendData } from '../utils';
/**
 * @param {Context} ctx
 */
export async function OCR(ctx, next) {
    let result = await OCRService(ctx.req.files[0].buffer);
    sendData(ctx, result);
}