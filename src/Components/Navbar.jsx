import { Box, Button } from '@mui/material'
import React, { useContext } from 'react'
import { NavbarContext } from '../Helper/Contexts/NavbarContext'
import WindowIcon from '@mui/icons-material/Window';

export const Navbar = () => {
  
  const {toggle, setToggle} = useContext(NavbarContext)

  return (
    <Box sx={{width:"100%",height:"100%",display:"flex",alignItems:"center", boxShadow: '5px 0px 10px rgba(0, 0, 0, 0.5)'
    }}>
      <Button onClick={()=>setToggle(!toggle)}> <WindowIcon/></Button>
    </Box>
  )
}
