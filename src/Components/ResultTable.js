import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box, Button, Grid } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import DeleteIcon from '@mui/icons-material/Delete';

function ResultTable({ score, showInfo, handleDelete }) {

  const numberOfSets = score.away.set + score.home.set;

  const teams = ["home", "away"];

  const winner = score.away.set > score.home.set ? "away" : "home";

  return (
    <Box m={showInfo ? 0 : 2} mt={2} mb={2}>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow sx={{ background: "#3C3C3C" }}>
              <TableCell sx={{ padding: '1px !important', fontSize: "small", color: "#fff" }}><Box ml={2}>{score.league}</Box></TableCell>
            </TableRow>            
            <TableRow sx={{ color: "#fff", background: "#3C3C3C" }}>            
              <TableCell sx={{ fontWeight: '800', color: "#fff" }}>Team</TableCell>
              <TableCell sx={{ fontWeight: '800', color: "#fff" }} align="right">Set</TableCell>
              {[...Array(numberOfSets)].map((x, i) => (
                <TableCell key={i} sx={{ fontWeight: '800', color: "#fff" }} align="center">{i + 1}</TableCell>
              ))}              
            </TableRow>
          </TableHead>
          <TableBody>
            <>
              {teams.map((team, i) => (
                <React.Fragment key={i}>
                  <TableRow
                    sx={{ 'td, th': { border: 0 }, background: team === winner ? "#81c78488" : "#ff6e4088" }}
                  >
                    <TableCell 
                      component="th" 
                      scope="row"
                      sx={{ 'td, th': { border: 0 }, background: team === winner ? "#81c78488" : "#ff6e4088", fontWeight: 800}}>
                      {score[team].name}
                    </TableCell>
                    <TableCell
                      sx={{ 'td, th': { border: 0 }, background: team === winner ? "#81c78488" : "#ff6e4088", fontWeight: 800}}
                      component="th"
                      scope="row"
                      align="center">
                      {score[team].set}
                    </TableCell>
                    {[...Array(numberOfSets)].map((x, i) => (
                      <TableCell key={i} align="center">
                        {score[team][i].score}
                      </TableCell>
                    ))}                    
                  </TableRow>
                </React.Fragment>
              ))}
            </>
          </TableBody>
        </Table>
      </TableContainer>      
      <Grid container>
      <Grid item xs={6}>
      {showInfo && <Button
        variant={"standard"}
        endIcon={<InfoIcon />}
        onClick={showInfo}
        sx={{ color: "#000", borderRadius: "10px !important", p: "2px !important", m: 1 }}>
        Stats
      </Button>}
      </Grid>
      <Grid item xs={6} sx={{textAlign: "right"}}>
      {handleDelete &&
        <Button
          variant={"standard"}
          endIcon={<DeleteIcon />}
          onClick={handleDelete}
          sx={{ color: "red", borderRadius: "10px !important", p: "2px !important", m: 1 }}>
          Delete
        </Button>}
        </Grid>
        </Grid>
    </Box>
  )
}

export default ResultTable