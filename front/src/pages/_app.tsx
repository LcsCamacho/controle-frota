import '@/styles/globals.scss'
import { store } from 'features/redux/store';
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux';


export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}
