import { Button } from "antd";

export function QuickButton(props) {
  const { canvas, onClick, ...restProps } = props;
  const handleClick = () => {
    onClick(canvas);
  };
  return <Button type="text" onClick={handleClick} {...restProps} />;
}
