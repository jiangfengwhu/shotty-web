import { useState, useRef, useEffect } from 'react'
import './App.css'
import { Canvas, IText, Rect } from 'fabric';
import { resizeCanvas } from './fabric/index.js'
import { useResize, useLayerClick } from './hooks/fabric.js'

function App() {
  const canvasRef = useRef(null);
  const [fabricCanvas, setFabricCanvas] = useState(null);

  useEffect(() => {
    const canvas = new Canvas(canvasRef.current);
    resizeCanvas(canvas);
    const text = new IText('Fabric.JS', {
      editable: true,
    });
    const rect = new Rect({
      width: 60,
      height: 70,
      fill: 'red',
    });
    canvas.add(text);
    canvas.add(rect);
    canvas.centerObject(text);
    canvas.setActiveObject(text);
    setFabricCanvas(canvas);
    return () => {
      canvas.dispose();
    }
  }, []);
  useResize(fabricCanvas);
  useLayerClick(fabricCanvas);
  return (
    <canvas ref={canvasRef}></canvas>
  )
}

export default App
