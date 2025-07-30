import { lazy, Suspense } from 'react';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router';
import setupStore from 'store/Store';
import { theme } from 'theme/Theme';
import LayoutDrawerAppBar from './layouts/LayoutDrawerAppBar';
import NxWelcome from './nx-welcome';

const store = setupStore();

console.log('themasdase', theme());

// Lazy components
const Login = lazy(() => import('login/Module'));
const ProtectedRoutes = lazy(() => import('login/ProtectedRoutes'));

const LoginWithStore = () => {
  return (
    <Suspense fallback={<div>Loading Login...</div>}>
      <Login store={store} />
    </Suspense>
  );
};

const routes = [
  {
    path: '*',
    element: <p>not found</p>,
  },
  {
    path: '/login/*',
    element: <LoginWithStore />,
  },
  {
    element: (
      <Suspense fallback={<div>Checking access...</div>}>
        <ProtectedRoutes store={store} />
      </Suspense>
    ),
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
              <Suspense fallback={<div>Loading myremote1...</div>}>
                <span role="img" aria-label="construction">
                  🚧
                </span>{' '}
                Payments{' '}
                <span role="img" aria-label="construction">
                  🚧
                </span>
              </Suspense>
            ),
          },
          {
            path: '/reports/*',
            element: (
              <Suspense fallback={<div>Loading myremote1...</div>}>
                <span role="img" aria-label="construction">
                  🚧
                </span>{' '}
                Reports{' '}
                <span role="img" aria-label="construction">
                  🚧
                </span>
              </Suspense>
            ),
          },
          {
            path: '/support/*',
            element: (
              <Suspense fallback={<div>Loading myremote1...</div>}>
                <span role="img" aria-label="construction">
                  🚧
                </span>{' '}
                Support{' '}
                <span role="img" aria-label="construction">
                  🚧
                </span>
              </Suspense>
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
