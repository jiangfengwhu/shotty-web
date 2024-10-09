import { useAtom } from "jotai";
import { quickBarAtom } from "@/store/index.js";
import { container } from "./QuickBar.module.css";
import { quickBarConfigMap, quickBarKeysMap } from "./config.jsx";
import { QuickButton } from "../quickButton";
import { Tooltip } from "antd";
export default function QuickBar({ canvas }) {
  const [quickBar, setQuickBar] = useAtom(quickBarAtom);
  const { left, top, visible, type } = quickBar;
  console.log("zxzx", quickBar);

  return visible ? (
    <div className={container} style={{ left, top }}>
      {(quickBarKeysMap[type] || quickBarKeysMap.default).map((key) => {
        const config = (quickBarConfigMap[type] || quickBarConfigMap.default)[
          key
        ];
        const RenderCmp = config.renderCmp || QuickButton;
        const props = config.props || {};
        return (
          <Tooltip key={key} title={config.tip}>
            <RenderCmp {...props} canvas={canvas} />
          </Tooltip>
        );
      })}
    </div>
  ) : null;
}
