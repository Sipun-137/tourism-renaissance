"use client";
import React, { useRef, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Autocomplete, useLoadScript } from "@react-google-maps/api";
import { Search } from "@mui/icons-material";

interface HeaderProps {
  setCoordinates: (lat: number, lng: number) => void;
}

const Header = ({ setCoordinates }: any) => {
  const autocompleteRef = useRef();
  const [searchResult, setSearchResult] = useState('')
  const [autocomplete,setAutocomplete]=useState<any>(null)
  const onLoad = () => {
    setAutocomplete(autocompleteRef.current);
 }
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_API_KEY as string
  });

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();

    setCoordinates(lat, lng);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Hotel Service
          </Typography>
          <Typography variant="h6">Explore new places</Typography>
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <Search>
            <input
                type="text"
                placeholder="Search for Tide Information"
                style={{
                    boxSizing: `border-box`,
                    border: `1px solid transparent`,
                    width: `240px`,
                    height: `32px`,
                    padding: `0 12px`,
                    borderRadius: `3px`,
                    boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                    fontSize: `14px`,
                    outline: `none`,
                    textOverflow: `ellipses`,
                }}
                />
            </Search>
          </Autocomplete>
          
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
