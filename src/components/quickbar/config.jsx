import {
  DeleteOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons";
import { deleteObject, bringToFront, sendToBack, fillColor } from "@/fabric";
import { ColorPicker } from "@/components/colorPicker";
import { QuickButton } from "@/components/quickButton";
import { updateQuickBar, getQuickBar } from "@/store/index";

const commonQuickBarConfig = {
  delete: {
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
    renderCmp: QuickButton,
    props: {
      icon: <ArrowUpOutlined />,
      onClick: (canvas) => {
        bringToFront(canvas, canvas.getActiveObject());
      },
    },
  },
  sendToBack: {
    renderCmp: QuickButton,
    props: {
      icon: <ArrowDownOutlined />,
      onClick: (canvas) => {
        sendToBack(canvas, canvas.getActiveObject());
      },
    },
  },
  fillColor: {
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
