import { ColorPicker as AntdColorPicker } from "antd";
import { DEFAULT_COLOR } from "@/constants";
import { useState } from "react";

export function ColorPicker({ onChange, canvas, type = "fill", ...restProps }) {
  const value = canvas.getActiveObject()?.get(type) || DEFAULT_COLOR;
  const [color, setColor] = useState(value);

  return (
    <AntdColorPicker
      value={color}
      allowClear
      mode={["single", "gradient"]}
      onChangeComplete={(color) => {
        onChange(canvas, color);
        setColor(color);
      }}
      {...restProps}
    />
  );
}
