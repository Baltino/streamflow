import { Cluster, StreamClient } from '@streamflow/stream';
import React, { ReactComponentElement, useEffect } from 'react';
import PhantomWalletFactory, { PhantomWallet } from '../wallets/phantom';

interface Props {
  children?: React.ReactNode;
  streamClient: StreamClient;
  wallet: PhantomWallet;
}

type State = {
  streamClient: StreamClient | null,
  wallet: PhantomWallet | null
}

const withStreamflow = (WrappedComponent: React.FunctionComponent<Props>) => {
  return class StreamFlowHOC extends React.Component {

    state: State;

    constructor(props: any) {
      super(props);
      this.state = { streamClient: null, wallet: null }
    }

    async componentDidMount() {
      const streamClient = new StreamClient(
        "https://api.devnet.solana.com", //https://streamfl-streamfl-1cdd.devnet.rpcpool.com
        Cluster.Devnet,
        "confirmed"
      )
      const phantomWallet = await PhantomWalletFactory.createPhantomWallet();
      if (phantomWallet.isConnected) {
        this.setState({ streamClient: streamClient, wallet: phantomWallet })
      }
    }

    render() {
      const { wallet, streamClient } = this.state;

      return !wallet || !streamClient ? (<p>Please login to Phantom Wallet</p>)
      : (
        <WrappedComponent streamClient={streamClient} wallet={wallet} {...this.props} />
      )
    }
  }
};

export default withStreamflow;
