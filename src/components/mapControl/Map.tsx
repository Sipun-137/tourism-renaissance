
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
  const isDesktop = useMediaQuery("(min-width:600px)");

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
        onChildClick={(child: any) => setChildClicked(child)}
      >
        {places?.map((place, i) => (
          <div
          
          key={i}
          >
            {!isDesktop ? (
              <LocationOnOutlinedIcon color="primary" fontSize="large" />
            ) : (
              <Paper elevation={3} 
            //   className={classes.paper}
              >
                <Typography
                //   className={classes.typography}
                  variant="subtitle2"
                  gutterBottom
                >
                  {place.name}
                </Typography>
                 {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                //   className={classes.pointer}
                  src={
                    place.photo
                      ? place.photo.images.large.url
                      : "https://im.whatshot.in/img/2020/Apr/41215842-2062970037054645-8180165235601047552-o-baan-tao-cropped-1586780385.jpg"
                  }
                  alt={place.name}
                />
                <Rating size="small" value={Number(place.rating)} readOnly />
              </Paper>
            )}
          </div>
        ))}
      </GoogleMapReact>
    </div>
  );
}
export default Map;