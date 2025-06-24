import React from 'react';
import { SortableItem } from './SortableItem.tsx';
import LayerItem from './LayerItem.tsx';
import LayerGroup from './LayerGroup.tsx';

interface Layer {
  id: string;
  name: string;
  group: string;
  enabled: boolean;
  opacity: number;
}

interface Props {
  layers: Layer[];
  activeSliderId: string | null;
  toggleLayer: (id: string) => void;
  setActiveSliderId: React.Dispatch<React.SetStateAction<string | null>>;
    updateOpacity: (id: string, value: number) => void;
}

const LayerList: React.FC<Props> = ({
  layers,
  activeSliderId,
  toggleLayer,
  setActiveSliderId,
  updateOpacity,
}) => {
  const renderLayerGroup = (groupName: string) => (
    <LayerGroup title={groupName} key={groupName}>
      {layers
  .filter(layer => layer.group === groupName)
  .map((layer, index, arr) => {
    const position = arr.length - index;
    return (
      <SortableItem key={layer.id} id={layer.id}>
        <LayerItem
          id={layer.id}
          name={layer.name}
          enabled={layer.enabled}
          opacity={layer.opacity}
          isActive={activeSliderId === layer.id}
          onToggle={() => toggleLayer(layer.id)}
          onSliderToggle={() =>
            setActiveSliderId(prev => (prev === layer.id ? null : layer.id))
          }
          onOpacityChange={(val) => updateOpacity(layer.id, val)}
          index={position}
        />
      </SortableItem>
    );
  })}

    </LayerGroup>
  );

  const groups = [...new Set(layers.map(layer => layer.group))];

  return (
    <>
      {groups.map(group => renderLayerGroup(group))}
    </>
  );
};

export default LayerList;
