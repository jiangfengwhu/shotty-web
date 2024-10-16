import { addBase64Image } from "../fabric/index.js";
import { jsBridge } from "../bridge/index.js";

function genBase64(base64) {
  return `data:image/png;base64,${base64}`;
}
/**
 * @param {fabric.Canvas} canvas
 */
function initShotty(canvas) {
  jsBridge.registerHandler("newShottyImageCallback", (data) => {
    addBase64Image(canvas, genBase64(data.base64));
    // performOCR({ base64: data.base64 }, (result) => {
    //   console.log(result, "result");
    // });
  });
}

/**
 * @param {Object} params - 参数对象
 * @param {string} params.base64String - 要保存的base64字符串
 * @param {boolean} params.closeWindow - 是否关闭窗口
 */
function saveShottyImage(params) {
  jsBridge.callHandler("saveBase64ImageCallback", params);
}

function dismissWindow() {
  jsBridge.callHandler("hideContentViewCallback", {});
}

/**
 * 显示Toast消息
 * @param {Object} params - 参数对象
 * @param {string} params.message - 要显示的消息内容
 */
function showToast(params) {
  jsBridge.callHandler("showToastCallback", params);
}

/**
 * @param {base64: string} params
 * @param {function} callback
 */
function performOCR(params, callback) {
  jsBridge.callHandler("performOCRCallback", params, callback);
}

export { initShotty, saveShottyImage, dismissWindow, showToast, performOCR };
