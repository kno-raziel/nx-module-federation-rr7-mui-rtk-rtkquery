import { useRoutes } from 'react-router';
import Login from '../components/Login';
import ForgotPassword from '../components/ForgotPassword';

const Routes = () => {
  const element = useRoutes([
    {
      index: true,
      element: <Login />,
    },
    {
      path: 'forgot-password',
      element: <ForgotPassword />,
    },
    { path: '*', element: <p>not found under /login path </p> },
  ]);

  return element;
};

export default Routes;
