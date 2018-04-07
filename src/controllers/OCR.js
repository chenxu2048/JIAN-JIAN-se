import {OCR as OCRService} from '../services/youdaoOCR';
import { sendData, SoftError, Status } from '../utils';
import youdao from '../services/youdaoNode';
import {youdao as youdaoConfig} from '../config';
// /**
//  * @param {Context} ctx
//  */
// export async function OCR(ctx, next) {
//     let result = await OCRService(ctx.req.files[0].buffer);
//     sendData(ctx, result);
// }

export async function OCR(ctx, next) {
    try {
        youdao.config({appKey: youdaoConfig.appId, appSecret : youdaoConfig.appSecret});
        let img = ctx.req.files[0].buffer.toString('Base64');
        let result = await youdao.ocr({img : img});
        // if (result.ErrorCode != 0) {
        //     throw new SoftError(Status.UNKNOWN_ERROR, 'API ERROR');
        // }
        let sentence = resolveOCRResult(result);
        sendData(ctx, {content : sentence.join(' ')});
    } catch(error) {
        throw new SoftError(Status.UNKNOWN_ERROR);
    }
}

function resolveOCRResult(result) {
    let sentence = new Array();
    let regions = result.Result.regions;
    for (let i in regions) {
        for (let j in regions[i].lines) {
            sentence.push(regions[i].lines[j].text);
        }
    }
    return sentence;
}