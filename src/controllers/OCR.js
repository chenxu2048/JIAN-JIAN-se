import {OCR as OCRService} from '../services/youdaoOCR';
import { sendData } from '../utils';
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
        let sentence = resolveOCRResult(result);
        sendData(ctx, sentence.join(' ')); 
    } catch(error) {
        console.log(`ERROR::CATCH::${error}`);
        sendData(ctx, error);
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