import type { IGreenPointsPort, EarnPointsParams } from '../../infrastructure/ports/IGreenPointsPort';
import type { GreenPoints } from '../../domain/greenPoints/GreenPoints';

export class GreenPointsService {
  private greenPointsPort: IGreenPointsPort;

  constructor(greenPointsPort: IGreenPointsPort) {
    this.greenPointsPort = greenPointsPort;
  }

  async earnPoints(params: EarnPointsParams): Promise<GreenPoints> {
    // Business logic: validate, calculate, etc.
    if (params.points <= 0) {
      throw new Error('Points must be positive');
    }

    if (!params.userId) {
      throw new Error('User ID is required');
    }

    if (!params.activity || !params.category || !params.portal) {
      throw new Error('Activity, category, and portal are required');
    }

    return this.greenPointsPort.earnPoints(params);
  }

  async getUserGreenPoints(userId: string): Promise<number> {
    if (!userId) {
      throw new Error('User ID is required');
    }

    return this.greenPointsPort.getUserGreenPoints(userId);
  }

  async getGreenPointsHistory(userId: string, limit?: number): Promise<GreenPoints[]> {
    if (!userId) {
      throw new Error('User ID is required');
    }

    return this.greenPointsPort.getGreenPointsHistory(userId, limit);
  }
}
