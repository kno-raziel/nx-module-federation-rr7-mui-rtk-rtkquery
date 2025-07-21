import { useMemo } from 'react';
import { Provider } from 'react-redux';
import Routes from './routes';
import { LoginStore, createStore } from './store';
import { RootReducer } from './store/slices';

interface AppProps {
  shellStore: LoginStore | undefined;
  shellRootReducer: RootReducer | undefined;
}

export function App({ shellStore, shellRootReducer }: AppProps) {
  console.log('shellStore', shellStore?.getState());

  const store = useMemo(
    () => createStore({ shellStore, shellRootReducer }),
    [shellStore, shellRootReducer]
  );

  console.log('store', store?.getState());

  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

export default App;
