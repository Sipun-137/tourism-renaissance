"use client";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { getCoordinate, getSuggestion } from "@/services/Data/getPlaceData";

interface MainTextMatchedSubstrings {
  offset: number;
  length: number;
}
interface StructuredFormatting {
  main_text: string;
  secondary_text: string;
  main_text_matched_substrings?: readonly MainTextMatchedSubstrings[];
}
interface PlaceType {
  description: string;
  structured_formatting: StructuredFormatting;
}

export default function PlaceAutoComplete({setCoordinates}:any) {
  const [name, setName] = useState("india");
  const [suggestion, setSuggestion] = useState<any>([]);
  const [value, setValue] = useState<any>(null);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<readonly any[]>([]);

  const [ccoor, setCcoor] = useState<any>(null);
  useEffect(() => {
    async function getcoord1() {
      const val = await getCoordinate(value?value.description:"");
      setCcoor(val);
    }
    getcoord1()
    setCoordinates(ccoor)
  },[value]);

  async function getdata() {
    const res = await getSuggestion(inputValue);
    console.log(res.data);
    console.log(inputValue);
    setSuggestion(res.data);
  }
  useEffect(() => {
    getdata();
  }, [name]);

  console.log(value);
  console.log(ccoor);
  return (
    <>
      <div className="flex justify-center m-5">
        <Autocomplete
          fullWidth
          options={suggestion}
          getOptionLabel={(option: any) => `${option.description} `}
          id="place-customized-option-demo"
          disableCloseOnSelect
          renderInput={(params) => (
            <TextField {...params} label="Choose a  place" variant="standard" />
          )}
          noOptionsText="No locations"
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
            getdata();
          }}
          onChange={(event: any, newValue: any) => {
            setOptions(newValue ? [newValue, ...options] : options);
            setValue(newValue);

          }}
        />
        <br />
        <hr />
      </div>
    </>
  );
}
