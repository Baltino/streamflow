import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  
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
