import { GreenPoints } from '../../domain/greenPoints/GreenPoints';

export interface EarnPointsParams {
  userId: string;
  userType: string;
  points: number;
  activity: string;
  category: string;
  portal: string;
  platformSource?: string;
  metadata?: Record<string, any>;
}

export interface IGreenPointsPort {
  earnPoints(params: EarnPointsParams): Promise<GreenPoints>;
  getUserGreenPoints(userId: string): Promise<number>;
  getGreenPointsHistory(userId: string, limit?: number): Promise<GreenPoints[]>;
}
