import React, { useState, useEffect, createRef, RefObject, useContext } from "react";
import {
  CircularProgress,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Input,
  FormHelperText,
  Modal,
} from "@mui/material";
import Place from "./PlaceDetails";
import PlaceDetails from "./PlaceDetails";
import PlaceAutoComplete from "./PlaceAutoComplete";
import { GlobalContext } from "@/context";

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
export default function List({
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
            <FormControl className="mb-[30px] min-w-[120px] m-3">
              <InputLabel>Rating</InputLabel>
              <Select
                autoWidth
                size="small"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
              >
                <MenuItem value={0}>All</MenuItem>
                <MenuItem value={3}>above 3.0</MenuItem>
                <MenuItem value={4}>Above 4.0</MenuItem>
                <MenuItem value={4.5}>Above 4.5</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="mt-4 pt-4 p-1 rounded-sm bg-inherit">
            <Grid
              container
              spacing={3}
              style={{ height: "75vh", overflow: "scroll" }}
            >
              {places?.map((place, i) => (
                <Grid item key={i} xs={12}>
                  <PlaceDetails
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
