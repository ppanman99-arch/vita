import type {
  PersonalCarbonFootprint,
  FootprintActivity,
  ActivityCategory,
} from '../domain/CarbonFootprint';
import { EMISSION_FACTORS } from '../domain/CarbonFootprint';

const DEMO_USER = 'demo-user';
const STORAGE_KEY = 'esg_individual_footprint_activities';

function getUserId(): string {
  if (typeof window === 'undefined') return DEMO_USER;
  return sessionStorage.getItem('user_id') || localStorage.getItem('user_id') || DEMO_USER;
}

function loadActivities(userId: string): FootprintActivity[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    const byUser = parsed[userId];
    return Array.isArray(byUser) ? byUser : [];
  } catch {
    return [];
  }
}

function saveActivities(userId: string, activities: FootprintActivity[]): void {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    parsed[userId] = activities;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
  } catch {
    // ignore
  }
}

export interface AddActivityInput {
  category: ActivityCategory;
  label: string;
  quantity: number;
  unit: string;
  emissionFactor?: number;
  date?: string;
}

export class CarbonFootprintService {
  getFootprint(userId?: string, period?: string): Promise<PersonalCarbonFootprint> {
    const uid = userId || getUserId();
    const activities = loadActivities(uid);

    const now = new Date();
    const periodStr = period || `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    const [y, m] = periodStr.split('-').map(Number);
    const periodStart = new Date(y, m - 1, 1).getTime();
    const periodEnd = new Date(y, m, 0, 23, 59, 59).getTime();

    const inPeriod = activities.filter((a) => {
      const t = new Date(a.date).getTime();
      return t >= periodStart && t <= periodEnd;
    });

    const totalCo2Kg = inPeriod.reduce((s, a) => s + a.co2Kg, 0);
    const byCategory: Record<ActivityCategory, number> = {
      transport: 0,
      energy: 0,
      diet: 0,
      shopping: 0,
      waste: 0,
      other: 0,
    };
    inPeriod.forEach((a) => {
      byCategory[a.category] = (byCategory[a.category] || 0) + a.co2Kg;
    });

    const prevMonth = m === 1 ? 12 : m - 1;
    const prevYear = m === 1 ? y - 1 : y;
    const prevPeriod = `${prevYear}-${String(prevMonth).padStart(2, '0')}`;
    const prevActivities = activities.filter((a) => {
      const d = new Date(a.date);
      return d.getFullYear() === prevYear && d.getMonth() + 1 === prevMonth;
    });
    const previousPeriodCo2Kg = prevActivities.reduce((s, a) => s + a.co2Kg, 0);

    let trend: 'up' | 'down' | 'stable' = 'stable';
    if (previousPeriodCo2Kg > 0) {
      const diff = (totalCo2Kg - previousPeriodCo2Kg) / previousPeriodCo2Kg;
      if (diff > 0.05) trend = 'up';
      else if (diff < -0.05) trend = 'down';
    }

    return Promise.resolve({
      userId: uid,
      period: periodStr,
      totalCo2Kg,
      byCategory,
      activities: inPeriod,
      trend,
      previousPeriodCo2Kg: previousPeriodCo2Kg || undefined,
    });
  }

  addActivity(input: AddActivityInput, userId?: string): Promise<FootprintActivity> {
    const uid = userId || getUserId();
    const factor = input.emissionFactor ?? this.getDefaultFactor(input.category, input.unit);
    const co2Kg = input.quantity * factor;
    const date = input.date || new Date().toISOString().slice(0, 10);
    const activity: FootprintActivity = {
      id: `act-${Date.now()}`,
      category: input.category,
      label: input.label,
      quantity: input.quantity,
      unit: input.unit,
      emissionFactor: factor,
      co2Kg,
      date,
      createdAt: new Date().toISOString(),
    };
    const activities = loadActivities(uid);
    activities.push(activity);
    saveActivities(uid, activities);
    return Promise.resolve(activity);
  }

  private getDefaultFactor(category: ActivityCategory, unit: string): number {
    if (category === 'transport' && unit === 'km') return EMISSION_FACTORS.motorbike_km ?? 0.08;
    if (category === 'energy' && unit === 'kWh') return EMISSION_FACTORS.electricity_kwh ?? 0.5;
    if (category === 'diet' && unit === 'meal') return EMISSION_FACTORS.meal_regular ?? 2.5;
    return 0.5;
  }

  getOffsetSuggestions(co2Kg: number): { trees: number; pointsToRedeem: number; text: string } {
    const trees = Math.ceil(co2Kg / 20);
    const pointsToRedeem = Math.ceil(co2Kg * 2);
    return {
      trees,
      pointsToRedeem,
      text: `Đổi ${pointsToRedeem} điểm để trồng ~${trees} cây hoặc mua tín chỉ carbon.`,
    };
  }
}

export const carbonFootprintService = new CarbonFootprintService();
