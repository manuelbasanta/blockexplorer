import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import BlockData from './components/BlockData';
import Transactions from './components/Transactions';
import Root from './components/Root';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/:blockNumber?",
          element: <BlockData/>,
        },
        {
          path: "transactions/:blockNumber",
          element: <Transactions/>,
        },
      ],
    },
  ]);

  return (
    <RouterProvider router={router}/>
  );
}

export default App;
