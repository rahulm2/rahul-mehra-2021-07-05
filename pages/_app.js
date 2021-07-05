/* eslint-disable react/react-in-jsx-scope */
import '../styles/globals.css';
import { Provider } from 'react-redux';
import { createReduxStore } from '../redux';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={createReduxStore()}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
