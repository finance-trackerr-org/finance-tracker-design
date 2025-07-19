"use client"

import React, { useEffect, useState } from 'react'
import SearchBox from '@/app/components/ui/SearchBox';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CustomSelectDropdown from '@/app/components/ui/CustomeSelectDropdown';
import dayjs, { Dayjs } from 'dayjs';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Box, Button, Divider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import { downloadTransactionAttachment, fetchCategories, fetchTransactions } from '@/lib/api/transaction';

import CustomDatePicker from '@/app/components/ui/Calendar';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useSnackbarQueue } from '@/app/hooks/useSnackbarQueue';

interface TransactionData {
    id : number,
    category : string,
    type : string,
    date : string,
    amount : number,
    description : string | '',
    attachment : string | ''
}

type PaginatedResult<TransactionData> = {
    content: TransactionData[];
    totalPages: number;
    totalElements: number;
    size: number;
    number : number;
};

interface DateProps {
    dates? : {fromDate : string, toDate : string}
}

function History({dates} : DateProps) {
    const tableRow = ['Category', 'Type', 'Date', 'Amount', 'Description', 'Attachment']
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categoryOptions, selectCategoryOptions] = useState([])

    const [searchText, setSearchText] = useState('');

    const [startDate, setStartDate] = useState<Dayjs | null>(dayjs().subtract(3, 'month'));
    const [endDate, setEndDate] = useState<Dayjs | null>(dayjs());
    const formattedStartDate = dates?.fromDate ? dates.fromDate : startDate?.format("YYYY-MM-DD");
    const formattedEndDate = dates?.toDate ? dates.toDate : endDate?.format("YYYY-MM-DD");

    const { enqueueSnackbar, SnackbarRenderer } = useSnackbarQueue();

    const [paginationResult, setPaginationResult] = useState<PaginatedResult<TransactionData>>();

    const isDashboardPath = usePathname() == '/dashboard';

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const today = dayjs();
    const minDate = today.subtract(3, 'month');

    function setClearFilter() {
        setSearchText('')
        setSelectedCategory('')
        setStartDate(null)
        setEndDate(null)
    }

    console.log("hiii===",selectedCategory,searchText,formattedStartDate,formattedEndDate)

    const enqueueSnackBar = (res : any) => {
        enqueueSnackbar({ severity: 'error', message: res.message });
        if(res.errors){
            if(typeof res.errors == 'string') {
                enqueueSnackbar({ severity: 'error', message: res.errors });
            }else{
                for(let error of res.errors){
                    enqueueSnackbar({ severity: 'error', message: error });
            }
            }
        }
    }

    async function fetchUserTransactions(category : String, text : String, startDate : String | undefined, endDate : String | undefined, page : number, rowsPerPage : number) {
        try{
            const requestBody : any = {
                'userId' : localStorage.getItem('userId'),
                "fromDate" : startDate,
                "toDate" : endDate,
                'category' : category,
                'searchText' : text
            }
            const res : any = await fetchTransactions(requestBody,page,rowsPerPage)
            if(res.status != 'OK') enqueueSnackBar(res)
            else{
                enqueueSnackbar({ severity: 'success', message: res.message });
                setPaginationResult(res.data)
            }
        }catch(err : any){
            enqueueSnackbar({ severity: 'error', message: 'Something went wrong' });
        }
    }

    async function fetchSystemCategories() {
        try{
            const userId = localStorage.getItem('userId')
            const res : any = await fetchCategories(userId || '')
            if(res.status != 'OK') enqueueSnackBar(res)
            else{
                enqueueSnackbar({ severity: 'success', message: res.message });
                selectCategoryOptions(res.data)
            }
        }catch(err : any){
            enqueueSnackbar({ severity: 'error', message: 'Something went wrong' });
        }
    }

    // Helper to extract filename from Content-Disposition
    function getFileNameFromContentDisposition(contentDisposition: string | null): string | null {
        if (!contentDisposition) return null;
        const match = contentDisposition.match(/filename="(.+)"/);
        console.log("match==== ",match)
        return match ? match[1] : null;
    }

    async function downloadFile(transactionId : number){
        try{
            const res : any = await downloadTransactionAttachment(transactionId)
            if(!res.ok) enqueueSnackBar(res)
            else {
                const blob = await res.blob();
                const filename = getFileNameFromContentDisposition(res.headers.get('Content-Disposition'));
                console.log("filename=== ",filename)
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', filename || 'file.pdf');
                document.body.appendChild(link);
                link.click();
                link.remove();
                window.URL.revokeObjectURL(url);
            }
        }catch(err : any){
            console.log(err)
            enqueueSnackbar({ severity: 'error', message: 'Something went wrong' });
        }
    }

    useEffect(() => {
        const isCategorySelected = selectedCategory !== '';
        const isSearchTextValid = searchText.trim() !== '';
        const isDateRangeValid =
            (formattedStartDate && formattedStartDate !== '') &&
            (formattedEndDate && formattedEndDate !== '');

        if (isCategorySelected || isSearchTextValid || isDateRangeValid) {
            fetchUserTransactions(selectedCategory, searchText, formattedStartDate, formattedEndDate ,page, rowsPerPage);
        }
    }, [searchText, startDate, endDate, selectedCategory, dates]);

    useEffect(() => {
        fetchSystemCategories()
    },[])

    function createTransactionData(item: TransactionData) {
        return {
            'values' : [
                item.category,
                item.type,
                item.date.substring(0,10),
                '$' + item.amount.toFixed(2).toLocaleString(),
                item.description != '' && item.description != null ? item.description : '-',
                item.attachment != '' && item.attachment != null ? 
                    <Button onClick={() => downloadFile(item.id)} className="text-blue-600">Download</Button> :
                    '-'
            ],
            'type' : item.type
        }
    }

    const handleChangePage = async (event : any, newPage : any) => {
        setPage(newPage);
        await fetchUserTransactions(selectedCategory, searchText, formattedStartDate, formattedEndDate, page, rowsPerPage)
    };

    const handleChangeRowsPerPage = async (event : any) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
        await fetchUserTransactions(selectedCategory, searchText, formattedStartDate, formattedEndDate, page, rowsPerPage)
    };
    
    return (
        <div className={`flex flex-col bg-white rounded-md ${isDashboardPath ? 'p-4' : 'p-2'}`}>
            { !isDashboardPath && <Typography variant='h4' sx={{ padding : '1rem' }}>Transaction History</Typography>}
            { !isDashboardPath && 
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
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Box display="flex" gap={2}>
                            <CustomDatePicker
                            label="Start Date"
                            value={startDate}
                            onChange={setStartDate}
                            minDate={minDate}
                            maxDate={endDate || today}
                            />
                            <CustomDatePicker
                            label="End Date"
                            value={endDate}
                            onChange={setEndDate}
                            minDate={startDate || minDate}
                            maxDate={today}
                            />
                        </Box>
                    </LocalizationProvider>
                    <CustomSelectDropdown
                        label='Choose category'
                        value={selectedCategory}
                        options={categoryOptions}
                        onChange={setSelectedCategory}
                        variant='outlined'
                    />
                </AccordionDetails>
                <Divider sx={{ my: 2, borderColor: 'grey.300', margin:'0' }} variant='middle' />
                <div className='flex justify-end'>
                    <Button sx={{ color: 'gray',fontWeight:'bold' }} onClick={setClearFilter}>Clear Filter</Button>    
                </div>
            </Accordion> }
            <div className='flex justify-between items-center'>
                <Typography variant={isDashboardPath ? 'h2' : 'h5'} sx={isDashboardPath ? { font: 'revert',paddingBottom:'1rem' }  : { paddingTop : '2rem', marginBottom:"2rem" }}>Recent Transactions</Typography>
                <Link href="/dashboard/transactions/history" className="text-blue-600 underline font-medium">view all</Link>
            </div>
            <Paper sx={{ width : '100%' , overflow : 'hidden' }}>
                <TableContainer sx={{ maxHeight : 440 }}>
                    <Table stickyHeader aria-label="sticky lable">
                        <TableHead>
                            <TableRow>
                                {tableRow.map((column,index) => (
                                    <TableCell
                                    key={index}
                                    sx={{ color:'gray', fontWeight:'bold' }}
                                    >
                                    {column}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginationResult && paginationResult?.content?.length > 0 ? paginationResult?.content
                            .map((data, index) => {
                                const row = createTransactionData(data)
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                        {row?.values.map((column,colIndex) => {
                                            const isIncome = row.type === "INCOME";
                                            const isAmountColumn = colIndex === 3;
                                            return <TableCell key={colIndex} sx={{
                                            color: isAmountColumn
                                                ? isIncome
                                                ? "green"
                                                : "red"
                                                : "inherit"
                                            }}>{column}</TableCell>
                                        })}
                                    </TableRow>
                                );
                            }) : (
                                    <TableRow>
                                        <TableCell colSpan={tableRow.length}>
                                            <Typography variant="h5" align="center">
                                                {(selectedCategory == '' && startDate==undefined && endDate==undefined && searchText == '') ? 
                                                'Select a filter to proceed' : 'No data found'}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                )}
                        </TableBody>
                    </Table>
                </TableContainer>
                { paginationResult != null && !isDashboardPath &&
                <TablePagination
                    component="div"
                    rowsPerPageOptions={[2, 5]}
                    count={paginationResult?.totalElements ?? 0}
                    rowsPerPage={paginationResult?.size ?? 0}
                    page={paginationResult?.number ?? 0}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />}
            </Paper>
            <SnackbarRenderer />
        </ div>
    )
}

export default History
