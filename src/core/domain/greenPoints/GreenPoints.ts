export interface GreenPoints {
  id: string;
  userId: string;
  points: number;
  activity: string;
  category: string;
  portal: string;
  platformSource?: string;
  metadata?: Record<string, any>;
  createdAt: Date;
}

export const ActivityType = {
  PURCHASE: 'Purchase',
  INVESTMENT: 'Investment',
  REFERRAL: 'Referral',
  CONTRIBUTION: 'Contribution',
  ESG_PROJECT: 'ESG Project',
  CARBON_OFFSET: 'Carbon Offset',
} as const;

export type ActivityType = typeof ActivityType[keyof typeof ActivityType];

/*export enum ActivityType {
  PURCHASE = 'Purchase',
  INVESTMENT = 'Investment',
  REFERRAL = 'Referral',
  CONTRIBUTION = 'Contribution',
  ESG_PROJECT = 'ESG Project',
  CARBON_OFFSET = 'Carbon Offset',
}*/

export const Category = {
  PURCHASE: 'purchase',
  INVESTMENT: 'investment',
  REFERRAL: 'referral',
  CONTRIBUTION: 'contribution',
  ESG: 'esg',
  CARBON: 'carbon',
} as const;

export type Category = typeof Category[keyof typeof Category];

/*export enum Category {
  PURCHASE = 'purchase',
  INVESTMENT = 'investment',
  REFERRAL = 'referral',
  CONTRIBUTION = 'contribution',
  ESG = 'esg',
  CARBON = 'carbon',
}*/

export const Portal = {
  CONSUMER: 'consumer',
  INVESTOR: 'investor',
  NGUYENMANHTHUAN: 'nguyenmanhthuan',
  MEMBER: 'member',
  ESG_INDIVIDUAL: 'esg-individual',
  ESG_ENTERPRISE: 'esg-enterprise',
} as const;

export type Portal = typeof Portal[keyof typeof Portal];

/*export enum Portal {
  CONSUMER = 'consumer',
  INVESTOR = 'investor',
  NGUYENMANHTHUAN = 'nguyenmanhthuan',
  MEMBER = 'member',
  ESG_INDIVIDUAL = 'esg-individual',
  ESG_ENTERPRISE = 'esg-enterprise',
}*/
