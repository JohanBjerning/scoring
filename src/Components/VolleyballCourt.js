import { Button, Grid, Paper, Table, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useState } from 'react'
import { alternativesAdvanced } from '../Config/alternatives'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

function altToZone(data, zoneData) {
  const zones = [];
  Object.keys(data).map(key => {
    if(!zoneData[key])
      return "";
    const z = zoneData[key].zone ? zoneData[key].zone : -1;
    if(!zones[z])
      zones[z] = [];
    if(!zones[z][zoneData[key].type])
      zones[z][zoneData[key].type] = 0;
    zones[z][zoneData[key].type] += (data[key]);
    return "";
  })
  return zones;
}

function getStats(data, statData, team) {
  Object.keys(data).map(point => {
    const pointData = data[point];
    if(pointData.winner !== team)
      return "";
    if(!statData[pointData.feedback])
      statData[pointData.feedback] = 0;
    statData[pointData.feedback] += 1;
    return "";
  })
  return "";
}

function VolleyballCourt({score, team}) {
  const [set, setSet] = useState("all");
  const [type, setType] = useState("attack")

  const data = score.analyze;

  const handleChange = (event, newType) => {
    setType(newType);
  };

  const statData = [];
  const nbrSets = Object.keys(data) ? Object.keys(data).length : 0;

  if(set === "all") {
    Object.keys(data).map(key => {
      getStats(data[key], statData, team);
      return "";
    })
  }
  else {
    getStats(data[set], statData, team);
  }

  const zoneData = altToZone(statData, alternativesAdvanced);

  return (
    <Grid container sx={{display: "flex", height: "100%"}} component={Paper}>
      <Grid item xs={12} sx={{background: "#fff"}}>
        <span style={{marginRight: "14px"}}>Points won through:</span>
        <ToggleButtonGroup
          color="primary"
          value={type}
          exclusive
          onChange={handleChange}
        >
          <ToggleButton value="attack" sx={{width: "50%"}}>Attack</ToggleButton>
          <ToggleButton value="defence" sx={{width: "50%"}}>Defence</ToggleButton>
        </ToggleButtonGroup>
      </Grid>
      <Grid item xs={1} className={"court"} sx={{ textAlign: "center", height: "60px", background: "#5F9354" }}>

      </Grid>
      <Grid item xs={10} className={"court"} sx={{textAlign: "center", height: "60px", background: "#5F9354", borderBottom: "2px solid white", display: "flex"}}>
        {/* Zone 0 */}
        {zoneData[0] && zoneData[0][type] && <span className={"score-court"}>{zoneData[0][type]}</span>}
      </Grid>      
      <Grid item xs={1} className={"court"} sx={{textAlign: "center", height: "60px", background: "#5F9354"}}>

      </Grid>

      <Grid item xs={1} className={"court"} sx={{textAlign: "center", height: "300px", background: "#5F9354", borderRight: "2px solid white"}}>
        
      </Grid>
      <Grid item xs={3} className={"court"} sx={{textAlign: "center", height: "300px", background: "#D0904A", borderBottom: "2px solid white"}}>
        {/* Zone 1 */}
        {zoneData[1] && zoneData[1][type] && <span className={"score-court"}>{zoneData[1][type]}</span>}
      </Grid>
      <Grid item xs={4} className={"court"} sx={{textAlign: "center", height: "300px", background: "#D0904A", borderBottom: "2px solid white"}}>
        {/* Zone 6 */}
        {zoneData[6] && zoneData[6][type] && <span className={"score-court"}>{zoneData[6][type]}</span>}
      </Grid>
      <Grid item xs={3} className={"court"} sx={{textAlign: "center", height: "300px", background: "#D0904A", borderBottom: "2px solid white"}}>
        {/* Zone 5 */}
        {zoneData[5] && zoneData[5][type] && <span className={"score-court"}>{zoneData[5][type]}</span>}
      </Grid>
      <Grid item xs={1} className={"court"} sx={{textAlign: "center", height: "300px", background: "#5F9354", borderLeft: "2px solid white"}}>

      </Grid>

      <Grid item xs={1} className={"court"} sx={{textAlign: "center", height: "200px", background: "#5F9354", borderRight: "2px solid white", borderBottom: "4px solid white"}}>
        
      </Grid>
      <Grid item xs={3} className={"court"} sx={{textAlign: "center", height: "200px", background: "#D0904A", borderBottom: "4px solid white"}}>
        {/* Zone 4 */}
        {zoneData[4] && zoneData[4][type] && <span className={"score-court"}>{zoneData[4][type]}</span>}
      </Grid>
      <Grid item xs={4} className={"court"} sx={{textAlign: "center", height: "200px", background: "#D0904A", borderBottom: "4px solid white"}}>
        {/* Zone 3 */}
        {zoneData[3] && zoneData[3][type] && <span className={"score-court"}>{zoneData[3][type]}</span>}
      </Grid>
      <Grid item xs={3} className={"court"} sx={{textAlign: "center", height: "200px", background: "#D0904A", borderBottom: "4px solid white"}}>
        {/* Zone 2 */}
        {zoneData[2] && zoneData[2][type] && <span className={"score-court"}>{zoneData[2][type]}</span>}
      </Grid>
      <Grid item xs={1} className={"court"} sx={{textAlign: "center", height: "200px", background: "#5F9354", borderLeft: "2px solid white", borderBottom: "4px solid white"}}>

      </Grid>
      <Grid item xs={12} sx={{paddingTop: "15px"}} component={Paper}>
        Choose Set:
        <TableContainer component={Paper}>
          <Table>
          <TableHead>
          <TableRow
                    sx={{ 'td, th': { border: 0 }}}
                  >
            <TableCell align="center" sx={{ padding: "2px !important" }}>
              <Button sx={{ padding: "2px !important", background: "#ddd", color: "#000" }} onClick={() => setSet("all")}>All</Button>
            </TableCell>
            {[...Array(nbrSets)].map((x, i) => (
              <TableCell key={i} align="center" sx={{ padding: "2px !important" }}>
                <Button sx={{ padding: "2px !important", fontSize: "14px", color: "#000", background: score[team][i].winner ? "#81c78488" : "#ff6e4088"}} onClick={() => setSet(i)}>{i + 1}</Button>
              </TableCell>
            ))}
            </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  )
}

export default VolleyballCourt