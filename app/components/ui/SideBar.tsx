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
  Collapse,
} from '@mui/material';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import { ReceiptOutlined } from '@mui/icons-material';

const drawerWidth = 240;

const mainMenu = [
  { text: 'Dashboard', icon: <DashboardIcon />, path : '/dashboard' },
  { text: 'Transactions', 
    icon: <ReceiptOutlined />,
    childs : [
      { text: 'History', icon: <ReceiptLongIcon />, path : '/dashboard/transactions/history' },
      { text: 'Add', icon: <ReceiptLongIcon />, path : '/dashboard/transactions/add' },
    ]
  },
  { text: 'Budget', icon: <LayersIcon />, path : '/' },
];

const otherMenu = [
  { text: 'Settings', icon: <SettingsIcon />, path : '/' },
  { text: 'Help', icon: <HelpOutlineIcon />, path : '/' },
  { text: 'Logout', icon: <LogoutIcon />, path : 'user/login?logout=true' },
];

function SideBar() {
  const [openMenu, setOpenMenu] = useState<string[]>([]);
  const router = useRouter();
  const pathname = usePathname();

  const toggleMenu = (text: string) => {
    setOpenMenu((prev) =>
        prev.includes(text) ? prev.filter((item) => item !== text) : [...prev, text]
    );
  };

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
              <div  key={item.text}>
                <ListItem disablePadding>
                  <ListItemButton
                    selected = {pathname === item.path}
                    onClick ={() => {
                      if (item.childs) {
                        toggleMenu(item.text);
                      } else if (item.path) {
                        router.push(item.path);
                      }
                    }}
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

                {item.childs && (
                <Collapse in={openMenu.includes(item.text)} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.childs.map((child) => (
                      <ListItem key={child.text} disablePadding>
                        <ListItemButton
                          sx={{ pl: 4 }}
                          selected={pathname === child.path}
                          onClick={() => router.push(child.path)}
                          className="child-list-button"
                        >
                          <ListItemIcon>{child.icon}</ListItemIcon>
                          <ListItemText primary={child.text} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
                )}
                </div>
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
