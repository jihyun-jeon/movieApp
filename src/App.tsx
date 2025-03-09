import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import Detail from '@/pages/Detail';
import NotFound from '@/pages/NotFound';
import Search from '@/pages/Search';
import Signup from '@/pages/Signup';
import Login from '@/pages/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: 'movie', element: <Home /> },
      { path: 'movie/:movieId', element: <Detail /> },
      { path: 'search', element: <Search /> },
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <Signup /> },
    ],
  },
  { path: '*', element: <NotFound /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
