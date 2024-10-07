import { useEffect } from "react";
import { message } from "antd";
function getCanvasBlob(canvas) {
    return new Promise(function(resolve, reject) {
      canvas.toBlob(function(blob) {
        resolve(blob)
      })
    })
}
/**
 * @param {fabric.Canvas} canvas 
 */
export function useCanvasSave(canvas) {
    const handler = (e) => {
        if (e.metaKey && e.key === 's') {
            e.preventDefault();
            const base64 = canvas.toDataURL({
                format: 'png',
            });
            window.webkit.messageHandlers.saveBase64ImageHandler.postMessage?.(base64);
            message.success('导出成功');
        } else if (e.metaKey && e.key === 'c') {
            e.preventDefault();
            navigator.clipboard.write([
                new ClipboardItem({ "image/png": getCanvasBlob(canvas.getElement()) })
            ]).then(() => {
                message.success('复制成功');
            }).catch((err) => {
                message.error('复制失败');
            });
        }
    }
    useEffect(() => {
        if (!canvas) return;
        window.addEventListener('keydown', handler);
        return () => {
            window.removeEventListener('keydown', handler);
        }
    }, [canvas]);
}