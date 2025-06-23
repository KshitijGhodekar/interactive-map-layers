import React, { useState } from 'react';
import { MapContainer, TileLayer, Rectangle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './GeoApp.css';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import LayerList from '../components/LayerList.tsx';

interface ProjectLayer {
  id: string;
  name: string;
  group: string;
  enabled: boolean;
  bounds: [[number, number], [number, number]];
  color: string;
}

const initialProjectLayers: ProjectLayer[] = [
  { id: 'rb_ecology', name: 'Raised Bog Ecology Map (based on NLCM)', group: 'Raised Bogs', enabled: true, bounds: [[53.3, -6.4], [53.35, -6.3]], color: '#E91E63' },
  { id: 'rb_slope_ipsm', name: 'Raised Bog Slope Map (based on IPSM)', group: 'Raised Bogs', enabled: true, bounds: [[53.31, -6.42], [53.36, -6.32]], color: '#9C27B0' },
  { id: 'rb_slope_nlcm', name: 'Raised Bog Slope Map (based on NLCM)', group: 'Raised Bogs', enabled: true, bounds: [[53.32, -6.43], [53.37, -6.33]], color: '#3F51B5' },
  { id: 'rb_soil_ipsm', name: 'Raised Bog Soil Type (based on IPSM)', group: 'Raised Bogs', enabled: true, bounds: [[53.33, -6.44], [53.38, -6.34]], color: '#2196F3' },
  { id: 'bb_morph_nlcm', name: 'Blanket Bog Morphology (based on NLCM)', group: 'Blanket Bogs', enabled: true, bounds: [[53.2, -6.2], [53.25, -6.1]], color: '#009688' },
  { id: 'bb_slope_nlcm', name: 'Blanket Bog Slope Map (based on NLCM)', group: 'Blanket Bogs', enabled: true, bounds: [[53.21, -6.22], [53.26, -6.12]], color: '#4CAF50' },
  { id: 'bb_lowland_morph_ipsm', name: 'Lowland Atlantic Blanket Bog Morphology (based on IPSM)', group: 'Blanket Bogs', enabled: true, bounds: [[53.22, -6.24], [53.27, -6.14]], color: '#8BC34A' },
  { id: 'bb_lowland_soil_ipsm', name: 'Lowland Atlantic Blanket Bog Soil Type (based on IPSM)', group: 'Blanket Bogs', enabled: true, bounds: [[53.23, -6.26], [53.28, -6.16]], color: '#CDDC39' },
  { id: 'bb_mountain_morph_ipsm', name: 'Mountain Blanket Bog Morphology (based on IPSM)', group: 'Blanket Bogs', enabled: true, bounds: [[53.24, -6.28], [53.29, -6.18]], color: '#FFC107' },
  { id: 'bb_mountain_soil_ipsm', name: 'Mountain Blanket Bog Soil Type (based on IPSM)', group: 'Blanket Bogs', enabled: true, bounds: [[53.25, -6.3], [53.3, -6.2]], color: '#FF9800' },
];

const GeoApp: React.FC = () => {
  const [projectLayers, setProjectLayers] = useState(initialProjectLayers);
  const [activeSliderId, setActiveSliderId] = useState<string | null>(null);
  const [layerOpacity, setLayerOpacity] = useState<{ [key: string]: number }>(
    Object.fromEntries(initialProjectLayers.map(l => [l.id, 0.5]))
  );

  const toggleLayer = (id: string) => {
    setProjectLayers(prev =>
      prev.map(layer =>
        layer.id === id ? { ...layer, enabled: !layer.enabled } : layer
      )
    );
    if (activeSliderId === id) setActiveSliderId(null);
  };

  const updateOpacity = (id: string, value: number) => {
    setLayerOpacity(prev => ({ ...prev, [id]: value }));
  };

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = projectLayers.findIndex(l => l.id === active.id);
      const newIndex = projectLayers.findIndex(l => l.id === over?.id);
      setProjectLayers(prev => arrayMove(prev, oldIndex, newIndex));
    }
  };

  return (
    <div className="geo-app">
      <MapContainer center={[53.3, -6.3]} zoom={10} className="map">
        {projectLayers.map(layer =>
          layer.enabled ? (
            <Rectangle
              key={layer.id}
              bounds={layer.bounds}
              pathOptions={{
                color: layer.color,
                weight: 2,
                fillOpacity: layerOpacity[layer.id] ?? 0.5,
              }}
            />
          ) : null
        )}
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </MapContainer>

      <div className="sidebar">
        <div className="base-layers">
          <div className="base-preview">Default</div>
          <div className="base-preview">Satellite</div>
        </div>

        <div className="tabs">
          <button className="tab active">Map Layers</button>
        </div>

        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={projectLayers.map(l => l.id)} strategy={verticalListSortingStrategy}>
            <div className="project-section">
              <LayerList
                layers={projectLayers.map(l => ({
                  ...l,
                  opacity: layerOpacity[l.id] ?? 0.5,
                }))}
                activeSliderId={activeSliderId}
                toggleLayer={toggleLayer}
                setActiveSliderId={setActiveSliderId}
                updateOpacity={updateOpacity}
              />
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};

export default GeoApp;