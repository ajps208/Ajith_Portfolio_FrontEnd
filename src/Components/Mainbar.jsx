import { Box, Grid } from '@mui/material'
import React from 'react'
import { Navbar } from './Navbar'

export const Mainbar = () => {
  return (
    <Box sx={{width:"100%",height:"100vh",backgroundColor:"red"}}>
      <Grid container sx={{width:"100%",height:"100vh",display:"flex",flexDirection:"row"}}>
        <Grid item xs={12} md={12} sx={{backgroundColor:"yellow",height:"7vh"}}>
          <Navbar/>
        </Grid>
        <Grid item xs={12} md={12} sx={{backgroundColor:"lime",height:"93vh"}}>
          Mainbar
        </Grid>
      </Grid>
    </Box>
  )
}
