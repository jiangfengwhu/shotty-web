import { Button } from 'antd';
import { container } from './ToolBar.module.css';
import { toolBarConfig, toolBarKeys } from './config.js';
import { useState } from 'react';

/**
 * @param {fabric.Canvas} {canvas} 
 */
export function ToolBar({ canvas }) {
    const [selectedTool, setSelectedTool] = useState('select');
    const handleClick = (key) => {
        setSelectedTool(key);
        toolBarConfig[key].handler(canvas, () => {
            setSelectedTool('select');
        });
    }

    return (
        <div className={container}>
            {toolBarKeys.map((key) => {
                const Icon = toolBarConfig[key].icon;
                const isSelected = selectedTool === key;
                return <Button icon={<Icon />} type='text' onClick={() => handleClick(key)} key={key} style={{ backgroundColor: isSelected ? '#007be5' : 'transparent', color: isSelected ? 'white' : 'black' }} />
            })}
        </div>
    );
} 