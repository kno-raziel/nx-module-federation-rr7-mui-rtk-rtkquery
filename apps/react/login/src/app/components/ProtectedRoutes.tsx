import { Navigate, Outlet } from 'react-router';
import WithAsyncSlice from 'store/WithAsyncSlice';
import { useAppSelector } from '../store';
import { authSlice } from '../store/slices/authSlice';

const Guard = () => {
  const auth = useAppSelector((state) => state.auth);

  // Check if auth state is undefined, null, or logged is false
  if (!auth || !auth.logged) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the child routes
  return <Outlet />;
};

const ProtectedRoutes = () => {
  return (
    <WithAsyncSlice slices={[authSlice]}>
      <Guard />
    </WithAsyncSlice>
  );
};

export default ProtectedRoutes;
