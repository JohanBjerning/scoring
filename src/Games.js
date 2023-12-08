import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ListGames from './ListGames';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Analyze from './Analyze';
import BottomBarMain from './Components/BottomBarMain';

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


function Games({user}) {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [game, setGame] = React.useState();

  const showAnalyze = (id, path) => {
    setGame({id: id, path: path});
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
          <Tab label="Pågående matcher" {...a11yProps(0)} />
          <Tab label="Historik" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      </ThemeProvider>
        <TabPanel value={value} index={0} dir={theme.direction}>
        {!game ? 
            <ListGames user={user} path={"runningGames"} setGame={showAnalyze} />
          :
            <Analyze path={game.path} game={game.id} />
          }
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          {!game ? 
            <ListGames user={null} path={"history"} setGame={showAnalyze} />
          :
            <Analyze path={game.path} game={game.id} />
          }
        </TabPanel>
        <BottomBarMain setGame={() => setGame(null)}/>
    </Box>
  );
}

export default Games;

