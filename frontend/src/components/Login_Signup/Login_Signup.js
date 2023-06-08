import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Grid, Box, Paper } from '@mui/material';

import { useState } from 'react';

import Login from './Login';
import Signup from './Signup';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: 'lightblue',
  padding: theme.spacing(1),
  textAlign: 'center',
  fontSize: '20px',
  color: 'white',
}));

export default function LoginSignup () {

  const [login, setLogin] = useState(true);

  if (login) {
    return (
      <React.Fragment>

        <Box sx={{ m: '5% 25% 5% 25%' }}>
          <Grid container spacing={2} sx={{ height: '20px' }}>
            <Grid item xs={6}>
              <Item sx={{ bgcolor: 'dodgerblue' }}>Login</Item>
            </Grid>
            <Grid item xs={6}>
              <Item onClick={() => setLogin(false)}>Sign Up</Item>
            </Grid>
          </Grid>
        </Box>

        <Login />

      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <Box sx={{ m: '5% 25% 5% 25%' }}>
          <Grid container spacing={2} sx={{ height: '20px' }}>
            <Grid item xs={6}>
              <Item onClick={() => setLogin(true)}>Login</Item>
            </Grid>
            <Grid item xs={6}>
              <Item sx={{ bgcolor: 'dodgerblue' }}>Sign Up</Item>
            </Grid>
          </Grid>
        </Box>

        <Signup />

      </React.Fragment>
    );
  }
}
