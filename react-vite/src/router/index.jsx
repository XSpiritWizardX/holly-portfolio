import { createBrowserRouter } from 'react-router-dom';
import LandingPage from '../components/LandingPage/LandingPage';
import AboutPage from '../components/AboutPage/AboutPage';
import ServicesPage from '../components/ServicesPage/ServicesPage';
import PortfolioPage from '../components/PortfolioPage/PortfolioPage';
import ContactPage from '../components/ContactPage/ContactPage';
import GamePage from '../components/GamePage/GamePage';
import Layout from './Layout';
import ThreeJSGame from '../components/ThreeJsGame/ThreeJsGame';
import Platformer from '../components/Platformer/Platformer';
import ClickerGame from '../components/ClickerGame/ClickerGame';
import SkillMeter from '../components/SkillMeter/SkillMeter';
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
        path: "/skills",
        element: <SkillMeter />,
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
        path: "/maze-game",
        element: <GamePage />,
      },
      {
        path: "space-game",
        element: <ThreeJSGame />
      },
      {
        path: "platform-editor",
        element: <Platformer />
      },
      {
        path: "/clicker",
        element: <ClickerGame />
      },
      {
        path: "*",
        element: <h1>404 - Page Not Found</h1>,
      },
    ],
  },
]);
