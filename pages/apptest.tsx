import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {
  StreamClient,
  Stream,
  CreateParams,
  CreateMultiParams,
  WithdrawParams,
  TransferParams,
  TopupParams,
  CancelParams,
  GetAllParams,
  StreamDirection,
  StreamType,
  Cluster,
  TxResponse,
  CreateResponse,
  BN,
  getBN,
  getNumberFromBN,
} from "@streamflow/stream";
import { useEffect } from 'react';
import PhantomWalletFactory from '../src/wallets/phantom';
import { Keypair } from '@solana/web3.js';
import { generateKeyPair, generateKeyPairSync } from 'crypto';
import { web3 } from '@project-serum/anchor';

export default function Home() {
  
  const streamClient = new StreamClient(
    "https://api.devnet.solana.com", //https://streamfl-streamfl-1cdd.devnet.rpcpool.com
    Cluster.Devnet,
    "confirmed"
  )

  
  const handleCreateStream = async () => {
    const phantomWallet = await PhantomWalletFactory.createPhantomWallet();

    console.log("phantomWallet", phantomWallet.publicKey?.toBase58())
    try {
      const streams = await streamClient.get({
        wallet: phantomWallet.publicKey, // Wallet signing the transaction.
        type: StreamType.All, // (optional) Type, default is StreamType.All
        direction: StreamDirection.All, // (optional) Direction, default is StreamDirection.All)
      });

      const createStreamParams: CreateParams = {
        sender:  phantomWallet, // Wallet/Keypair signing the transaction, creating and sending the stream.
        recipient: "A3gWSs3vB6T1hwbEP5ENJgnydBJzH3TL1QjPWASYkDbK", // Solana recipient address.
        mint: "HaWnUM4z1Y3HMZ7BbQhnY3DGMLE8dZeBnLJUCKxf1fcT", // SPL Token mint.
        start: 16678666924, // Timestamp (in seconds) when the stream/token vesting starts.
        depositedAmount: getBN(100, 9), // depositing 100 tokens with 9 decimals mint.
        period: 1, // Time step (period) in seconds per which the unlocking occurs.
        cliff: 16678669124, // Vesting contract "cliff" timestamp in seconds.
        cliffAmount: new BN(10), // Amount unlocked at the "cliff" timestamp.
        amountPerPeriod: getBN(5, 9), // Release rate: how many tokens are unlocked per each period.
        name: "Transfer to Jane Doe.", // The stream name or subject.
        canTopup: false, // setting to FALSE will effectively create a vesting contract.
        cancelableBySender: true, // Whether or not sender can cancel the stream.
        cancelableByRecipient: false, // Whether or not recipient can cancel the stream.
        transferableBySender: true, // Whether or not sender can transfer the stream.
        transferableByRecipient: false, // Whether or not recipient can transfer the stream.
        automaticWithdrawal: true, // Whether or not a 3rd party (e.g. cron job, "cranker") can initiate a token withdraw/transfer.
        withdrawalFrequency: 10, // Relevant when automatic withdrawal is enabled. If greater than 0 our withdrawor will take care of withdrawals. If equal to 0 our withdrawor will skip, but everyone else can initiate withdrawals.
        partner: null, //  (optional) Partner's wallet address (string | null).
      };
    

      console.log("streams", streams)
      const response = await streamClient.create({
        ...createStreamParams,
      })
      console.log(response)
    } catch(e) {
      console.error(e);
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Streamflow test</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Streamflow test app!
        </h1>

        <p className={styles.description}>
          Get started by loging with phantom plugin
        </p>
        <button onClick={handleCreateStream}>
          Phantom
        </button>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://github.com/streamflow-finance/js-sdk"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by
          <code style={{ marginLeft: 3 }}>@streamflow/stream</code>
        </a>
      </footer>
    </div>
  )
}