"use client";
import React, { useState, useEffect, useContext } from "react";
import { Grid } from "@mui/material";
import Map from "@/components/mapControl/Map";
import { getHotelData} from "@/services/Data/getPlaceData";
import { GlobalContext } from "@/context";
import Hlist from "@/components/mapControl/Hlist";
import { listdata } from "@/utils/data/data";
interface Coordinates {
  lat: number;
  lng: number;
}

interface Place {
  name: string;
  rating: number;
  num_reviews: number;
}

function App() {
  const { coordinates, setCoordinates } = useContext(GlobalContext);
  const [places, setPlaces] = useState<Place[]>([]);
  const [filteredPlaces, setFilteredPlaces] = useState<Place[]>([]);
  const [childClicked, setChildClicked] = useState<Place | null>(null);

  const [bounds, setBounds] = useState<any>({});

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [type, setType] = useState<string>("restaurants");
  const [rating, setRating] = useState<number>(0);
 
  useEffect(() => {
    const filteredPlaces = places.filter((place) => place.rating > rating);
    setFilteredPlaces(filteredPlaces);
  }, [places, rating]);
  console.log(coordinates);
  async function collect(type: string, bounds: any) {
    const data = await getHotelData({
      lat: coordinates.lat,
      lng: coordinates.lng,
      cindt: "2024-04-02",
      coutdt: "2024-04-02",
    });
    console.log("the fetched data is", data.data);
    const ndata:any=listdata.data;
    setPlaces(
      ndata.filter(
        (place: { title: any; bubbleRating: any }) =>
          place.title && place.bubbleRating.rating > 0
      )
    );
  }
  console.log(places)
  useEffect(() => {
    if (bounds.sw && bounds.ne) {
      setIsLoading(true);
      collect(type, bounds);
      setFilteredPlaces([]);
      setIsLoading(false);
    }
  }, [type, coordinates, bounds]);

  return (
    <section className="min-h-screen text-white">
      <>
        <div className="grid grid-cols-10 grid-rows-5 gap-4 relative">
          <div className="col-span-4 col-start-1">
            <Grid item xs={12} md={4}>
             {/* places={filteredPlaces.length ? filteredPlaces : places} */}
              <Hlist
                places={filteredPlaces.length ? filteredPlaces : places}
                childClicked={childClicked}
                isLoading={isLoading}
                type={type}
                setType={setType}
                rating={rating}
                setRating={setRating}
              />
            </Grid>
          </div>

          <div className="col-span-6 row-span-5 col-start-5 row-start-1">
            <Grid item xs={12} md={8}>
              <div className="rounded">
                <Map
                  setCoordinates={setCoordinates}
                  setBounds={setBounds}
                  coordinates={coordinates}
                  places={filteredPlaces.length ? filteredPlaces : places}
                  setChildClicked={setChildClicked}
                />
              </div>
            </Grid>
          </div>
        </div>
      </>
    </section>
  );
}

export default App;
