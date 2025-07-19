'use client';
import { useState, useEffect } from 'react';
import CustomizedSnackbar from "../components/ui/SnackBar";

type SnackbarSeverity = 'success' | 'error';

interface SnackbarProps {
  severity: SnackbarSeverity;
  message: string;
}

export const useSnackbarQueue = () => {
    const [snackBarProps, setSnackBarProps] = useState<SnackbarProps | null>(null);
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarQueue, setSnackBarQueue] = useState<SnackbarProps[]>([]);

    const enqueueSnackbar = (snackbar: SnackbarProps) => {
        setSnackBarQueue(prev => [snackbar, ...prev]);
    };

    const handleClose = () => {
        setSnackBarOpen(false);
        setSnackBarProps(null);
    };

    useEffect(() => {
        if (!snackBarOpen && snackBarQueue.length > 0) {
            const nextSnack = snackBarQueue[0];
            setSnackBarProps(nextSnack);
            setSnackBarQueue(prev => prev.slice(1));
            setSnackBarOpen(true);
        }
    }, [snackBarQueue, snackBarOpen]);

    const SnackbarRenderer = () => (
        snackBarOpen && snackBarProps ? (
        <div className="fixed bottom-4 right-4 z-50 w-[20rem] h-6">
            <CustomizedSnackbar
                severity={snackBarProps.severity}
                message={snackBarProps.message}
                open={snackBarOpen}
                onClose={handleClose}
                onSnackBarClose={handleClose}
            />
        </div>
        ) : null
    );

    return {
        enqueueSnackbar,
        SnackbarRenderer,
    };
};
