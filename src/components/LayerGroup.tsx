import React, { useState, ReactNode } from 'react';
import './LayerGroup.css';

interface LayerGroupProps {
  title: string;
  children: ReactNode;
}

const LayerGroup: React.FC<LayerGroupProps> = ({ title, children }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="layer-group">
      <div className="layer-group-header" onClick={() => setIsExpanded(!isExpanded)}>
        <h4 className="layer-group-title">{title}</h4>
        <span className="layer-group-toggle">{isExpanded ? '−' : '+'}</span>
      </div>
      {isExpanded && <div className="layer-group-content">{children}</div>}
    </div>
  );
};

export default LayerGroup;
