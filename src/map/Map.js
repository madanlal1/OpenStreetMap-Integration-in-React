import React, { useEffect, useState } from "react";
import { MapContainer, Popup, TileLayer, useMap } from "react-leaflet";
import CustomMarker from "./CustomMarker";

export default function Map() {
  const [userLocation, setUserLocation] = useState(null);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    // Get the user's current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);
        setMapReady(true); // Signal that map is ready to render
      },
      (error) => {
        console.error("Error getting user location:", error);
        setMapReady(true); // Signal that map is ready to render even if user location is not available
      }
    );
  }, []);

  const UserLocationButton = () => {
    const map = useMap();
    const handleGoToUserLocation = () => {
      if (userLocation) {
        map.flyTo(userLocation, 13); // Fly to the user's location with a zoom level of 13
      }
    };

    return (
      <button
        onClick={handleGoToUserLocation}
        style={{
          position: "absolute",
          top: "90px",
          left: "12px",
          zIndex: 1000,
          padding: "5px",
        }}
      >
        <img
          src="https://www.svgrepo.com/show/315096/current-location.svg"
          alt="logo"
          width="16px"
        />
      </button>
    );
  };

  return (
    <div>
      {mapReady && (
        <MapContainer
          center={userLocation || [51.505, -0.09]}
          zoom={userLocation ? 13 : 3} // Zoom out if user location is not available
          scrollWheelZoom={true} // Enable mouse scroll zoom
          style={{ height: "100vh", width: "100%" }} // Specify map container dimensions
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {userLocation && (
            <CustomMarker position={userLocation}>
              <Popup>This is a custom marker at your current location</Popup>
            </CustomMarker>
          )}
          <UserLocationButton />
        </MapContainer>
      )}
    </div>
  );
}
