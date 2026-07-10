import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Landing, Cocktail } from './pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
  },
  {
    path: 'cocktail/:id',
    element: <Cocktail />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
