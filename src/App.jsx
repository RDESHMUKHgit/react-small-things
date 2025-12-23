import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import Portfolio from './Pages/Portfolio';
import Contact, { contactAction } from './Pages/Contact';
import NotFound from './Pages/NotFound';
import Loader from './Pages/Loader';
import { useEffect, useState } from 'react';
import Movies from './Pages/Movies';
import MovieDetail from './Pages/MovieDetail';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <NotFound />,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/about/portfolio',
    element: <Portfolio />,
  },
  {
    path: '/movies',
    element: <Movies />,
  },
  {
    path: '/movies/:imdbID',
    element: <MovieDetail />,
  },
  {
    path: '/contact',
    element: <Contact />,
    action: contactAction,
  },
]);

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return <RouterProvider router={router} />;
}
