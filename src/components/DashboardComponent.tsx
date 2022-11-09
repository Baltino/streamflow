import * as React from 'react';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import { StateResponse, StatusRequest } from '../types';
import StreamsTable from './StreamsTable';
function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Streamflow test
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

type Props = {
  streamsResponse: StateResponse
}

const DashboardComponent = ({ streamsResponse }: Props) => {
console.log(streamsResponse.data)
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Chart */}
        <Grid item xs={12}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}
          >
           {streamsResponse.status === StatusRequest.in_progress && <Typography variant="body1">Loading streams...</Typography> } 
           {streamsResponse.status === StatusRequest.error && <Typography variant="body1" color="error">Something went bad: {streamsResponse.error}</Typography>}
           {streamsResponse.status === StatusRequest.success && <StreamsTable streams={streamsResponse.data} /> } 
          </Paper>
        </Grid>
        
        {/* Recent Orders */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            {"More stuff..."}
          </Paper>
        </Grid>
      </Grid>
      <Copyright sx={{ pt: 4 }} />
    </Container>
  );
}

export default DashboardComponent;
