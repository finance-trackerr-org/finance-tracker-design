"use client"

import React, { useState } from 'react'
import SearchBox from '@/app/components/SearchBox';
import Calendar from '@/app/components/Calendar';
import CustomSelectDropdown from '@/app/components/CustomeSelectDropdown';
import dayjs, { Dayjs } from 'dayjs';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Divider, Typography } from '@mui/material';

function History() {
    const [selectedCategory, setSelectedCategory] = useState('');
    const options = ['Food', 'Travel', 'Health', 'Entertainment'];

    const [searchText, setSearchText] = useState('');

    const [startDate, setStartDate] = React.useState<Dayjs | null>(null);
    const [endDate, setEndDate] = React.useState<Dayjs | null>(null);
    const formattedStartDate = startDate?.format("YYYY-MM-DD");
    const formattedEndDate = endDate?.format("YYYY-MM-DD");

    console.log("hiii===",selectedCategory,searchText,formattedStartDate,formattedEndDate)
    
    return (
        <div className='flex flex-col bg-white rounded-md p-2'>
            <Typography variant='h4' sx={{ padding : '1rem' }}>Transaction History</Typography>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ArrowDropDownIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                ><Typography variant='subtitle1' component="span">Filters</Typography>
                </AccordionSummary>
                <Divider sx={{ my: 2, borderColor: 'grey.300', margin:'0' }} variant='middle' />
                <AccordionDetails sx={{ backgroundColor:'#e0f2fe',  display:"flex", justifyContent:'space-between', alignItems:'center', padding:'2rem' }}>
                    <SearchBox
                        value = {searchText}
                        onChange = {setSearchText}
                    />
                    <Calendar
                        startDate = {startDate}
                        endDate = {endDate}
                        setStartDate = {setStartDate}
                        setEndDate = {setEndDate}
                    />
                    <CustomSelectDropdown
                        label='Choose category'
                        value={selectedCategory}
                        options={options}
                        onChange={setSelectedCategory}
                    />
                </AccordionDetails>
            </Accordion>
            <div>
                <Typography variant='h5' sx={{ paddingTop : '2rem' }}>Recent Transactions</Typography>
            </div>
        </ div>
    )
}

export default History
