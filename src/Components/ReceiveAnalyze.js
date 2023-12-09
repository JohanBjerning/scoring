import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box, Paper, Typography } from '@mui/material';

function structureData (data, team) {
  const newData = [];
  data.forEach((set, setId) => {
    if(!newData[setId])
      newData[setId] = [];
    set.forEach((point, i) => {
    if(point.serve !== team)
      newData[setId].push({
        point: i,
        receive: point.receive,
        winner: point.winner !== team ? true : false,
      })
    })
  });
  return newData;
}

const receiveTypes = {
  "bad": {
    color: "#ff6e40",
    label: "-",
  },
  "neutral": {
    color: "#fff59d",
    label: "0",
  },
  "good": {
    color: "#81c784",
    label: "+"
  }
}

function ReceiveAnalyze({name, data, team, winteam, loseteam}) {
  const receiveData = structureData(data, team);
  return (    
    <>
    {receiveData.map((pointData, i) => (
    <Box m={2} key={i}>    
      <Typography variant='h6' sx={{color: "#fff", mt: 2}}>Set {i + 1}</Typography>
        <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{fontWeight: '800'}}>Point</TableCell>
              <TableCell sx={{fontWeight: '800'}}>Receive</TableCell>
              <TableCell sx={{fontWeight: '800'}}>Winning?</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>           
              <>
                {pointData.map((point, i) => (
                  <TableRow
                    key={i}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >                  
                    <TableCell 
                      component="th" 
                      scope="row">
                      {point.point}
                    </TableCell>
                    <TableCell 
                      align="center"
                      sx={{backgroundColor: receiveTypes[point.receive].color}}>
                        {point.receive}
                    </TableCell>
                    <TableCell 
                      align="center" 
                      sx={{backgroundColor: point.winner ? "#81c784" : "#ff6e40"}}>                      
                    </TableCell>
                  </TableRow>             
                ))}
              </>            
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
    ))}
    </>
  )
}

export default ReceiveAnalyze