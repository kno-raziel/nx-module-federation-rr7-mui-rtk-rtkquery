import { lazy } from 'react';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router';
import { storeManager } from 'store/Store';
import { theme } from 'theme/Theme';
import RemoteModuleErrorBoundary from './components/RemoteModuleErrorBoundary';
import RouteErrorBoundary from './components/RouteErrorBoundary';
import SuspenseWithSkeleton from './components/SuspenseWithSkeleton';
import LayoutDrawerAppBar from './layouts/LayoutDrawerAppBar';
import { ThemeProvider } from '@mui/material';

const store = storeManager.initializeStore();
const customTheme = theme();

// Lazy components
const Login = lazy(() => import('login/Module'));
const ProtectedRoutes = lazy(() => import('login/ProtectedRoutes'));
const Products = lazy(() => import('products/Module'));

const routes: RouteObject[] = [
  {
    path: '*',
    element: <p>not found</p>,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: '/login/*',
    element: (
      <SuspenseWithSkeleton>
        <Login />
      </SuspenseWithSkeleton>
    ),
    errorElement: <RemoteModuleErrorBoundary />,
  },
  {
    element: (
      <SuspenseWithSkeleton>
        <ProtectedRoutes />
      </SuspenseWithSkeleton>
    ),
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        element: <LayoutDrawerAppBar />,
        children: [
          {
            index: true,
            element: (
              <SuspenseWithSkeleton>
                <Products />
              </SuspenseWithSkeleton>
            ),
          },

          {
            path: '/payments/*',
            element: (
              <SuspenseWithSkeleton>
                <span role="img" aria-label="construction">
                  🚧
                </span>{' '}
                Payments{' '}
                <span role="img" aria-label="construction">
                  🚧
                </span>
              </SuspenseWithSkeleton>
            ),
          },
          {
            path: '/reports/*',
            element: (
              <SuspenseWithSkeleton>
                <span role="img" aria-label="construction">
                  🚧
                </span>{' '}
                Reports{' '}
                <span role="img" aria-label="construction">
                  🚧
                </span>
              </SuspenseWithSkeleton>
            ),
          },
          {
            path: '/support/*',
            element: (
              <SuspenseWithSkeleton>
                <span role="img" aria-label="construction">
                  🚧
                </span>{' '}
                Support{' '}
                <span role="img" aria-label="construction">
                  🚧
                </span>
              </SuspenseWithSkeleton>
            ),
          },
          {
            path: '*',
            element: <p>not found</p>,
          },
        ],
      },
    ],
  },
];

const router = createBrowserRouter(routes, {});

export function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={customTheme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
