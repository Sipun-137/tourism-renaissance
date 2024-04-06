import {
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

interface inputobjType {
  id: string;
  type: string;
  placeholder: string;
  label: string;
  componentType: string;
  helper: string;
  options: undefined;
  onChange: any;
}

interface selectObjectType {
  id: string;
  type: string;
  placeholder: string;
  label: string;
  componentType: string;
  helper: string;
  options: string[];
  onChange: any;
}

interface InputFormatType {
  obj: inputobjType | selectObjectType;
  onChange: any;
  value: string | number;
}
export default function FormInputControls({
  obj,
  onChange,
  value,
}: InputFormatType) {
  return (
    <>
      {obj.componentType === "input" ? (
        <FormControl fullWidth>
          <InputLabel htmlFor="my-input">{obj.label}</InputLabel>
          <Input
            id={obj.id}
            type={obj.type}
            aria-describedby={`my-helper-${obj.id}`}
            onChange={onChange}
            value={value}
            fullWidth
          />
          <FormHelperText id={`my-helper-${obj.id}`}>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            {obj.helper}
          </FormHelperText>
        </FormControl>
      ) : obj.componentType === "select" ? (
        <FormControl fullWidth >
          <InputLabel id={`my-helper-${obj.id}`}>{obj.label}</InputLabel>
          <Select
            labelId={`my-helper-${obj.id}`}
            id={`select-helper-${obj.id}`}
            label={obj.label}
            fullWidth
            value={value}
            onChange={onChange}
            className="text-black"
          >
            {obj.options?
              obj.options.map((item: any) => (
                <MenuItem key={item.id} value={item.value}>
                  {item.label}
                </MenuItem>
              )):''}
          </Select>
        </FormControl>
      ) : null}
    </>
  );
}
