import { useEffect } from 'react';
import { resizeCanvas } from '../fabric/index.js';
import { updateQuickBar } from '../store/index.js';
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

/**
 * 
 * @param {fabric.Canvas} canvas 
 */
export function useFabricMouse(canvas) {
    const isDown = useRef(false);
    const handler = { mouseDown: () => { }, mouseUp: () => { }, mouseMove: () => { } };
    const setHandler = (key, fn) => {
        handler[key] = fn;
    };
    useEffect(() => {
        if (!canvas) return;
        const handleMouseDown = (event) => {
            handler.mouseDown(event);
            isDown.current = true;
        };
        const handleMouseUp = (event) => {
            handler.mouseUp(event);
            isDown.current = false;
        };
        const handleMouseMove = (event) => {
            if (!isDown.current) return;
            handler.mouseMove(event);
        };
        canvas.on('mouse:down', handleMouseDown);
        canvas.on('mouse:up', handleMouseUp);
        canvas.on('mouse:move', handleMouseMove);
        return () => {
            canvas.off('mouse:down', handleMouseDown);
            canvas.off('mouse:up', handleMouseUp);
            canvas.off('mouse:move', handleMouseMove);
        };
    }, [canvas]);
    return setHandler;
}


/**
 * @param {fabric.Canvas} canvas 
 */
export function useQuickBar(canvas) {
    useEffect(() => {
        if (!canvas) return;
        const updater = (e) => {
            const activeObject = canvas.getActiveObject();
            console.log('zxzx activeObject', activeObject)
            if (!activeObject) return;
            const { left, top, height , scaleY} = activeObject;
            const quickBar = {
                left,
                top: top + height *scaleY,
                visible: true,
                type: activeObject.get('type')
            }
            updateQuickBar(quickBar)
        }
        const dismiss = () => {
            updateQuickBar({
                visible: false
            })
        }
        canvas.on('mouse:down', dismiss)
        canvas.on('mouse:up', updater)

        return () => {
            canvas.off('mouse:down', dismiss)
            canvas.off('mouse:up', updater)
        }
    }, [canvas])
}