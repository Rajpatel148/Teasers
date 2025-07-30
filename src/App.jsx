import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Applayout from "./components/layout/Applayout";
import HomePage from "./pages/HomePage.jsx";
import DetailsPage from "./pages/DetailsPage.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Error from "./pages/Error.jsx";
import SearchResultPage from "./pages/SearchResultPage.jsx";
import { Analytics } from '@vercel/analytics/react';

function App() {

  const queryClient = new QueryClient();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Applayout />,
      errorElement:<Error />,
      children: [
        // Define child routes here
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/details",
          element: <DetailsPage />,
        },
        {
          path: "/category/:categoryID/:page",
          element: <CategoryPage />,
        },
        {
          path: "/search/:query/:page",
          element: <SearchResultPage />,
        }
      ],
    },
  ]);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
       <Analytics />
    </>
  );
}

export default App;
