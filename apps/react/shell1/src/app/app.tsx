import { lazy, Suspense, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';
import LayoutNavigation from './layouts/LayoutNavigation';
import NxWelcome from './nx-welcome';
import { theme } from 'theme/Theme';
import { Provider } from 'react-redux';
import { store } from './store';
import { rootReducer } from './store/slices';
import { testSlice } from './store/slices/testSlice';
import LayoutDrawerAppBar from './layouts/LayoutDrawerAppBar';

console.log('themasdase', theme());

// Lazy components
const Login = lazy(() => import('login/Module'));
const ProtectedRoutes = lazy(() => import('login/ProtectedRoutes'));

const LoginWithStore = () => {
  useEffect(() => {
    rootReducer.inject({
      reducerPath: 'laslasa',
      reducer: testSlice.reducer,
    });
  }, []);

  return (
    <Suspense fallback={<div>Loading Login...</div>}>
      <Login shellStore={store as any} shellRootReducer={rootReducer as any} />
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
        <ProtectedRoutes
          shellStore={store as any}
          shellRootReducer={rootReducer as any}
        />
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
            path: '/myremote1/*',
            element: (
              <Suspense fallback={<div>Loading myremote1...</div>}>
                {/* <Myremote1 basename="/myremote1" /> */}
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
