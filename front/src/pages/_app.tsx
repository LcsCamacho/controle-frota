import '@/styles/globals.scss'
import { store, persistor } from 'features/redux/store';
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';


export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={<><h1>Loading...</h1></>} persistor={persistor}>
      <Component {...pageProps} />
      </PersistGate>
    </Provider>
  )
}
