"use client"

import { Box, Button, FormHelperText, Link, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { addTransaction, fetchCategories } from '@/lib/api/transaction';
import CustomSelectDropdown from '../CustomeSelectDropdown';
import CustomizedSnackbar from '../SnackBar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CustomDatePicker from '../Calendar';
import dayjs, { Dayjs } from 'dayjs';
import { styled } from '@mui/material/styles';
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import z, { string } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import CloseIcon from '@mui/icons-material/Close';

const TransactionSchema = z.object({
    amount : z.number({ required_error : "Amount is required" })
        .positive({ message:'Amount should be greater than 0' }),
    category : z.string({ required_error: "Category is required" })
            .min(1, { message: "Select a category" }),
    date : z.custom<dayjs.Dayjs>((val) => dayjs.isDayjs(val) && val.isValid(), {
            message: 'Invalid date'}),
    description : z.string().max(255, { message:"Description should not be greater than 255 letters" }).optional()
})

interface FileInput{
    inputFile : File;
    fileType : string;
    fileName : string;
    fileUrl : string;
}

function TransactionAdd() {
    const [selectedType, setSelectedType] = useState<'income' | 'expense'>('income');
    const [file, setFile] = useState<FileInput | null>(null);

    const [snackBarProps ,setSnackBarProps] = useState<null | { severity: 'success' | 'error'; message: string }>(null);
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarQueue, setSnackBarQueue] = useState<{ message: string; severity: 'error' | 'success' }[]>([]);

    const [categoryOptions, selectCategoryOptions] = useState([])

    const today = dayjs();
    const minDate = today.subtract(3, 'month');

    const router = useRouter();

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    type FormData = z.infer<typeof TransactionSchema>;

    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors },
        reset,
        } = useForm<FormData>({
        resolver: zodResolver(TransactionSchema),
        mode: "onSubmit",
        defaultValues: {
            amount: 0,
            category: '',
            date: dayjs,
            description: '',
        },
    });

    async function fetchSystemCategories() {
        try{
            const userId = '8fd487f8-2c88-49c1-875b-bff3722185ab'
            const res : any = await fetchCategories(userId)
            if(res.status != 'OK'){
                enqueueSnackbar({ severity: 'error', message: res.message });
                if(res.errors){
                    if(typeof res.errors == 'string') {
                        enqueueSnackbar({ severity: 'error', message: res.message });
                    }else{
                        for(let error of res.errors){
                            enqueueSnackbar({ severity: 'error', message: error });
                    }
                }
            }
        }else{
            enqueueSnackbar({ severity: 'success', message: res.message });
            selectCategoryOptions(res.data)
        }
        }catch(err : any){
            enqueueSnackbar({ severity: 'error', message: 'Something went wrong' });
        }
    }

    async function onSubmit(data : FormData) {
        try{
            const updatedData = {
                ... data,
                role : 'USER',
                date: data.date.format("YYYY-MM-DD"), 
                type : selectedType.toUpperCase(),
                userId: '8fd487f8-2c88-49c1-875b-bff3722185ab'
            }

            const formData = new FormData();
            formData.append("attachment", file != null && file?.inputFile ?  file?.inputFile : '');

            const blob = new Blob([JSON.stringify(updatedData)], {
                type: "application/json",
            });
            formData.append("data", blob);

            const res = await addTransaction(formData)
            if(res.status != 'OK') {
                enqueueSnackbar({ severity: 'error', message: res.message });
                setSnackBarOpen(true);
                if(res.errors){
                    if(typeof res.errors == 'string') {
                        enqueueSnackbar({ severity: 'error', message: res.message });
                        setSnackBarOpen(true);
                    }else{
                        for(let error of res.errors){
                            enqueueSnackbar({ severity: 'error', message: error });
                            setSnackBarOpen(true);
                        }
                    }
                    reset();
                }
            }else {
                enqueueSnackbar({ severity: 'success', message: res.message });
                setSnackBarOpen(true);
                reset();
            }
            } catch(err : any) {
            setSnackBarProps({ severity: 'error', message: 'Something went wrong' });
            setSnackBarOpen(true);
        
            reset();
            }
    }

    const handleFileChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target.files?.[0];
        if(!input) return;
        const fileType = input?.type;
        const fileName = input?.name;
        const fileUrl = URL.createObjectURL(input);
        setFile({inputFile: input, fileType, fileName, fileUrl});
    }

    const handleSnackBarClose = () => {
        setSnackBarOpen(false);
        setSnackBarProps(null);
    };

    const enqueueSnackbar = (snack : { message: string; severity: 'error' | 'success' }) => {
        setSnackBarQueue(prev => [... prev, snack])
    }

    useEffect(() => {
        fetchSystemCategories()
    }, [])
    
    return (
        <div className='flex flex-col p-2 justify-center'>
            <Typography variant='h4' sx={{ padding : '1rem' }}>Add Transaction</Typography>
            <form onSubmit={handleSubmit(onSubmit)} className='bg-white p-4 rounded-lg shadow-md w-full max-w-xl flex flex-col space-y-4'>
                <div className='flex gap-5 justify-around flex-wrap pb-1'>
                    <Button
                        variant='outlined'
                        startIcon={<ArrowUpwardIcon />}
                        onClick={() => setSelectedType('income')}
                        sx={{
                            minWidth :'10rem',
                            minHeight:'3rem',
                            borderColor: selectedType == 'income' ? '#2563eb' : '#4B5563',
                            color: selectedType === 'income' ? '#2563eb' : '#6b7280',
                            fontWeight: 'bold',
                            backgroundColor: selectedType === 'income' ? '#eff6ff' : 'transparent',
                            '&:hover': {
                                backgroundColor: selectedType === 'income' ? '#dbeafe' : '#f9fafb',
                            },
                        }}
                    >
                        Income
                    </Button>
                    <Button
                        variant='outlined'
                        onClick={() => setSelectedType('expense')}
                        startIcon={<ArrowDownwardIcon />}
                        sx={{
                        minWidth: '10rem',
                        minHeight: '3rem',
                        borderColor: selectedType === 'expense' ? '#2563eb' : '#4B5563',
                        color: selectedType === 'expense' ? '#2563eb' : '#6b7280',
                        fontWeight: 'bold',
                        backgroundColor: selectedType === 'expense' ? '#eff6ff' : 'transparent',
                        '&:hover': {
                            backgroundColor: selectedType === 'expense' ? '#dbeafe' : '#f9fafb',
                        }
                        }}
                    >
                        Expense
                    </Button>
                </div>
                <div>
                    <Typography variant='subtitle2' sx={{ fontWeight:'semi-bold' }}>Amount</Typography>
                    <TextField id="standard-basic" type="number" variant="standard" error={!!errors.amount}
                        {...register("amount", { valueAsNumber: true })}
                    />
                    {errors.amount && (
                        <FormHelperText error>{errors.amount.message}</FormHelperText>
                    )}
                </div>
                <div>
                    <Typography variant='subtitle2' sx={{ fontWeight:'semi-bold' }}>Category</Typography>
                    <Controller
                        name = "category"
                        control={control}
                        render={({ field }) => (
                            <CustomSelectDropdown
                            value={field.value}
                            onChange={field.onChange}
                            options={categoryOptions}
                            variant="standard"
                            error={ !!errors.category }
                            />
                        )}
                    />
                    {errors.category && (
                        <FormHelperText error>{errors.category.message}</FormHelperText>
                    )}
                </div>
                <div>
                <Typography variant='subtitle2' sx={{ fontWeight:'semi-bold' }}>Date</Typography>
                <Controller
                    name = "date"
                    control={control}
                    render = {({ field }) => (
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <CustomDatePicker
                                onChange={field.onChange}
                                value={field.value}
                                minDate={minDate}
                                maxDate={today}
                                error={ !!errors.date }
                            />
                        </LocalizationProvider>
                    )}
                />
                {errors.date && (
                    <FormHelperText error>{errors.date.message}</FormHelperText>
                )}
                </div>
                <div>
                    <Typography variant='subtitle2' sx={{ fontWeight:'semi-bold' }}>Description</Typography>
                    <TextField
                        id="file-upload"
                        multiline
                        rows={4}
                        placeholder='Add notes about this transaction...'
                        variant='standard'
                        fullWidth
                        error={!!errors.description}
                        {...register("description")}
                    />
                </div>
                <div>
                <div className='flex items-center justify-between'>
                    <Typography variant='subtitle2' sx={{ fontWeight:'semi-bold' }}>Attachment</Typography>
                    <Button onClick={(e) => setFile(null)}>
                        <CloseIcon sx={{ color:'black', width:'1rem', borderRadius:'50%' }} />
                    </Button>
                </div>
                {file == null && <Button
                    component="label"
                    role={undefined}
                    variant='outlined'
                    tabIndex={-1}
                    sx={{
                        borderRadius:2,
                        border:'2px dashed #d1d5db',
                        textAlign: "center",
                        py: 6,
                        px: 2,
                        cursor: "pointer",
                        backgroundColor: "#f9fafb",
                        "&:hover": {
                            backgroundColor: "#f3f4f6",
                        },
                    }}
                    fullWidth
                    >
                    <div>
                        <InsertPhotoIcon sx={{ color:'gray', fontSize: 40 }} />
                        <Typography variant='subtitle2' sx={{ color:'#2563EB', fontWeight:'medium' }}>Upload a File</Typography>
                        <Typography variant='caption' sx={{ color:'gray', fontWeight:'medium' }}>PNG, JPG, PDF up to 10MB</Typography>
                    </div>
                    <VisuallyHiddenInput
                        type="file"
                        onChange={handleFileChange}
                        accept='image/*,application/pdf'
                    />
                </Button>}
                { file !=null && 
                    <div>
                        <Typography variant="subtitle1">{file.fileName}</Typography>
                        { file.fileType?.startsWith("image") ?
                            (
                            <Box component="img" src={file.fileUrl} alt="Selected file" sx={{ maxWidth: '60%', maxHeight: 200 }}/> 
                            ) : file.fileType=="application/pdf" ? (
                                <Box component="iframe" src={file.fileUrl} sx={{ width: '60%', height: 200 }}/> 
                            ) : <Typography color="error">Unsupported file type</Typography>
                        }
                    </div>
                }
                </div>
                <div className='flex p-4 flex-wrap justify-between'>
                    <Button variant='contained' type="reset" sx={{ backgroundColor:'white', color:'#2563EB', width:'12rem',height:'3rem' }}>Cancel</Button>
                    <Button variant='contained' type="submit" sx={{ width:'12rem', height:'3rem' }}>Add Transaction</Button>
                </div>
            </form>
            {snackBarOpen && <div className="fixed bottom-4 right-4 z-50 w-[20rem] h-6">
                <CustomizedSnackbar
                    severity={snackBarProps?.severity ?? 'error'}
                    message={snackBarProps?.message ?? ''}
                    open={snackBarOpen}
                    onClose={handleSnackBarClose}
                    onSnackBarClose={handleSnackBarClose}
                />
            </div>}
        </ div>
    )
}

export default TransactionAdd;