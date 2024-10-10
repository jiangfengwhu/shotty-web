import { addBase64Image } from "../fabric/index.js";

function genBase64(base64) {
  return `data:image/png;base64,${base64}`;
}
/**
 * @param {fabric.Canvas} canvas
 */
function initShotty(canvas) {
  if (window.shottyImageBase64) {
    addBase64Image(canvas, genBase64(window.shottyImageBase64));
  }
  window.onShottyImage = (base64) => {
    addBase64Image(canvas, genBase64(base64));
  };
}

function saveShottyImage(params) {
  window.webkit.messageHandlers.saveBase64ImageHandler.postMessage?.(params);
}

function dismissWindow() {
  window.webkit.messageHandlers.hideContentViewHandler.postMessage?.("z");
}

export { initShotty, saveShottyImage, dismissWindow };
