import * as React from 'react';
import { useState } from 'react';

import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { CreateParams, getBN, BN } from '@streamflow/stream';
import { StatusRequest } from '../types';
import { PhantomWallet } from '../wallets/phantom';

type Props = {
  onCreateStream: (c: CreateParams) => void,
  response: { status: StatusRequest, error: string },
  wallet: PhantomWallet | null
}
type BasicCreateStreamAttributes = {
  recipient: string,
  name: string,
  depositedAmount: number | string,
  cancelableBySender: boolean,
}
const CreateStreamComponent = ({ onCreateStream, response, wallet }: Props) => {
  const [values, setValues] = useState<BasicCreateStreamAttributes>({
    recipient: '',
    name: '',
    depositedAmount: '',
    cancelableBySender: false,
  });
  const handleSelectToken = (event: SelectChangeEvent) => {
    //setAge(event.target.value as string);
  };

  const handleChangeValue = (attribute: string) => (evt: React.ChangeEvent<HTMLInputElement>) => {
    setValues((values) => ({
      ...values,
      [attribute]: evt.target.value
    }))
  }

  const handleToggleValue = (attribute: string) => (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setValues((values) => ({
      ...values,
      [attribute]: checked
    }))
  }

  const handleOnCreateStream = () => {
    if (!wallet) return;

    const depositedAmount = typeof values.depositedAmount === 'string' ? parseInt(values.depositedAmount) : values.depositedAmount;

    const createStreamParams: CreateParams = {
      sender:  wallet, // 
      mint: "HaWnUM4z1Y3HMZ7BbQhnY3DGMLE8dZeBnLJUCKxf1fcT", // SPL Token mint.
      start: new Date().getTime()/100 + 60, // next minute.
      depositedAmount: getBN(depositedAmount, 9), // depositing 100 tokens with 9 decimals mint.
      period: 1, // Time step (period) in seconds per which the unlocking occurs.
      cliff: new Date().getTime()/100 + 90, // Vesting contract "cliff" timestamp in seconds.
      cliffAmount: new BN(10), // Amount unlocked at the "cliff" timestamp.
      amountPerPeriod: getBN(5, 9), // Release rate: how many tokens are unlocked per each period.
      canTopup: false, // setting to FALSE will effectively create a vesting contract.
      cancelableBySender: values.cancelableBySender, // Whether or not sender can cancel the stream.
      cancelableByRecipient: false, // Whether or not recipient can cancel the stream.
      transferableBySender: true, // Whether or not sender can transfer the stream.
      transferableByRecipient: false, // Whether or not recipient can transfer the stream.
      automaticWithdrawal: true, // Whether or not a 3rd party (e.g. cron job, "cranker") can initiate a token withdraw/transfer.
      withdrawalFrequency: 10, // Relevant when automatic withdrawal is enabled. If greater than 0 our withdrawor will take care of withdrawals. If equal to 0 our withdrawor will skip, but everyone else can initiate withdrawals.
      partner: null, //  (optional) Partner's wallet address (string | null).
      recipient: values.recipient,
      name: values.name,
    };
    onCreateStream(createStreamParams);
  }

  

  return (
    <Container maxWidth="lg">
      <Toolbar />
      <Box
        component="form"
        sx={{
          '& .MuiFormControl-root': { m: 1 },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <Typography variant='h4'>Create stream</Typography>
        </div>
        <div>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Token</InputLabel>
            <Select
              labelId="select-token-label"
              id="select-token"
              value={""}
              label="Token"
              onChange={handleSelectToken}
            >
              <MenuItem value={'sol'}>SOL</MenuItem>
              <MenuItem value={'strm'}>STRM</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <TextField
            required
            fullWidth
            value={values.name}
            id="outlined-required"
            label="Name"
            onChange={handleChangeValue('name')}
          />
          <TextField
            required
            fullWidth
            value={values.recipient}
            id="outlined-required"
            label="Recipient"
            placeholder={'Recipient address'}
            onChange={handleChangeValue('recipient')}
          />
        </div>
        <div>
          <FormGroup row>
            <TextField
              required
              value={values.depositedAmount}
              id="outlined-required"
              label="Amount"
              type="number"
              onChange={handleChangeValue('depositedAmount')}
            />
            <FormControlLabel
              control={
                <Switch value={values.cancelableBySender} onChange={handleToggleValue('cancelableBySender')}/>
              }
              label="Cancelable by sender"
              style={{ display: 'flex', alignItems: 'center' }}
            />
          </FormGroup>
        </div>
        <div>
          <FormControl>
            <Button onClick={handleOnCreateStream} variant="contained" disabled={response.status === StatusRequest.in_progress}>
              Create
            </Button>
          </FormControl>
        </div>
      </Box>
      <Box>
        {response.status === StatusRequest.error && (
          <Typography variant="body1" color="error">Somthing bad has happened! {response.error}</Typography>
        )}
        {response.status === StatusRequest.success && (
          <Typography variant="body1" color="success">Created successfully!</Typography>
        )}
      </Box>
    </Container>
  );
}


export default CreateStreamComponent;
