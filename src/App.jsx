import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import LanguageLearningPage from './pages/LanguageLearningPage';

// Create a new QueryClient instance
const queryClient = new QueryClient();

// Create a router with language-learning as the default page
const router = createBrowserRouter([
  {
    path: '/',
    element: <LanguageLearningPage />,
  },
  {
    path: '/home',
    element: <HomePage />,
  },
  {
    path: '/about',
    element: <AboutPage />,
  },
  {
    path: '/language-learning',
    element: <LanguageLearningPage />,
  },
]);

console.log('Router initialized with routes:', router);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} fallbackElement={<div>Loading...</div>} />
    </QueryClientProvider>
  );
}

export default App;
