import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React from 'react';

interface CustomSelectProps {
  label: string;
  text: string[];
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ label, text, options, value, onChange }) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    onChange(event.target.value as string);
  };
  return (
    <FormControl
      sx={{
        mr: 2,
      }}
    >
      <InputLabel>{label}</InputLabel>
      <Select label={label} value={value} style={{ width: '140px' }} onChange={handleChange}>
        {options.map((option, index) => (
          <MenuItem key={index} value={option}>
            {text[index]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomSelect;
