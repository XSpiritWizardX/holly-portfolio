import { createBrowserRouter } from 'react-router-dom';
import LandingPage from '../components/LandingPage/LandingPage';
import AboutPage from '../components/AboutPage/AboutPage';
import ServicesPage from '../components/ServicesPage/ServicesPage';
import PortfolioPage from '../components/PortfolioPage/PortfolioPage';
import ContactPage from '../components/ContactPage/ContactPage';
import GamePage from '../components/GamePage/GamePage';
import Layout from './Layout';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/services",
        element: <ServicesPage />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
      {
        path: "/portfolio",
        element: <PortfolioPage />,
      },
      {
        path: "/games",
        element: <GamePage />,
      },
      {
        path: "*",
        element: <h1>404 - Page Not Found</h1>,
      },
    ],
  },
]);
