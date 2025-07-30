import { Store } from '@reduxjs/toolkit';
import WithAsyncSlice from 'store/WithAsyncSlice';
import Routes from './routes';
import { authSlice } from './store/slices/authSlice';

interface AppProps {
  store: Store;
}

export function App({ store }: AppProps) {
  return (
    <WithAsyncSlice store={store} slice={authSlice}>
      <Routes />
    </WithAsyncSlice>
  );
}

export default App;
