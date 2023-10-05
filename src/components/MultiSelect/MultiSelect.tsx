import React, { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

interface MultiSelectProps {
  label: string;
  options: string[];
  selectedValues: string[];
  onChange: (selected: string[]) => void;
}

function MultiSelect({ label, options, selectedValues, onChange }: MultiSelectProps) {
  const [selected, setSelected] = useState<string[]>(selectedValues);

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const { value } = event.target as { value: string[] };
    setSelected(value);
    onChange(value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select
        multiple
        value={selected}
        onChange={handleChange}
        renderValue={(selected) => (
          <div>
            {selected.map((value) => (
              <span key={value}>{value}</span>
            ))}
          </div>
        )}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default MultiSelect;
