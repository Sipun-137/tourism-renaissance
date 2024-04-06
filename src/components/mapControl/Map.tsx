
"use client"
import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import { Paper, Typography, useMediaQuery } from "@mui/material";

import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import Rating from "@mui/material/Rating";

interface MapProps {
  setCoordinates: (coordinates: { lat: number; lng: number }) => void;
  setBounds: (bounds: { ne: any; sw: any }) => void;
  coordinates: { lat: number; lng: number };
  places: any[];
  setChildClicked: (child: any) => void;
}

function Map({
  setCoordinates,
  setBounds,
  coordinates,
  places,
  setChildClicked,
}: MapProps) {
  // const isDesktop = useMediaQuery("(min-width:600px)");

  return (
    <div style={{ height: "90vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.GOOGLE_API_KEY as string }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        // options={""}
        onChange={(e) => {
          console.log(e);
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
      />
    </div>
  );
}
export default Map;