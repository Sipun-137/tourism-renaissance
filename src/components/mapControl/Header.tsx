"use client";
import React, { FC, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
// import { Autocomplete } from '@react-google-maps/api';

interface HeaderProps {
  setCoordinates: (lat: number, lng: number) => void;
}

const Header = ({ setCoordinates }: any) => {
  const [autocomplete, setAutocomplete] = useState<any>(null);
  const onLoad = (autoC: any) => setAutocomplete(autoC);

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
          {/* <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Autocomplete> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
