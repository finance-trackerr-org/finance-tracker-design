"use client"

import * as React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LayersIcon from '@mui/icons-material/Layers';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import { createTheme, styled } from '@mui/material/styles';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
} from '@mui/material';
import { useRouter, usePathname } from 'next/navigation';

const drawerWidth = 240;

const mainMenu = [
  { text: 'Dashboard', icon: <DashboardIcon />, path : '/dashboard' },
  { text: 'Transactions', icon: <ReceiptLongIcon />, path : '/dashboard/transactions/history' },
  { text: 'Budget', icon: <LayersIcon />, path : '/' },
];

const otherMenu = [
  { text: 'Settings', icon: <SettingsIcon />, path : '/' },
  { text: 'Help', icon: <HelpOutlineIcon />, path : '/' },
  { text: 'Logout', icon: <LogoutIcon />, path : '/' },
];

function SideBar() {
  const router = useRouter();
  const pathname = usePathname();

  const Skeleton = styled('div')<{ height: number }>(({ theme, height }) => ({
    backgroundColor: theme.palette.action.hover,
    borderRadius: theme.shape.borderRadius,
    height,
    content: '" "',
  }));
  

  return (
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            p: 2,
            backgroundColor : '#FFFF'
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box>
            <Typography variant='h6' noWrap sx={{ mb: 3 }}>Finance Tracker</Typography>

            <Divider sx={{ my: 2 }} variant='fullWidth' />

            <Typography variant="caption" sx={{ mb: 1, color: 'gray' }}>
              Main Menu
            </Typography>

            <List>
              {mainMenu.map((item) => (
                <ListItem key={item.text} disablePadding>
                  <ListItemButton
                    selected = {pathname === item.path}
                    onClick={() => router.push(item.path)}
                    sx={{
                      '&.Mui-selected': {
                        backgroundColor: '#e0f2fe',
                        color: '#0f172a',
                      },
                    }}
                  >
                    <Skeleton height={14} />
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>

          <Box>
          <Typography variant="caption" sx={{ mb: 1, color: 'gray' }}>
          Others
          </Typography>
          <List>
            {otherMenu.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  selected = {pathname === item.path}
                  onClick={() => router.push(item.path)}
                  sx={{
                    '&.Mui-selected': {
                      backgroundColor: '#e0f2fe',
                      color: '#0f172a',
                    },
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
  );
}

export default SideBar
