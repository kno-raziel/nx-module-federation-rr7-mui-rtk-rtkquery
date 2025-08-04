import { lazy } from 'react';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router';
import setupStore from 'store/Store';
import { theme } from 'theme/Theme';
import RemoteModuleErrorBoundary from './components/RemoteModuleErrorBoundary';
import RouteErrorBoundary from './components/RouteErrorBoundary';
import SuspenseWithSkeleton from './components/SuspenseWithSkeleton';
import LayoutDrawerAppBar from './layouts/LayoutDrawerAppBar';
import NxWelcome from './nx-welcome';

const store = setupStore();

console.log('themasdase', theme());

// Lazy components
const Login = lazy(() => import('login/Module'));
const ProtectedRoutes = lazy(() => import('login/ProtectedRoutes'));

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
        <Login store={store} />
      </SuspenseWithSkeleton>
    ),
    errorElement: <RemoteModuleErrorBoundary />,
  },
  {
    element: (
      <SuspenseWithSkeleton>
        <ProtectedRoutes store={store} />
      </SuspenseWithSkeleton>
    ),
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        element: <LayoutDrawerAppBar />,
        children: [
          {
            index: true,
            element: <NxWelcome title="shell" />,
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
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
