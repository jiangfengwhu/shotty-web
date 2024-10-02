import { useEffect } from 'react';
import { resizeCanvas } from '../fabric/index.js';

/**
 * 
 * @param {fabric.Canvas} canvas 
 */
export function useResize(canvas) {
    useEffect(() => {
        const handleResize = () => {
            resizeCanvas(canvas);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [canvas]);
}

/**
 * 
 * @param {fabric.Canvas} canvas 
 */
export function useLayerClick(canvas) {
    useEffect(() => {
        if (!canvas) return;
        const handleLayerClick = (event) => {
            const { selected } = event
            for (const layer of selected) {
                canvas.bringObjectToFront(layer);
            }
        };
        canvas.on('selection:updated', handleLayerClick);
        canvas.on('selection:created', handleLayerClick);
        return () => {
            canvas.off('selection:updated', handleLayerClick);
            canvas.off('selection:created', handleLayerClick);
        };
    }, [canvas]);
}