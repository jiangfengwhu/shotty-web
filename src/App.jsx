import { Canvas } from "fabric";
import { useEffect, useRef, useState } from "react";
import { canvasContainer, toolbarContainer } from "./App.module.css";
import { ToolBar } from "./components/toolbar/ToolBar.jsx";
import { resizeCanvas } from "./fabric/index.js";
import { useResize, useQuickBar } from "./hooks/fabric.js";
import { useCanvasSave } from "./hooks/useKeyborad.js";
import { initShotty } from "./shotty/index.js";
import { Provider } from "jotai";
import { globalStore } from "./store/index.js";
import { QuickBar } from "./components/quickbar";
function App() {
  const canvasRef = useRef(null);
  const [fabricCanvas, setFabricCanvas] = useState(null);

  useEffect(() => {
    const canvas = new Canvas(canvasRef.current);
    canvas.preserveObjectStacking = true;
    resizeCanvas(canvas);
    setFabricCanvas(canvas);
    initShotty(canvas);
    return () => {
      canvas.dispose();
    };
  }, []);
  useResize(fabricCanvas);
  useCanvasSave(fabricCanvas);
  useQuickBar(fabricCanvas);
  return (
    <div className={canvasContainer}>
      <canvas ref={canvasRef}></canvas>
      <div className={toolbarContainer}>
        {fabricCanvas && <ToolBar canvas={fabricCanvas} />}
      </div>
      <Provider store={globalStore}>
        <QuickBar canvas={fabricCanvas} />
      </Provider>
    </div>
  );
}

export default App;
