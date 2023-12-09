import { AppBar, Box, LinearProgress, Toolbar } from '@mui/material';
import { onValue, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react'
import { db } from './firebase';
import { useParams } from "react-router-dom";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useTheme } from '@mui/material/styles';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AnalyzeOptions from './AnalyzeOptions';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

function Analyze() {
  const [score, setScore] = useState();
  const [value, setValue] = React.useState(0);
  const theme = useTheme();
  let params = useParams();
  const game = params.matchId;
  const path = params.path;

  const handleChange = (event, newValue) => {
    setValue(newValue);    
  };

  useEffect(() => {
    const refDb = ref(db, `${path}/${game}`);
    onValue(refDb, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setScore(data);
      }
    });
  }, [game, path]);
  
  if (!score)
    return <LinearProgress />

  const teams = ["home", "away"];

  return (
    <Box>
    <ThemeProvider theme={darkTheme}>
    <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          {teams.map((team, i) =>
            <Tab key={i} label={score[team].name} {...a11yProps(0)} />
          )}
        </Tabs>
      </AppBar>
      </ThemeProvider>
      {!score ?
        <div>No data</div>
        :
        <>
          {teams.map((team, i) =>
            <TabPanel key={i} value={value} index={i} dir={theme.direction}>
              <AnalyzeOptions name={score[team].name} team={team} data={score.analyze} />
            </TabPanel>
          )}
          <Toolbar />
        </>
      }      
    </Box>
  )
}

export default Analyze