import React from 'react'
import AnalyzeTable from './Components/AnalyzeTable'
import { AppBar, Box, Tabs, Toolbar } from '@mui/material';
import { styled } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import { useTheme } from '@mui/material/styles';
import ReceiveAnalyze from './Components/ReceiveAnalyze';
import ResultTable from './Components/ResultTable';
import VolleyballCourt from './Components/VolleyballCourt';

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

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  '& .MuiTabs-indicatorSpan': {
    maxWidth: 40,
    width: '100%',
    backgroundColor: '#635ee7',
  },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    color: 'rgba(255, 255, 255, 0.7)',
    '&.Mui-selected': {
      color: '#fff',
    },
    '&.Mui-focusVisible': {
      backgroundColor: 'rgba(100, 95, 228, 0.32)',
    },
  }),
);

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

function AnalyzeOptions({name, team, score}) {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const data = score.analyze;
  const handleChange = (event, newValue) => {
    setValue(newValue);    
  };

  return (
    <Box>
    <AppBar position="static">
      <Box sx={{ bgcolor: '#3c3c3c' }}>
        <StyledTabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <StyledTab key={0} label={"Overview"} {...a11yProps(0)} />
          <StyledTab key={1} label={"Receive"} {...a11yProps(0)} />
          <StyledTab key={2} label={"Court"} {...a11yProps(0)} />
        </StyledTabs>
        </Box>
      </AppBar>
      {!data ?
        <div>No data</div>
        :
        <>
        <TabPanel value={value} index={0} dir={theme.direction}>
          <ResultTable score={score} />
          <AnalyzeTable name={name} winteam={team} loseteam={team === "home" ? "away" : "home"} data={data} />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <ReceiveAnalyze name={name} data={data} team={team} />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <VolleyballCourt score={score} team={team} />
        </TabPanel>
        <Toolbar />
        </>
      }      
    </Box>    
  )
}

export default AnalyzeOptions