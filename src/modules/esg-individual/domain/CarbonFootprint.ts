/** Domain types for personal carbon footprint (cá nhân). */

export type ActivityCategory =
  | 'transport'
  | 'energy'
  | 'diet'
  | 'shopping'
  | 'waste'
  | 'other';

export interface FootprintActivity {
  id: string;
  category: ActivityCategory;
  label: string;
  quantity: number;
  unit: string; // km, kWh, meal, etc.
  emissionFactor: number; // kg CO2 per unit
  co2Kg: number;
  date: string;
  createdAt: string;
}

export interface PersonalCarbonFootprint {
  userId: string;
  period: string; // e.g. "2025-01"
  totalCo2Kg: number;
  byCategory: Record<ActivityCategory, number>;
  activities: FootprintActivity[];
  trend: 'up' | 'down' | 'stable';
  previousPeriodCo2Kg?: number;
}

/** Emission factors (kg CO2 per unit) - Vietnam estimates. */
export const EMISSION_FACTORS: Record<string, number> = {
  motorbike_km: 0.08,
  car_km: 0.21,
  bus_km: 0.09,
  electricity_kwh: 0.5,
  meal_regular: 2.5,
  meal_vegetarian: 0.8,
};
