import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const ESGIndividualDashboardPage = lazy(() => import('../presentation/pages/ESGIndividualDashboardPage'));
const CarbonFootprintTrackerPage = lazy(() => import('../presentation/pages/CarbonFootprintTrackerPage'));
const ESGPortfolioPage = lazy(() => import('../presentation/pages/ESGPortfolioPage'));
const GreenImpactPage = lazy(() => import('../presentation/pages/GreenImpactPage'));
const ESGLearningPage = lazy(() => import('../presentation/pages/ESGLearningPage'));
const ESGChallengesPage = lazy(() => import('../presentation/pages/ESGChallengesPage'));
const ESGCommunityPage = lazy(() => import('../presentation/pages/ESGCommunityPage'));
const ESGOpportunitiesPage = lazy(() => import('../presentation/pages/ESGOpportunitiesPage'));

export const esgIndividualRoutes: RouteObject[] = [
  { path: '/esg-individual', element: <ESGIndividualDashboardPage /> },
  { path: '/esg-individual/opportunities', element: <ESGOpportunitiesPage /> },
  { path: '/esg-individual/carbon', element: <CarbonFootprintTrackerPage /> },
  { path: '/esg-individual/portfolio', element: <ESGPortfolioPage /> },
  { path: '/esg-individual/impact', element: <GreenImpactPage /> },
  { path: '/esg-individual/learning', element: <ESGLearningPage /> },
  { path: '/esg-individual/challenges', element: <ESGChallengesPage /> },
  { path: '/esg-individual/community', element: <ESGCommunityPage /> },
];
