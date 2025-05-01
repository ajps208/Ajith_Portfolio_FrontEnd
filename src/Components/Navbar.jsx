import { Box, Button, IconButton, Tooltip } from '@mui/material';
import React from 'react';
import WindowIcon from '@mui/icons-material/Window';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import useNavbarStore from '../Helper/Store/NavBarStore';
import { useDarkModeStore } from '../Helper/Store/DarkModeStore';

export const Navbar = () => {
  const { toggle, setToggle } = useNavbarStore();
    const { darkMode } = useDarkModeStore();
  

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 10px',
        boxShadow: '5px 0px 10px rgba(0, 0, 0, 0.5)',
      }}
    >
      <Button onClick={() => setToggle(!toggle)}>
        <WindowIcon />
      </Button>

      {/* Portfolio Icon */}
      <Tooltip title="Switch To Another Portfolio">
      <IconButton onClick={() => window.open('https://portfolio-ajith-ps.vercel.app/', '_blank', 'noopener,noreferrer')}>
        <OpenInNewIcon sx={{ color: darkMode ? "#61dafb" : "#2196f3" }} />
      </IconButton>
      </Tooltip>
    </Box>
  );
};
