'use client';

import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Typography,
    Grid
} from '@mui/material';
import { CATEGORIES } from '@/app/constants/data';
import { addUserMasterBudget } from '@/lib/api/transaction';
import CustomizedSnackbar from '../SnackBar';
import dayjs, { Dayjs } from 'dayjs';

export default function UserMasterBudgetDialog() {
    const [open, setOpen] = useState(false);
    const [balance, setBalance] = useState('');
    const [distribution, setDistribution] = useState<{ [key: string]: string }>({});

    const [snackBarProps ,setSnackBarProps] = useState<null | { severity: 'success' | 'error'; message: string }>(null);
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarQueue, setSnackBarQueue] = useState<{ message: string; severity: 'error' | 'success' }[]>([]);

    const handleSnackBarClose = () => {
        setSnackBarOpen(false);
        setSnackBarProps(null);
    };

    const enqueueSnackbar = (snack : { message: string; severity: 'error' | 'success' }) => {
        setSnackBarQueue(prev => [... prev, snack])
    }

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleCategoryChange = (category: string, value: string) => {
        setDistribution(prev => ({
        ...prev,
        [category]: value
        }));
    };

    useEffect(() => {
        if(!snackBarOpen && snackBarQueue.length>0){
            const nextStack = snackBarQueue[0]
            setSnackBarProps(nextStack)
            setSnackBarQueue(prev => prev.slice(1))
            setSnackBarOpen(true)
        }
    }, [snackBarQueue,snackBarOpen])

    const handleSave = async () => {
        try{
            const now = dayjs();
            const requestBody : any = {
                userId : "8fd487f8-2c88-49c1-875b-bff3722185ab",
                totalBalance : balance,
                categoryPricing : distribution,
                date : now.format('YYYY-MM-DD')
            }
            const res : any = await addUserMasterBudget(requestBody)
            if(res.status != 'OK') {
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
        }else {
            enqueueSnackbar({ severity: 'success', message: res.message });
        }
        }catch(err : any){
            enqueueSnackbar({ severity: 'error', message: 'Something went wrong' });
        }
        setDistribution({});
        setBalance('');
        handleClose();
    };

    return (
        <>
        <Button variant="contained" onClick={handleClickOpen}>
            Set Monthly Budget
        </Button>

        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>Enter Monthly Balance</DialogTitle>
            <DialogContent dividers>
            <TextField
                label="Total Balance"
                type="number"
                fullWidth
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
                margin="normal"
            />

            <Typography variant="h6" gutterBottom>
                Distribute to Categories
            </Typography>

            <Grid container spacing={2}>
                {CATEGORIES.map((category) => (
                <div className="flex flex-wrap">
                    <TextField
                    label={category}
                    type="number"
                    fullWidth
                    value={distribution[category] || ''}
                    onChange={(e) => handleCategoryChange(category, e.target.value)}
                    />
                </div>
                ))}
            </Grid>
            </DialogContent>

            <DialogActions>
            <Button onClick={handleClose} color="secondary">
                Cancel
            </Button>
            <Button onClick={handleSave} variant="contained" color="primary">
                Save
            </Button>
            </DialogActions>
        </Dialog>

        {snackBarOpen && <div className="fixed bottom-4 right-4 z-50 w-[20rem] h-6">
            <CustomizedSnackbar
                severity={snackBarProps?.severity ?? 'error'}
                message={snackBarProps?.message ?? ''}
                open={snackBarOpen}
                onClose={handleSnackBarClose}
                onSnackBarClose={handleSnackBarClose}
            />
        </div>}
        </>
    );
}
