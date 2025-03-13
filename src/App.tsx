import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Detail from './pages/Detail';
import NotFound from './pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="/movie" replace /> },
      { path: 'movie', element: <Home /> },
      { path: 'movie/:movieId', element: <Detail /> },
    ],
  },
  { path: '*', element: <NotFound /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
