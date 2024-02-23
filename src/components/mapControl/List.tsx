import React, { useState, useEffect, createRef, RefObject } from "react";
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
import PlaceDetails from "./PlaceDetails";

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

  useEffect(() => {
    const refs = Array(places?.length)
      .fill(null)
      .map((_, i) => elRefs[i] || createRef());
    setElRefs(refs);
  }, [places]);

  return (
    <div className="m-4 p-2 pt-0">
      <Typography
        variant="h6"
        className="font-serif text-center tracking-wider"
      >
        Restaurants, Hotels & attractions arround you
      </Typography>
      {isLoading ? (
        <div className="flex justify-center mt-8">
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
          <div className="m-3 p-2 shadow-xl bg-inherit rounded-lg ">
            <FormControl className="mb-6  m-5">
              <InputLabel>Type</InputLabel>
              <Select
                autoWidth
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <MenuItem value="restaurants">Restaurants</MenuItem>
                <MenuItem value="hotels">Hotels</MenuItem>
                <MenuItem value="attractions">Attractions</MenuItem>
              </Select>
            </FormControl>
            <FormControl
              className="mb-[30px] min-w-[120px] m-5"
              style={{ marginBottom: "30px", minWidth: 120, margin: "20px" }}
            >
              <InputLabel>Rating</InputLabel>
              <Select
                autoWidth
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
              style={{ height: "75vh", overflow: "auto" }}
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
