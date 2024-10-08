import { useAtom } from "jotai";
import { quickBarAtom } from "@/store/index.js";
import { container } from "./QuickBar.module.css";
import { quickBarConfigMap, quickBarKeysMap } from "./config.jsx";
import { QuickButton } from "../quickButton";

export default function QuickBar({ canvas }) {
  const [quickBar, setQuickBar] = useAtom(quickBarAtom);
  const { left, top, visible, type } = quickBar;
  console.log("zxzx", quickBar);

  return visible ? (
    <div className={container} style={{ left, top }}>
      {(quickBarKeysMap[type] || quickBarKeysMap.default).map((key) => {
        const RenderCmp =
          (quickBarConfigMap[type] || quickBarConfigMap.default)[key]
            .renderCmp || QuickButton;
        const props =
          (quickBarConfigMap[type] || quickBarConfigMap.default)[key].props ||
          {};
        return <RenderCmp key={key} {...props} canvas={canvas} />;
      })}
    </div>
  ) : null;
}
