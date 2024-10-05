import { Canvas } from 'fabric';
import { useEffect, useRef, useState } from 'react';
import { canvasContainer, toolbarContainer } from './App.module.css';
import { ToolBar } from './components/toolbar/ToolBar.jsx';
import { resizeCanvas } from './fabric/index.js';
import { useLayerClick, useResize } from './hooks/fabric.js';
import { useCanvasSave } from './hooks/useKeyborad.js';
import { initShotty } from './shotty/index.js';

function App() {
  const canvasRef = useRef(null);
  const [fabricCanvas, setFabricCanvas] = useState(null);

  useEffect(() => {
    const canvas = new Canvas(canvasRef.current);
    resizeCanvas(canvas);
    setFabricCanvas(canvas);
    initShotty(canvas);
    return () => {
      canvas.dispose();
    }
  }, []);
  useResize(fabricCanvas);
  useLayerClick(fabricCanvas);
  useCanvasSave(fabricCanvas);
  return (
    <div className={canvasContainer}>
      <canvas ref={canvasRef}></canvas>
      <div className={toolbarContainer}>
        {fabricCanvas && <ToolBar canvas={fabricCanvas} />}
      </div>
    </div>
  )
}

export default App
