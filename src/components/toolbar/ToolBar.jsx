import { Button, Tooltip } from "antd";
import { container } from "./ToolBar.module.css";
import {
  toolBarConfig,
  toolBarKeys,
  menuBarConfig,
  menuBarKeys,
} from "./config.js";
import { useState } from "react";

/**
 * @param {fabric.Canvas} {canvas}
 */
export function ToolBar({ canvas }) {
  const [selectedTool, setSelectedTool] = useState("select");
  const handleClick = (key) => {
    setSelectedTool(key);
    toolBarConfig[key].handler(canvas, () => {
      setSelectedTool("select");
    });
  };

  const handleMenuClick = (key) => {
    menuBarConfig[key].handler(canvas, canvas.getActiveObject());
  };

  return (
    <div className={container}>
      {toolBarKeys.map((key) => {
        const Icon = toolBarConfig[key].icon;
        const isSelected = selectedTool === key;
        const tip = toolBarConfig[key].tip;
        return (
          <Tooltip key={key} title={tip}>
            <Button
              icon={<Icon />}
              type="text"
              onClick={() => handleClick(key)}
              style={
                isSelected ? { backgroundColor: "#007be5", color: "white" } : {}
              }
            />
          </Tooltip>
        );
      })}
      {menuBarKeys.map((key) => {
        const Icon = menuBarConfig[key].icon;
        const tip = menuBarConfig[key].tip;
        return (
          <Tooltip key={key} title={tip}>
            <Button
              icon={<Icon />}
              type="text"
              onClick={() => handleMenuClick(key)}
            />
          </Tooltip>
        );
      })}
    </div>
  );
}
