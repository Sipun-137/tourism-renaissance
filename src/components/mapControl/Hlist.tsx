import React, { useState, useEffect, createRef, RefObject, useContext } from "react";
import {
  CircularProgress,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import Place from "./PlaceDetails";
import PlaceAutoComplete from "./PlaceAutoComplete";
import { GlobalContext } from "@/context";
import HotelDetails from "./HotelDetails";

interface Place {
  // Define the properties of a place object
  name: string;
  rating: number;
  num_reviews: number;
}

interface ListProps {
  places: Place[];
  childClicked: Place | null;
  isLoading: boolean;
  type: string;
  setType: (type: string) => void;
  rating: number;
  setRating: (rating: number) => void;
}
export default function Hlist({
  places,
  childClicked,
  isLoading,
  type,
  setType,
  rating,
  setRating,
}: ListProps) {
  const [elRefs, setElRefs] = useState<RefObject<any>[]>([]);
  const { coordinates, setCoordinates } = useContext(GlobalContext);
  useEffect(() => {
    const refs = Array(places?.length)
      .fill(null)
      .map((_, i) => elRefs[i] || createRef());
    setElRefs(refs);
  }, [places]);

  return (
    <div className="m-4 p-2 pt-0">
      {isLoading ? (
        <div className="flex justify-center mt-8">
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
          <div className="m-3  shadow-xl bg-inherit rounded-lg ">
            <PlaceAutoComplete setCoordinates={setCoordinates} />
          </div>
          <div>
            
          </div>
          <div className="mt-4 pt-4 p-1 rounded-sm bg-inherit">
            <Grid
              container
              spacing={3}
              style={{ height: "75vh", overflow: "auto" }}
            >
              {places?.map((place, i) => (
                <Grid item key={i} xs={12}>
                  <HotelDetails
                    place={place}
                    selected={Number(childClicked) === i}
                    refProp={elRefs[i]}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
        </>
      )}
    </div>
  );
}
