import React, { useEffect, useState } from 'react';
import { Card, Spin } from 'antd';
import { MapContainer, TileLayer, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import polyline from '@mapbox/polyline';

// Este es el componente que ajusta la vista del mapa automáticamente
const ChangeView = ({ bounds }) => {
  const map = useMap();
  useEffect(() => {
    if (bounds.length > 0) {
      map.fitBounds(bounds);
    }
  }, [bounds, map]);
  return null;
};

const StravaActivityMap = ({ summaryPolyline }) => {
  const [loading, setLoading] = useState(true);
  const [coordinates, setCoordinates] = useState([]);
  const [bounds, setBounds] = useState([]);

  useEffect(() => {
    if (summaryPolyline !== '') {
        console.log(summaryPolyline);
      try {
        // Decodificar la polyline de Strava
        const decodedCoordinates = polyline.decode(summaryPolyline);
        
        // La biblioteca devuelve [lat, lng], que es lo que necesita Leaflet
        setCoordinates(decodedCoordinates);
        
        // Crear los límites para centrar el mapa
        if (decodedCoordinates.length > 0) {
          // Encontrar los límites min/max para lat y lng
          const lats = decodedCoordinates.map(coord => coord[0]);
          const lngs = decodedCoordinates.map(coord => coord[1]);
          
          const minLat = Math.min(...lats);
          const maxLat = Math.max(...lats);
          const minLng = Math.min(...lngs);
          const maxLng = Math.max(...lngs);
          
          // Establecer los límites para el mapa
          setBounds([
            [minLat, minLng],
            [maxLat, maxLng]
          ]);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error al decodificar la polyline:', error);
        setLoading(false);
      }
    }
    else {
        setLoading(false);
    }
  }, [summaryPolyline]);

  if (loading) {
    return (
      <Card style={{ padding: '20px', height: '150px', width: '150px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Spin/>
      </Card>
    );
  }

  if (coordinates.length === 0) {
    return (
      <Card style={{ padding: '20px', height: '150px', width: '150px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        No se pudo cargar la ruta del mapa.
      </Card>
    );
  }

  return (
      <div style={{ height: '150px', width: '150px' }}>
        <MapContainer
          style={{ height: '100%', width: '100%' }}
          center={coordinates[0]}
          zoom={13}
          scrollWheelZoom={true}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Polyline
            positions={coordinates}
            color="rgb(252,63,0)"
            weight={3}
            opacity={1}
          />
          <ChangeView bounds={bounds} />
        </MapContainer>
      </div>
  );
};

export default StravaActivityMap;