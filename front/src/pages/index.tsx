import styles from '@/styles/Home.module.scss';
import Head from 'next/head';
import { LoginForm } from 'components/login-form/login';


export default function Home() {

  return (
    <>
      <Head>
        <title>Agrotech</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className={styles.main}>
        <LoginForm />

      </main>
    </>
  )
}
