import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { PersistGate } from 'redux-persist/integration/react';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router';

import App from './app';
import { store,persistor } from './app/store';
import { routesSection } from './routes/sections';
import { ErrorBoundary } from './routes/components';


// ----------------------------------------------------------------------

const router = createBrowserRouter([
  {
    Component: () => (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
              <App>
                <Outlet />
              </App>
        </PersistGate>
      </Provider>
    ),
    errorElement: <ErrorBoundary />,
    children: routesSection,
  },
]);

const root = createRoot(document.getElementById('root')!);

root.render(
  // <StrictMode>
  <RouterProvider router={router} />
  // </StrictMode>
);
