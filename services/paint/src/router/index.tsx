import { createBrowserRouter, redirect } from 'react-router-dom';
import App from '@/App';

export const router = createBrowserRouter([
  {
    path: '/',
    index: false,
    element: <App />,
    children: [
      {
        path: '/',
        index: true,
        loader: () => redirect('/f' + (+new Date()).toString(16)),
      },
      {
        path: '/:id',
        index: true,
      },
    ],
  },
]);
