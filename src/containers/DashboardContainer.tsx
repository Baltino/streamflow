import { Cluster, StreamClient, StreamDirection, StreamType } from '@streamflow/stream';
import * as React from 'react';
import { useEffect, useState } from 'react';
import DashboardComponent from '../components/DashboardComponent';
import withStreamflow from '../hoc/StreamflowProvider';
import { StateResponse, StatusRequest } from '../types';
import { PhantomWallet } from '../wallets/phantom';

type Props = {
  streamClient: StreamClient;
  wallet: PhantomWallet;
}


const DashboardContainer = ({ streamClient, wallet }: Props) => {
  const [streamsResponse, setStreamsResponse] = useState<StateResponse>({ data: [], error: '', status: StatusRequest.initial })
  
  const handleGetStreams = async () => {
    setStreamsResponse((values: StateResponse) => ({
      ...values,
      error: '',
      status: StatusRequest.in_progress
    }))

    const streams = await streamClient.get({
      wallet: wallet.publicKey, // Wallet signing the transaction.
      type: StreamType.All, // (optional) Type, default is StreamType.All
      direction: StreamDirection.All, // (optional) Direction, default is StreamDirection.All)
    });
    if (streams) {
      setStreamsResponse({
        data: streams,
        error: '',
        status: StatusRequest.success
      });
    }else {
      setStreamsResponse({
        data: [],
        error: 'error',
        status: StatusRequest.error
      });
    }
  }
  useEffect(() => {
    handleGetStreams();
  }, []);

  return <DashboardComponent streamsResponse={streamsResponse} />
}

export default withStreamflow(DashboardContainer);
