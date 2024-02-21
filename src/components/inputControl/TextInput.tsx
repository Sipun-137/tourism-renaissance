import { FormControl, FormHelperText, Input, InputLabel } from "@mui/material";


export default function TextInput({
    label,
    placeholder,
    type,
    value,
    onChange,
    helper

  }: any) {
    return (
      <div className="relative ">
        <FormControl fullWidth>
          <InputLabel htmlFor="my-input">{label}</InputLabel>
          <Input
            id={label}
            type={type||'text'}
            aria-describedby={`my-helper-${label}`}
            onChange={onChange}
            value={value}
            fullWidth
          />
          <FormHelperText id={`my-helper-${label}`}>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            {helper}
          </FormHelperText>
        </FormControl>

      </div>
    );
  }
  