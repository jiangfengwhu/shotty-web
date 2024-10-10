import { useEffect } from "react";
import { message } from "antd";
import { saveShottyImage, dismissWindow } from "@/shotty";
import { updateQuickBar } from "../store";

function getCanvasBlob(canvas) {
  return new Promise(function (resolve, reject) {
    canvas.toBlob(function (blob) {
      resolve(blob);
    });
  });
}
/**
 * @param {fabric.Canvas} canvas
 */
export function useCanvasSave(canvas) {
  const handler = (e) => {
    if (e.metaKey && e.key === "s") {
      e.preventDefault();
      const base64String = canvas.toDataURL({
        format: "png",
        enableRetinaScaling: true,
      });
      saveShottyImage({ base64String, closeWindow: true });
      message.success("导出成功");
    } else if (e.metaKey && e.key === "c") {
      e.preventDefault();
      canvas.discardActiveObject();
      canvas.renderAll();
      updateQuickBar({
        visible: false,
      });
      navigator.clipboard
        .write([
          new ClipboardItem({
            "image/png": getCanvasBlob(canvas.getElement()),
          }),
        ])
        .then(() => {
          message.success("复制成功");
          dismissWindow();
        })
        .catch((err) => {
          console.log(err, "zxzx");
          message.error("复制失败");
        });
    }
  };
  useEffect(() => {
    if (!canvas) return;
    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [canvas]);
}
