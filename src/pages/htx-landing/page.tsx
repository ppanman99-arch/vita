import { useParams, Navigate } from 'react-router-dom';
import { getCooperativeById, getCooperativeBySubdomain } from '../../data/cooperatives';
import LandingPageTemplate from './components/LandingPageTemplate';

export default function HtxLandingPage() {
  const { coopId } = useParams<{ coopId: string }>();

  // Get cooperative by ID
  const cooperative = coopId ? getCooperativeById(coopId) : undefined;

  // If no cooperative found, redirect to home
  if (!cooperative) {
    return <Navigate to="/home" replace />;
  }

  return <LandingPageTemplate cooperative={cooperative} />;
}


