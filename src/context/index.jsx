"use client";
import Cookies from "js-cookie";
import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext();


export default function GlobalState({ children }) {
  const [showNavModal, setShowNavModal] = useState(false);
  const [pageLevelLoader, setPageLevelLoader] = useState(false);
  const [componentLevelLoader, setComponentLevelLoader] = useState({
    loading: false,
    id: "",
  });
  const [isAuthUser, setAuthUser] = useState(null);
  const [user, setUser] = useState(null);
  const [coordinates, setCoordinates] = useState({
    lat: 0,
    lng: 0,
  });
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
     ({ coords: { latitude, longitude } }) => {
       setCoordinates({ lat: latitude, lng: longitude });
     }
   );
 }, []);

  useEffect(() => {
    if (Cookies.get("token") !== undefined) {
      setAuthUser(true);
      const userData = JSON.parse(localStorage.getItem("user"));
      setUser(userData);
    } else {
      setAuthUser(false);
    }
  }, [Cookies]);
  return (
    <GlobalContext.Provider
      value={{
        showNavModal,
        setShowNavModal,
        isAuthUser,
        setAuthUser,
        user,
        setUser,
        coordinates, setCoordinates
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
