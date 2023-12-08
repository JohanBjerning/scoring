import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box, Paper, Typography } from '@mui/material';

const alternatives = [
  "Kill",
  "Ace",
  "Block",
  "Unforced",
  "Serve miss",
  "Oklart"
]

function AnalyzeTable({name, data, team}) {
  const sets = Object.keys(data).length; 
  return (
    <Box m={2}>
      <Typography variant='h6' sx={{color: "#fff", mt: 2}}>{name}</Typography>
        <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{fontWeight: '800'}}>Vinst genom</TableCell>
              {[...Array(sets)].map((x, i) => (
                <TableCell key={i} sx={{fontWeight: '800'}} align="right">{i + 1}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>           
              <>
                {alternatives.map(alt => (
                  <TableRow
                    key={alt}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >                  
                    <TableCell component="th" scope="row">
                      {alt}
                    </TableCell>
                    {[...Array(sets)].map((x, i) => (
                      <TableCell key={i} align="right">{data[i][team] && data[i][team][alt]}</TableCell>
                    ))}
                  </TableRow>                
                ))}
              </>            
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default AnalyzeTable