import {
  DeleteOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons";
import {
  deleteObject,
  bringToFront,
  sendToBack,
  fillColor,
  setBorderRadius,
} from "@/fabric";
import { ColorPicker } from "@/components/colorPicker";
import { QuickButton } from "@/components/quickButton";
import { updateQuickBar, getQuickBar } from "@/store/index";
import { Slider } from "../slider";

const commonQuickBarConfig = {
  delete: {
    tip: "删除",
    renderCmp: QuickButton,
    props: {
      icon: <DeleteOutlined />,
      onClick: (canvas) => {
        deleteObject(canvas, canvas.getActiveObject());
        updateQuickBar({
          ...getQuickBar(),
          visible: false,
        });
      },
    },
  },
  bringToFront: {
    tip: "上移一层",
    renderCmp: QuickButton,
    props: {
      icon: <ArrowUpOutlined />,
      onClick: (canvas) => {
        bringToFront(canvas, canvas.getActiveObject());
      },
    },
  },
  sendToBack: {
    tip: "下移一层",
    renderCmp: QuickButton,
    props: {
      icon: <ArrowDownOutlined />,
      onClick: (canvas) => {
        sendToBack(canvas, canvas.getActiveObject());
      },
    },
  },
  fillColor: {
    tip: "填充颜色",
    renderCmp: ColorPicker,
    props: {
      onChange: (canvas, color) => {
        fillColor(
          canvas,
          canvas.getActiveObject(),
          color.toHexString(),
          "fill"
        );
      },
      type: "fill",
    },
  },
  strokeColor: {
    tip: "描边颜色",
    renderCmp: ColorPicker,
    props: {
      onChange: (canvas, color) => {
        fillColor(
          canvas,
          canvas.getActiveObject(),
          color.toHexString(),
          "stroke"
        );
      },
      type: "stroke",
    },
  },
  borderRadius: {
    tip: "圆角",
    renderCmp: Slider,
    props: {
      onChange: (canvas, value) => {
        setBorderRadius(canvas, canvas.getActiveObject(), value);
      },
    },
  },
};

export const quickBarConfigMap = {
  textbox: {
    ...commonQuickBarConfig,
  },
  rect: {
    ...commonQuickBarConfig,
  },
  path: {
    ...commonQuickBarConfig,
  },
  default: commonQuickBarConfig,
};

export const quickBarKeysMap = Object.keys(quickBarConfigMap).reduce(
  (acc, key) => {
    acc[key] = Object.keys(quickBarConfigMap[key]);
    return acc;
  },
  { default: Object.keys(commonQuickBarConfig) }
);
