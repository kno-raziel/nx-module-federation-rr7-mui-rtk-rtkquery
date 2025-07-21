import { Navigate, Outlet } from 'react-router';
import { createStore, LoginStore, useAppSelector } from '../store';

import { useMemo } from 'react';
import { Provider } from 'react-redux';
import { RootReducer } from '../store/slices';

const Guard = () => {
  const auth = useAppSelector((state) => state.auth);

  const state = useAppSelector((state) => state);

  console.log(state);
  console.log('ProtectedRoutes - auth', auth);

  // Check if auth state is undefined, null, or logged is false
  if (!auth || !auth.logged) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the child routes
  return <Outlet />;
};

interface AppProps {
  shellStore: LoginStore | undefined;
  shellRootReducer: RootReducer | undefined;
}

export function ProtectedRoutes({ shellStore, shellRootReducer }: AppProps) {
  const store = useMemo(
    () => createStore({ shellStore, shellRootReducer }),
    [shellStore, shellRootReducer]
  );

  return (
    <Provider store={store}>
      <Guard />
    </Provider>
  );
}

export default ProtectedRoutes;
