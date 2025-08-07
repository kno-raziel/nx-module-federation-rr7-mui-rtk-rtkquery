import WithAsyncSlice from 'store/WithAsyncSlice';
import Routes from './routes';
import { authSlice } from './store/slices/authSlice';

export function App() {
  return (
    <WithAsyncSlice slices={[authSlice]}>
      <Routes />
    </WithAsyncSlice>
  );
}

export default App;
