import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@mui/material";

export default function SelectInput({
  label,
  value,
  onChange,
  helper,
  options = [],
}: any) {
  return (
    <>
      <FormControl fullWidth>
        <InputLabel id={`my-helper-${label}`}>{label}</InputLabel>
        <Select
          labelId={`my-helper-${label}`}
          id={`select-helper-${label}`}
          label={label}
          fullWidth
          value={value}
          defaultValue={options[0].value || ""}
          onChange={onChange}
          className="text-black"
        >
          {options && options.length
            ? options.map((item:any ) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.label}
                </MenuItem>
              ))
            : <MenuItem value={""}>
            {""}
          </MenuItem>}
        </Select>
        <FormHelperText id={`my-helper-${label}`}>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            {helper}
          </FormHelperText>
      </FormControl>
    </>
  );
}
