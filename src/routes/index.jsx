import React from 'react';
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';
import NotFoundPage from '../pages/NotFoundPage';
import LanguageLearningPage from '../pages/LanguageLearningPage';

console.log('Loading routes configuration');

const routes = [
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
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

export default routes;
