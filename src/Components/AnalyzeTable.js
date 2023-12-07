import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box, Paper, Typography } from '@mui/material';

function AnalyzeTable({team, data}) {
  return (
    <Box m={2}>
      <Typography variant='h6' sx={{color: "#fff", mt: 2}}>{team}</Typography>
        <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{fontWeight: '800'}}>Vinst genom</TableCell>
              <TableCell sx={{fontWeight: '800'}} align="right">Antal</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(data).map((row) => (
              <TableRow
                key={row}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row}
                </TableCell>
                <TableCell align="right">{data[row]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default AnalyzeTable