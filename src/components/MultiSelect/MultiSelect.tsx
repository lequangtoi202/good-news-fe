import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useState } from 'react';

interface MultiSelectProps {
  label: string;
  options: string[];
  text: string[];
  selectedValues: string[];
  onChange: (selected: string[]) => void;
}

function MultiSelect({ label, text, options, selectedValues, onChange }: MultiSelectProps) {
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
            {selected.map((value, index) => (
              <span key={value}>{text[index]}</span>
            ))}
          </div>
        )}
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={option}>
            {text[index]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default MultiSelect;
