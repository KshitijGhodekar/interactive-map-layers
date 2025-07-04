# Interactive Map Layers

A React + Leaflet based web application for interactive visualization, reordering, and control of geospatial data layers. This tool allows users to toggle layers, change their opacity, group them by category, and manage their display order on the map.

---

## Features and Engineering Breakdown

### 1. Map Integration (Leaflet)

- Uses `react-leaflet` to render maps using Leaflet.
- `TileLayer` renders the OpenStreetMap base.
- Custom geospatial data is visualized using `Rectangle` overlays.
- Each layer has dynamic fill opacity and color.

**Key Components:**
- `MapContainer`, `TileLayer`, `Rectangle`

---

### 2. Layer Toggling

- Toggle switches allow users to show/hide layers.
- State management is handled with `useState` to reflect visibility.
- Switch state updates map instantly.

---

### 3. Per-Layer Opacity Control

- Each enabled layer includes a range slider (0 to 1).
- Sliders are only visible when the layer is enabled.
- Opacity is stored in a dictionary using the layer `id`.

const [layerOpacity, setLayerOpacity] = useState<{ [key: string]: number }>(
  Object.fromEntries(initialProjectLayers.map(l => [l.id, 0.5]))
);

---

### 4. Drag-and-Drop Layer Reordering

- Layers can be rearranged via drag-and-drop.
- Ordering controls visual stacking on the map.
- Implemented using @dnd-kit/core and @dnd-kit/sortable.

Engineering:
- DndContext manages the drag environment.
- SortableContext and SortableItem handle list reordering.
- arrayMove() reorders the array in state.

---

### 5. Layer Grouping by Category

- Layers are categorized (e.g., Raised Bogs, Blanket Bogs).
- Each group is collapsible with a toggle (➕ / ➖).
- Improves UI clarity and navigability for large datasets.

Implementation Logic:
- Layers are filtered by their group value.
- Collapse state for each group is tracked in the LayerGroup component.
- Group toggle switches control visibility of grouped layer items.

---

### 6. UI & Styling
- Sidebar with scrollable vertical layout.
- Modern UI includes:
- Rounded corners
- Hover effects
- Smooth slider and toggle interactions
- Responsive for small and large viewports.

CSS Files:
- GeoApp.css – layout and base styling
- LayerItem.css – per-layer toggle, label, slider UI
- LayerGroup.css – group collapse styles

---

 ### NOTE: Persisting User Settings (To save User Specific)

The `layerOpacity` and `activeSliderId` states enable users to customize the visibility and appearance of map layers. To maintain a consistent user experience across sessions and devices, these settings can be stored in a backend database associated with the user's account.

### Suggested Implementation

- **Persist `layerOpacity`** as a key-value mapping (e.g., `{ layerId: opacity }`) in the user’s settings table.
- **Optionally store `activeSliderId`** to retain which slider is currently active.
- **Trigger an API call** to save settings whenever the user makes changes.
- **Retrieve and apply settings** when the user logs in or opens the map.
- **Alternatively**, for single-device persistence without login, use `localStorage`.

### Example (Pseudo-code)

```ts
// Save user settings
api.saveUserSettings(userId, {
  layerOpacity,
  activeSliderId,
});

// Load and apply settings
const settings = await api.loadUserSettings(userId);
setLayerOpacity(settings.layerOpacity);
setActiveSliderId(settings.activeSliderId);


