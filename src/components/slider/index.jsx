import { Slider as AntdSlider, Button } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { Popover } from "antd";
export function Slider({ onChange, canvas, ...restProps }) {
  const value = canvas.getActiveObject()?.get("rx") || 0;
  return (
    <Popover
      content={
        <div style={{ width: 100 }}>
          <AntdSlider
            defaultValue={value}
            onChange={(value) => onChange(canvas, value)}
            {...restProps}
          />
        </div>
      }
      arrow={false}
    >
      <Button type="text" icon={<SettingOutlined />} />
    </Popover>
  );
}
