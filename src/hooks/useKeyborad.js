import { useEffect } from "react";
import { message } from "antd";
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
            canvas.getElement().toBlob((blob) => {
                navigator.clipboard.write([
                    new ClipboardItem({ "image/png": blob })
                ]);
                message.success('复制成功');
            }, "image/png");
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