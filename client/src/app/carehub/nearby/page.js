"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import map components with no SSR
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

// Create RecenterMap as a separate component that will be dynamically imported
function RecenterMapComponent({ coords }) {
  const { useMap } = require("react-leaflet");
  const map = useMap();
  
  useEffect(() => {
    if (coords && map) {
      map.setView(coords, 13);
    }
  }, [coords, map]);
  
  return null;
}

// Dynamically import RecenterMap
const RecenterMap = dynamic(() => Promise.resolve(RecenterMapComponent), {
  ssr: false,
});

// Map component that will only render on client
function MapView({ coords, places, selectedPlace, setSelectedPlace, filterCategory }) {
  const [L, setL] = useState(null);
  const [icons, setIcons] = useState(null);

  useEffect(() => {
    // Import Leaflet only on client side
    import("leaflet").then((leaflet) => {
      setL(leaflet.default);
      
      // Create icons
      const userMarkerIcon = new leaflet.default.Icon({
        iconUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='25' height='41' viewBox='0 0 25 41'%3E%3Cpath fill='%23EF4444' d='M12.5 0C5.6 0 0 5.6 0 12.5c0 9.4 12.5 28.5 12.5 28.5S25 21.9 25 12.5C25 5.6 19.4 0 12.5 0z'/%3E%3Ccircle fill='white' cx='12.5' cy='12.5' r='5'/%3E%3C/svg%3E",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
      });

      const hospitalIcon = new leaflet.default.Icon({
        iconUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='25' height='41' viewBox='0 0 25 41'%3E%3Cpath fill='%23DC2626' d='M12.5 0C5.6 0 0 5.6 0 12.5c0 9.4 12.5 28.5 12.5 28.5S25 21.9 25 12.5C25 5.6 19.4 0 12.5 0z'/%3E%3Ctext x='12.5' y='17' font-size='16' text-anchor='middle' fill='white' font-weight='bold'%3E+%3C/text%3E%3C/svg%3E",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
      });

      const clinicIcon = new leaflet.default.Icon({
        iconUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='25' height='41' viewBox='0 0 25 41'%3E%3Cpath fill='%23EC4899' d='M12.5 0C5.6 0 0 5.6 0 12.5c0 9.4 12.5 28.5 12.5 28.5S25 21.9 25 12.5C25 5.6 19.4 0 12.5 0z'/%3E%3Ccircle fill='white' cx='12.5' cy='12.5' r='4'/%3E%3C/svg%3E",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
      });

      const pharmacyIcon = new leaflet.default.Icon({
        iconUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='25' height='41' viewBox='0 0 25 41'%3E%3Cpath fill='%2314B8A6' d='M12.5 0C5.6 0 0 5.6 0 12.5c0 9.4 12.5 28.5 12.5 28.5S25 21.9 25 12.5C25 5.6 19.4 0 12.5 0z'/%3E%3Ctext x='12.5' y='17' font-size='14' text-anchor='middle' fill='white' font-weight='bold'%3ERx%3C/text%3E%3C/svg%3E",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
      });

      setIcons({ userMarkerIcon, hospitalIcon, clinicIcon, pharmacyIcon });
    });

    // Import Leaflet CSS
    import("leaflet/dist/leaflet.css");
  }, []);

  const getMarkerIcon = (category) => {
    if (!icons) return null;
    switch (category) {
      case "hospital":
        return icons.hospitalIcon;
      case "clinic":
      case "doctor":
        return icons.clinicIcon;
      case "pharmacy":
        return icons.pharmacyIcon;
      default:
        return icons.clinicIcon;
    }
  };

  const filteredPlaces = filterCategory === "all" 
    ? places 
    : places.filter(p => p.category === filterCategory);

  if (!L || !icons || !coords) {
    return (
      <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-gray-400" style={{ fontFamily: 'Inter, sans-serif' }}>Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <MapContainer 
      center={coords} 
      zoom={13} 
      style={{ height: "100%", width: "100%" }}
      className="z-0"
    >
      <TileLayer 
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      <RecenterMap coords={coords} />
      
      {/* User Location Marker */}
      <Marker position={coords} icon={icons.userMarkerIcon}>
        <Popup>
          <div className="font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>
            📍 You are here
          </div>
        </Popup>
      </Marker>

      {/* Place Markers */}
      {filteredPlaces.map((place) => (
        <Marker 
          key={place.id} 
          position={[place.lat, place.lon]} 
          icon={getMarkerIcon(place.category)}
          eventHandlers={{
            click: () => setSelectedPlace(place)
          }}
        >
          <Popup>
            <div style={{ fontFamily: 'Inter, sans-serif' }}>
              <strong className="text-base" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {place.name}
              </strong>
              <div className="text-sm text-gray-600 mt-1">
                <div>📍 {place.type}</div>
                <div>📏 {place.distance} km away</div>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default function NearbyCenters() {
  const [coords, setCoords] = useState(null);
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [filterCategory, setFilterCategory] = useState("all");
  const [locationPermission, setLocationPermission] = useState("prompt");

  useEffect(() => {
    // Check if geolocation is supported
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
      return;
    }

    // Request location with better error handling
    const timeoutId = setTimeout(() => {
      setError("Location request timed out. Please check your browser settings.");
      setLoading(false);
    }, 15000);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        clearTimeout(timeoutId);
        const { latitude, longitude } = pos.coords;
        setCoords([latitude, longitude]);
        setLocationPermission("granted");

        try {
          const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
          const res = await fetch(
            `${backendUrl}/api/location/nearby?lat=${latitude}&lon=${longitude}`
          );
          
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          
          const data = await res.json();
          
          if (data.success) {
            setPlaces(data.places || []);
          } else {
            setError(data.message || "Failed to fetch nearby places");
          }
        } catch (err) {
          setError("Unable to connect to server. Please try again later.");
          console.error("Fetch error:", err);
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        clearTimeout(timeoutId);
        setLocationPermission("denied");
        
        switch(err.code) {
          case err.PERMISSION_DENIED:
            setError("Location access was denied. Please enable location permissions in your browser settings.");
            break;
          case err.POSITION_UNAVAILABLE:
            setError("Location information is unavailable. Please try again.");
            break;
          case err.TIMEOUT:
            setError("Location request timed out. Please try again.");
            break;
          default:
            setError("An unknown error occurred while getting your location.");
        }
        setLoading(false);
        console.error("Location error:", err);
      },
      { 
        enableHighAccuracy: true, 
        timeout: 10000,
        maximumAge: 0 
      }
    );
  }, []);

  const filteredPlaces = filterCategory === "all" 
    ? places 
    : places.filter(p => p.category === filterCategory);

  const categoryStats = {
    all: places.length,
    hospital: places.filter(p => p.category === "hospital").length,
    clinic: places.filter(p => p.category === "clinic" || p.category === "doctor").length,
    pharmacy: places.filter(p => p.category === "pharmacy").length,
  };

  if (loading) {
    return (
      <div className="h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-xl font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Detecting your location...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen bg-black flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <div className="w-20 h-20 bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Location Access Required
          </h2>
          <p className="text-gray-300 mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
            {error}
          </p>
          
          {locationPermission === "denied" && (
            <div className="bg-zinc-900 border border-red-900/30 rounded-xl p-4 mb-6 text-left">
              <p className="text-sm text-gray-300 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                <strong className="text-red-400">To enable location:</strong>
              </p>
              <ol className="text-sm text-gray-400 space-y-1 list-decimal list-inside" style={{ fontFamily: 'Inter, sans-serif' }}>
                <li>Click the lock icon in your browser's address bar</li>
                <li>Find "Location" permissions</li>
                <li>Set it to "Allow"</li>
                <li>Refresh this page</li>
              </ol>
            </div>
          )}
          
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-300"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-black">
      {/* Map Section - Takes majority of screen */}
      <div className="flex-1 relative">
        {/* Floating Filter Buttons on Map */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-[1000] bg-black/80 backdrop-blur-md rounded-full p-2 shadow-2xl border border-red-900/30">
          <div className="flex gap-2">
            {[
              { key: "all", label: "All", icon: "🏥", count: categoryStats.all },
              { key: "hospital", label: "Hospitals", icon: "🏥", count: categoryStats.hospital },
              { key: "clinic", label: "Clinics", icon: "⚕️", count: categoryStats.clinic },
              { key: "pharmacy", label: "Pharmacy", icon: "💊", count: categoryStats.pharmacy },
            ].map((filter) => (
              <button
                key={filter.key}
                onClick={() => setFilterCategory(filter.key)}
                className={`px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 flex items-center gap-2 ${
                  filterCategory === filter.key
                    ? "bg-red-600 text-white shadow-lg"
                    : "bg-zinc-800/50 text-gray-300 hover:bg-zinc-700/50"
                }`}
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                <span>{filter.icon}</span>
                <span className="hidden sm:inline">{filter.label}</span>
                <span className="bg-black/30 px-2 py-0.5 rounded-full text-xs">{filter.count}</span>
              </button>
            ))}
          </div>
        </div>

        <MapView 
          coords={coords}
          places={places}
          selectedPlace={selectedPlace}
          setSelectedPlace={setSelectedPlace}
          filterCategory={filterCategory}
        />
      </div>

      {/* Sidebar - Details Section */}
      <div className="w-[400px] bg-zinc-950 border-l border-red-900/20 overflow-y-auto">
        <div className="p-5">
          {/* Results Count */}
          <div className="mb-5 pb-4 border-b border-red-900/20">
            <div className="text-2xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {filteredPlaces.length} Results
            </div>
            <div className="text-sm text-gray-400 mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>
              Health centers near you
            </div>
          </div>

          {/* Places List */}
          {filteredPlaces.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <p className="text-gray-400" style={{ fontFamily: 'Inter, sans-serif' }}>
                No centers found
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredPlaces.map((place) => (
                <div
                  key={place.id}
                  onClick={() => setSelectedPlace(place)}
                  className={`bg-zinc-900 rounded-xl p-4 cursor-pointer transition-all duration-200 border-2 ${
                    selectedPlace?.id === place.id
                      ? "border-red-500 shadow-lg shadow-red-900/20"
                      : "border-transparent hover:border-red-900/30"
                  }`}
                >
                  {/* Name and Distance */}
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-white flex-1 pr-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {place.name}
                    </h3>
                    <div className="text-right flex-shrink-0">
                      <div className="text-red-400 font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {place.distance} km
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span className={`px-2 py-1 rounded-md text-xs font-semibold ${
                      place.category === "hospital" ? "bg-red-900/30 text-red-400" :
                      place.category === "pharmacy" ? "bg-teal-900/30 text-teal-400" :
                      "bg-pink-900/30 text-pink-400"
                    }`} style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {place.type}
                    </span>
                    {place.emergency && (
                      <span className="px-2 py-1 rounded-md text-xs font-semibold bg-orange-900/30 text-orange-400" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        24/7
                      </span>
                    )}
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-2 text-gray-400 text-sm mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
                    <svg className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="flex-1 text-xs leading-relaxed">{place.address}</span>
                  </div>

                  {/* Phone */}
                  {place.phone && (
                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
                      <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <a href={`tel:${place.phone}`} className="hover:text-red-400 transition-colors text-xs">
                        {place.phone}
                      </a>
                    </div>
                  )}

                  {/* Opening Hours */}
                  {place.openingHours && (
                    <div className="flex items-start gap-2 text-gray-400 text-xs mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
                      <svg className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{place.openingHours}</span>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-3">
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lon}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 px-3 bg-red-600 hover:bg-red-700 text-white text-center text-sm font-semibold rounded-lg transition-all duration-300"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      Directions
                    </a>
                    {place.phone && (
                      <a
                        href={`tel:${place.phone}`}
                        className="py-2 px-3 bg-zinc-800 hover:bg-zinc-700 text-white text-center text-sm font-semibold rounded-lg transition-all duration-300"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        Call
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}