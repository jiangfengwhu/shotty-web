import { useEffect } from "react";
import { saveShottyImage, dismissWindow, showToast } from "@/shotty";
import { updateQuickBar } from "../store";
import { Canvas } from "fabric";
import { getCurrentBase64 } from "@/fabric/index.js";
import { base64ToBlob } from "@/utils/index.js";

function getCanvasBlob(canvas) {
  return new Promise(function (resolve) {
    resolve(base64ToBlob(getCurrentBase64(canvas)));
  });
}
/**
 * @param {Canvas} canvas
 */
export function useCanvasSave(canvas) {
  const handler = (e) => {
    if (e.metaKey && e.key === "s") {
      e.preventDefault();
      const base64String = getCurrentBase64(canvas);
      saveShottyImage({ base64String, closeWindow: true });
    } else if (e.metaKey && e.key === "c") {
      e.preventDefault();
      updateQuickBar({
        visible: false,
      });
      navigator.clipboard
        .write([
          new ClipboardItem({
            "image/png": getCanvasBlob(canvas),
          }),
        ])
        .then(() => {
          showToast({ message: "复制成功~" });
          dismissWindow();
        })
        .catch((err) => {
          showToast({ message: `复制失败，${err.message}` });
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
