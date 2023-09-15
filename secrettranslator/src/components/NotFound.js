import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";


function NotFound(){

    return(
        <>
        
        
       <Box sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
        <img
            src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
            alt="car"
        />

       </Box>
       

        <Box
        sx={{
            marginTop: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <Typography variant="h1" component="h2">
                404
            </Typography>
        </Box>


    </>
    )


}


export default NotFound;