import { Dispatch, SetStateAction } from "react";
import { FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent } from "@mui/material"

interface Props {
    label: string;
    options: any[];
    value: any;
    setFilter: Dispatch<SetStateAction<number>>;
}

export const SelectFilter = ({ label, options, value, setFilter }: Props) => {
    const onChange = ({ target }: SelectChangeEvent<HTMLInputElement>) => setFilter(Number(target.value));

    return (
        <FormControl sx={{ width: { xs: "45%", md: "20%" }, m: '2%' }} >
            <InputLabel
                color="primary"
                id="demo-multiple-checkbox-label"
            >
                {label}
            </InputLabel>
            <Select
                value={value}
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                onChange={onChange}
                input={<OutlinedInput label={label} placeholder={label} />}
            >
                {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        <ListItemText primary={option.name} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>

    )
}
