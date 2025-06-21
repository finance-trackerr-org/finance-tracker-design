import { IconButton, InputAdornment, OutlinedInput, TextField } from '@mui/material'
import SearchIcon from "@mui/icons-material/Search";
import React, { useState } from 'react'

interface searchBoxProps {
    value : string,
    onChange : (value : string) => void
}

function SearchBox({value, onChange} : searchBoxProps)  {
    const [inputValue, setInputValue] = useState('');

    const handleSearch = () => {
        onChange(inputValue.trim());
    };

    return (
        <OutlinedInput
            placeholder="Search..."
            value = {inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={event => {
                if (event.key == 'Enter'){
                    handleSearch();
                }
            }}
            sx={{ borderRadius:8, backgroundColor:'white' }}
            startAdornment={
                <InputAdornment position="start">
                    <IconButton onClick={handleSearch}>
                        <SearchIcon />
                    </IconButton>
                </InputAdornment>
            }
        />
    )
}

export default SearchBox
