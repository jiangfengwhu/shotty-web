import { startAddingRect, startAddingText, startSelecting, startFreeDrawing } from "@/fabric/index.js";
import { FontSizeOutlined, BorderOutlined, EditOutlined, DragOutlined } from '@ant-design/icons';
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

export const toolBarKeys = Object.keys(toolBarConfig);