import { Box, LinearProgress, Toolbar } from '@mui/material';
import { onValue, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react'
import { db } from './firebase';
import AnalyzeTable from './Components/AnalyzeTable';

function Analyze({ path, game }) {
  const [score, setScore] = useState();
  useEffect(() => {
    const refDb = ref(db, `${path}/${game}`);
    onValue(refDb, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setScore(data);
      }
    });
  }, [game, path]);

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

  if (!score)
    return <LinearProgress />

  const arragened = score.analyze ? arrangeData(score.analyze) : null;

  return (
    <Box>
      {!arragened ?
        <div>No data</div>
        :
        <>
          <AnalyzeTable name={score.home.name} team={"home"} data={arragened} />
          <AnalyzeTable name={score.away.name} team={"away"} data={arragened} />
          <Toolbar />
        </>
      }
    </Box>
  )
}

export default Analyze