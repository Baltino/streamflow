import { Wallet } from "@project-serum/anchor";
import { Keypair, PublicKey, Transaction } from "@solana/web3.js";

declare global {
  interface Window {
    solana: any
  }
}

type DisplayEncoding = "utf8" | "hex";
type PhantomEvent = "disconnect" | "connect" | "accountChanged";
type PhantomRequestMethod =
  | "connect"
  | "disconnect"
  | "signTransaction"
  | "signAllTransactions"
  | "signMessage";

interface ConnectOpts {
  onlyIfTrusted: boolean;
}

interface PhantomProvider {
  publicKey: PublicKey;
  isConnected: boolean | null;
  signTransaction: (transaction: Transaction) => Promise<Transaction>;
  signAllTransactions: (transactions: Transaction[]) => Promise<Transaction[]>;
  // connect: () => Promise<{ publicKey: PublicKey } | null>;
  disconnect: () => Promise<void>;
  
  signMessage: (
    message: Uint8Array | string,
    display?: DisplayEncoding
  ) => Promise<any>;
  on: (event: PhantomEvent, handler: (args: any) => void) => void;
  request: (method: PhantomRequestMethod, params: any) => Promise<unknown>;
  
}

export default class PhantomWalletFactory {

  static async createPhantomWallet() {
    if (!window.solana || !window.solana.isPhantom) {
      throw new Error('Plugin is not installed');
    }
    
    const response = await window.solana.connect();
    console.log("response", response)
    return new PhantomWallet(response.publicKey)
  }
}

export class PhantomWallet implements PhantomProvider {

  
  publicKey: PublicKey;
  isConnected: boolean;

  constructor(publicKey: PublicKey) {
    this.publicKey = publicKey;
    this.isConnected = true;
  }
  
  async disconnect() {
    // @ts-ignore
    const { solana } = window;
    
    await (solana as PhantomProvider).disconnect();
    this.isConnected = false;
  }

  async signTransaction(tx: Transaction): Promise<Transaction> {
    const response = await window.solana.signTransaction(tx);
    console.log("signed transaction", response)
    return response;
  }
  async signAllTransactions(txs: Transaction[]): Promise<Transaction[]> {
    const response = await window.solana.signAllTransactions(txs);
    return response;
  }

  async signMessage(
    message: Uint8Array | string,
    display?: DisplayEncoding
  ) {
    console.log("sign message", message, display);
  }
  on(event: PhantomEvent, handler: (args: any) => void) {
    console.log("event", event);
  }
  async request(method: PhantomRequestMethod, params: any){
    console.log("request", method)
  }
  
}
