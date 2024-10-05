import * as fabric from 'fabric';

function initFabric() {
    fabric.InteractiveFabricObject.ownDefaults = {
        ...fabric.InteractiveFabricObject.ownDefaults,
        cornerStyle: 'circle',
        cornerStrokeColor: 'blue',
        cornerColor: 'lightblue',
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
        const containerWidth = window.innerWidth;
        const containerHeight = window.innerHeight;
        canvas.setDimensions({ width: containerWidth, height: containerHeight });
    }
}

function offAllMouseHandler(canvas) {
    canvas.defaultCursor = 'default';
    canvas.isDrawingMode = false;
    canvas.off('mouse:down');
    canvas.off('mouse:move');
    canvas.off('mouse:up');
}

/**
 * @param {fabric.Canvas} canvas 
 */
function _handleMouseMoveOnAdding(canvas, e, object, startPoint) {
    const pointer = canvas.getViewportPoint(e);
    object.set({
        width: Math.abs(startPoint.x - pointer.x),
        height: Math.abs(startPoint.y - pointer.y),
        left: Math.min(startPoint.x, pointer.x),
        top: Math.min(startPoint.y, pointer.y)
    });
}

/**
 * @param {fabric.Point} pointer 
 */
function createRectAtPointer(pointer) {
    return new fabric.Rect({
        left: pointer.x,
        top: pointer.y,
        width: 0,
        height: 0,
        fill: 'rgba(255,0,0,0.5)'
    });
}

/**
 * @param {fabric.Point} pointer 
 */
function createTextAtPointer(pointer) {
    return new fabric.Textbox('', {
        left: pointer.x,
        top: pointer.y,
        fontSize: 20,
        fill: 'black',
        width: 0,
        splitByGrapheme: true,
    });
}

/**
 * @param {fabric.Canvas} canvas 
 */
function startAddingRect(canvas, afterAddCb) {
    startAdding(canvas, {
        creator: createRectAtPointer,
        cursor: 'crosshair',
        postCreator: afterAddCb
    })
}

/**
 * @param {fabric.Canvas} canvas 
 */
function startAddingText(canvas, afterAddCb) {
    startAdding(canvas, {
        creator: createTextAtPointer,
        postCreator: (text) => {
            text.enterEditing()
            afterAddCb();
        },
        cursor: 'text'
    })
}

/**
 * @param {fabric.Canvas} canvas 
 * @param {{ creator: (pointer: fabric.Point) => fabric.Object, postCreator?: (object: fabric.Object) => void, cursor?: string }} options 
 */
function startAdding(canvas, { creator, postCreator, cursor = "default" }) {
    offAllMouseHandler(canvas);
    canvas.forEachObject((obj) => {
        obj.selectable = false;
    });
    let isDown = false;
    canvas.discardActiveObject();
    canvas.defaultCursor = cursor;
    let object;
    let startPoint;
    canvas.once('mouse:down', (o) => {
        isDown = true;
        startPoint = canvas.getViewportPoint(o.e);
        object = creator(startPoint);
        canvas.add(object);
    });
    const onMove = (e) => {
        if (!isDown) return;
        _handleMouseMoveOnAdding(canvas, e, object, startPoint);
    };
    canvas.on('mouse:move', onMove);

    canvas.once('mouse:up', () => {
        isDown = false;
        canvas.setActiveObject(object);
        canvas.defaultCursor = 'default';
        canvas.off('mouse:move', onMove);
        canvas.forEachObject((obj) => {
            obj.selectable = true;
        });
        postCreator?.(object);
    });
}

function startSelecting(canvas) {
    offAllMouseHandler(canvas);
}

/**
 * @param {fabric.Canvas} canvas 
 */
function startFreeDrawing(canvas) {
    offAllMouseHandler(canvas);
    canvas.isDrawingMode = true;
    canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
    canvas.freeDrawingBrush.width = 5;
    canvas.freeDrawingBrush.color = '#000000';
}

export {
    initFabric,
    resizeCanvas,
    startAddingRect,
    startAddingText,
    startSelecting,
    startFreeDrawing
}