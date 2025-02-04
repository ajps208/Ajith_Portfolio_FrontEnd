import { Box, Button } from '@mui/material'
import React, { useContext } from 'react'
import { NavbarContext } from '../Helper/Contexts/NavbarContext'

export const Navbar = () => {
  
  const {toggle, setToggle} = useContext(NavbarContext)

  return (
    <Box>
      <Button onClick={()=>setToggle(!toggle)}> Expand</Button>
    </Box>
  )
}
