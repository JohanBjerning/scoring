import { Box, LinearProgress } from '@mui/material';
import { onValue, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react'
import { db } from './firebase';
import AnalyzeTable from './Components/AnalyzeTable';

function Analyze({path ,game}) {
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
      if(!newData[data[key].feedback])
        newData[data[key].feedback] = 0;
      newData[data[key].feedback] += 1;      
      return "";
    })
    return newData;
  }
 
  if(!score)
    return <LinearProgress />

  const away = arrangeData(score.away.analyze);
  const home = arrangeData(score.home.analyze);

  return (
    <Box>
      <AnalyzeTable team={score.home.name} data={home} />
      <AnalyzeTable team={score.away.name} data={away} />
    </Box>
  )
}

export default Analyze