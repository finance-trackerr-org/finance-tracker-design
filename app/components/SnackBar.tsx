import React from 'react'
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function CustomizedSnackbar({ severity, message, open, onClose, onSnackBarClose }: { severity: 'error' | 'success'; message: string; open:boolean; onClose: () => void; onSnackBarClose: () => void;}) {

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') return;
        onSnackBarClose();
        onClose();
    };

    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical : 'bottom', horizontal : 'right' }}>
            <Alert
                onClose={handleClose}
                severity={severity}
                variant='filled'
                sx={{ width: '100%' }}
                >
                {message}
            </Alert>
        </Snackbar>
    )
}

export default CustomizedSnackbar
