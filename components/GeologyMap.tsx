'use client'
import { useState, useCallback } from 'react'
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api'

const geologicalSites = [
  {
    id: 1,
    title: 'جبل شمس',
    description: 'أعلى قمة جبلية في عُمان، يعرض تكوينات جيولوجية مذهلة.',
    position: { lat: 23.2367, lng: 57.2598 }
  },
  {
    id: 2,
    title: 'وادي شاب',
    description: 'وادي طبيعي يظهر التآكل المائي والتكوينات الصخرية.',
    position: { lat: 22.8368, lng: 59.2394 }
  },
  {
    id: 3,
    title: 'كهف الهوتة',
    description: 'نظام كهفي طبيعي يعرض التكوينات الكلسية.',
    position: { lat: 23.0833, lng: 57.3500 }
  },
  {
    id: 4,
    title: 'أفيوليت سمائل',
    description: 'أكبر كتلة أفيوليت مكشوفة في العالم.',
    position: { lat: 23.2000, lng: 57.5000 }
  },
  {
    id: 5,
    title: 'رمال الوهيبة',
    description: 'كثبان رملية تظهر العمليات الجيولوجية الريحية.',
    position: { lat: 21.9835, lng: 58.4217 }
  }
];

const mapCenter = {
  lat: 22.5,
  lng: 58.0
}

const mapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
  styles: [
    {
      featureType: "landscape",
      stylers: [{ saturation: -100 }, { lightness: 60 }]
    },
    {
      featureType: "road",
      stylers: [{ saturation: -100 }, { lightness: 40 }]
    },
    {
      featureType: "water",
      stylers: [{ saturation: -10 }, { lightness: 30 }]
    }
  ]
};

export default function GeologyMap() {
  const [selectedSite, setSelectedSite] = useState<typeof geologicalSites[0] | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyACt4jd9Zb4h1dVn1Y_HfCEpGm0bKbhsBM",
    id: 'google-map-script'
  });

  const onLoad = useCallback((map: google.maps.Map) => {
    const bounds = new google.maps.LatLngBounds();
    geologicalSites.forEach(({ position }) => bounds.extend(position));
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  if (loadError) {
    return (
      <div className="flex items-center justify-center h-[400px] bg-gray-100 rounded-lg">
        <p className="text-red-500">Error loading maps</p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-[400px] bg-gray-100 rounded-lg">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="relative">
      <GoogleMap
        mapContainerClassName="w-full h-[400px] rounded-lg"
        center={mapCenter}
        zoom={7}
        options={mapOptions}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {geologicalSites.map((site) => (
          <Marker
            key={site.id}
            position={site.position}
            onClick={() => setSelectedSite(site)}
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              scale: 8,
              fillColor: "#4A90E2",
              fillOpacity: 0.9,
              strokeWeight: 2,
              strokeColor: "#FFFFFF"
            }}
          />
        ))}

        {selectedSite && (
          <InfoWindow
            position={selectedSite.position}
            onCloseClick={() => setSelectedSite(null)}
          >
            <div className="p-2">
              <h3 className="font-bold text-lg mb-1">{selectedSite.title}</h3>
              <p className="text-gray-600">{selectedSite.description}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}
