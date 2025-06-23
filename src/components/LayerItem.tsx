import React from 'react';
import './LayerItem.css';

interface Props {
  id: string;
  name: string;
  enabled: boolean;
  opacity: number;
  isActive: boolean;
  onToggle: () => void;
  onSliderToggle: () => void;
  onOpacityChange: (value: number) => void;
}

const LayerItem: React.FC<Props> = ({
  name, enabled, opacity, isActive, onToggle, onSliderToggle, onOpacityChange
}) => {
  return (
    <div className="layer-item">
      <div className="layer-toggle">
        <label className="switch">
          <input type="checkbox" checked={enabled} onChange={onToggle} />
          <span className="slider round"></span>
        </label>
        <span className="layer-label" onClick={onSliderToggle}>{name}</span>
      </div>

      {enabled && (
        <div className="slider-container">
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={opacity}
            onChange={e => onOpacityChange(parseFloat(e.target.value))}
            onPointerDown={e => e.stopPropagation()}
          />
          <div className="opacity-display">{Math.round(opacity * 100)}%</div>
        </div>
      )}
    </div>
  );
};

export default LayerItem;
