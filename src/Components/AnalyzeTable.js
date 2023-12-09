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
  "Oklart",
  "Left attack",
  "Center attack",
  "Right attack",
  "Drop left",
  "Drop center",
  "Drop right",
  "Block left",
  "Block center",
  "Block right",
  "Back spike",
  "Serve ace",
  "Net touch",
  "Unforced error",  
  "Rotation error",
  "Unknown error"
]

function arrangeData(data) {
  const newData = [];
  Object.keys(data).map(key => {
    newData[key] = [];
    data[key].map(point => {
      if (!newData[key][point.winner])
        newData[key][point.winner] = [];
      if (!newData[key][point.winner][point.feedback])
        newData[key][point.winner][point.feedback] = 0;
      newData[key][point.winner][point.feedback] += 1;
      return "";
    })
    return "";
  })
  return newData;
}


function AnalyzeTable({ name, data, winteam, loseteam }) {

  const arragened = data ? arrangeData(data) : null;

  if (!arragened)
    return <></>

  const sets = Object.keys(data).length;

  return (
    <Box m={2}>
      <Typography variant='h6' sx={{ color: "#fff", mt: 2 }}>{name}</Typography>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: '800' }}></TableCell>
              {[...Array(sets)].map((x, i) => (
                <TableCell key={i} sx={{ fontWeight: '800' }} align="right">{i + 1}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <>
              {alternatives.map(alt => (
                <React.Fragment key={alt}>
                  <TableRow
                    sx={{ 'td, th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      Win {alt}
                    </TableCell>
                    {[...Array(sets)].map((x, i) => (
                      <TableCell key={i} align="right">{arragened[i] && arragened[i][winteam] && arragened[i][winteam][alt]}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      Lose {alt}
                    </TableCell>
                    {[...Array(sets)].map((x, i) => (
                      <TableCell key={i} align="right">{arragened[i] && arragened[i][loseteam] && arragened[i][loseteam][alt]}</TableCell>
                    ))}
                  </TableRow>
                </React.Fragment>
              ))}
            </>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default AnalyzeTable