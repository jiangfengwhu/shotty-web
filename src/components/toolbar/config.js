import { startAddingRect, startAddingText, startSelecting, startFreeDrawing, deleteObject, clearCanvas } from "@/fabric/index.js";
import { FontSizeOutlined, BorderOutlined, EditOutlined, DragOutlined, DeleteOutlined, ClearOutlined } from '@ant-design/icons';
export const toolBarConfig = {
    select: {
        icon: DragOutlined,
        handler: startSelecting
    },
    text: {
        icon: FontSizeOutlined,
        handler: startAddingText
    },
    rect: {
        icon: BorderOutlined,
        handler: startAddingRect
    },
    freeDrawing: {
        icon: EditOutlined,
        handler: startFreeDrawing
    }
}

export const menuBarConfig = {
    
    clear: {
        icon: ClearOutlined,
        handler: clearCanvas
    }
}
export const toolBarKeys = Object.keys(toolBarConfig);
export const menuBarKeys = Object.keys(menuBarConfig);