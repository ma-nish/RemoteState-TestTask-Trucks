import React, { createRef, useEffect } from "react";
import PropTypes from "prop-types";

const Map = ({ markers }) => {
  const googleMapRef = createRef();

  useEffect(() => {
    const googleScript = document.createElement("script");
    googleScript.src = `https://maps.googleapis.com/maps/api/js?libraries=places`;
    window.document.body.appendChild(googleScript);

    googleScript.addEventListener("load", () => {
      window.googleMap = createGoogleMap();
      window.marker = createMarker();
    });
  });

  const createGoogleMap = () =>
    new window.google.maps.Map(googleMapRef.current, {
      zoom: 10,
      center: {
        lat: markers[0].lastWaypoint.lat,
        lng: markers[0].lastWaypoint.lng,
      },
      disableDefaultUI: true,
    });

  const createMarker = () =>
    markers.map(
      (item) =>
        new window.google.maps.Marker({
          position: { lat: item.lastWaypoint.lat, lng: item.lastWaypoint.lng },
          map: window.googleMap,
          icon: item.icon,
        })
    );

  return (
    <div
      id="google-map"
      ref={googleMapRef}
      style={{ height: window.innerHeight, width: "100%" }}
    />
  );
};

Map.propTypes = {
  markers: PropTypes.array,
};

export default Map;
