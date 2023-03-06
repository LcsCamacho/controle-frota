import '@/styles/globals.scss'
import { store, persistor } from 'features/redux/store';
import type { AppProps } from 'next/app'
import { Provider, useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider } from 'react-query'
import React from 'react';


export default function App({ Component, pageProps }: AppProps) {


  return (
    <React.Suspense fallback={<h1>Loading...</h1>}>
      <QueryClientProvider client={new QueryClient()}>
        <Provider store={store}>
          <PersistGate loading={<><h1>Loading...</h1></>} persistor={persistor}>
            <Component {...pageProps} />
          </PersistGate>
        </Provider>
      </QueryClientProvider>
    </React.Suspense>
  )
}
