import * as fabric from 'fabric';

function initFabric() {
    fabric.InteractiveFabricObject.ownDefaults = {
        ...fabric.InteractiveFabricObject.ownDefaults,
        cornerStyle: 'round',
        cornerStrokeColor: 'blue',
        cornerColor: 'lightblue',
        cornerStyle: 'circle',
        padding: 10,
        cornerSize: 8,
        transparentCorners: false,
        borderColor: 'orange',
        borderScaleFactor: 2,
    }
}

/**
 * @param {fabric.Canvas} canvas 
 */
function resizeCanvas(canvas) {
    if (canvas) {
        const containerWidth = window.innerWidth - 20;
        const containerHeight = window.innerHeight - 20;
        canvas.setDimensions({ width: containerWidth, height: containerHeight });
    }
}

export {
    initFabric,
    resizeCanvas,
}