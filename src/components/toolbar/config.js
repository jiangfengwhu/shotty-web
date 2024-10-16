import {
  clearCanvas,
  startAddingRect,
  startAddingText,
  startFreeDrawing,
  startSelecting,
} from "@/fabric/index.js";
import {
  BorderOutlined,
  ClearOutlined,
  DragOutlined,
  EditOutlined,
  FontSizeOutlined,
} from "@ant-design/icons";

export const toolBarConfig = {
  select: {
    icon: DragOutlined,
    handler: startSelecting,
    tip: "选择",
  },
  text: {
    icon: FontSizeOutlined,
    handler: startAddingText,
    tip: "文字",
  },
  rect: {
    icon: BorderOutlined,
    handler: startAddingRect,
    tip: "矩形",
  },
  freeDrawing: {
    icon: EditOutlined,
    handler: startFreeDrawing,
    tip: "画笔",
  },
};

export const menuBarConfig = {
  clear: {
    tip: "清空",
    icon: ClearOutlined,
    handler: clearCanvas,
  },
};
export const toolBarKeys = Object.keys(toolBarConfig);
export const menuBarKeys = Object.keys(menuBarConfig);
