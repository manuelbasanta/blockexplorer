import { Outlet, useNavigate } from 'react-router-dom';
import { AlchemyProviderContext } from '../AlchemyProviderContext';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import NetworkSelector from './NetworkSelector';
import useAlchemyProvider from '../hooks/useAlchemyProvider';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

const Root = () => {
  const {setNetwork, alchemyProvider} = useAlchemyProvider();
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();


  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      navigate(`/${inputValue}`);
      setInputValue('');
    }
  }

  const handleChange = (event) => {
    setInputValue(event.target.value);
  }


  return (
    <>
      <CssBaseline />
      <Container maxWidth="xl">
        <Box xs={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid xs={12}>
              <h1>Ethereum Block Explorer</h1>
            </Grid>
            <AlchemyProviderContext.Provider value={alchemyProvider}>
              <Grid xs={12} sm={2}>
                <NetworkSelector onChangeNetwork={setNetwork}/>
              </Grid>
              <Grid xs={12} sm={10}>
                <TextField
                  label="Search by block number"
                  variant="standard"
                  sx={{marginBottom: 2, minWidth: 200}}
                  onKeyPress={handleKeyPress}
                  onChange={handleChange}
                  value={inputValue}
                />
                <Outlet />
              </Grid>
            </AlchemyProviderContext.Provider>
          </Grid>
        </Box>
      </Container>
    </>
  );
}

export default Root;
