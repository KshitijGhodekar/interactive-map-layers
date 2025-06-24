import './App.css';
import GeoApp from './geoApp/GeoApp.tsx';
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <div className="App">
      <GeoApp />
      <Analytics />
    </div>
  );
}

export default App;
