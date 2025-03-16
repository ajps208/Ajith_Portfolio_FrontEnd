import { Box, Button } from '@mui/material'
import React from 'react'
import WindowIcon from '@mui/icons-material/Window';
import useNavbarStore from '../Helper/Store/NavBarStore';

export const Navbar = () => {
  
  const { toggle, setToggle } = useNavbarStore();
  return (
    <Box sx={{width:"100%",height:"100%",display:"flex",alignItems:"center", boxShadow: '5px 0px 10px rgba(0, 0, 0, 0.5)'
    }}>
      <Button onClick={()=>setToggle(!toggle)}> <WindowIcon/></Button>
    </Box>
  )
}
