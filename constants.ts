
import { NeighborhoodData } from './types';

export const INFLATION_FACTOR_2026 = 1.24;

export const SOUTH_INDIA_LOCALITIES: NeighborhoodData[] = [
  // Bangalore - Tier 1 & 2
  { name: 'Whitefield', city: 'Bangalore', tier: 1, baseRate: 12500, isHighDemand: true, proximityToIT: 1.0 },
  { name: 'Sarjapur Road', city: 'Bangalore', tier: 1, baseRate: 11000, isHighDemand: true, proximityToIT: 0.9 },
  { name: 'Manyata Tech Park', city: 'Bangalore', tier: 1, baseRate: 10500, isHighDemand: true, proximityToIT: 1.0 },
  { name: 'Indiranagar', city: 'Bangalore', tier: 1, baseRate: 18000, isHighDemand: true, proximityToIT: 0.6 },
  { name: 'Electronic City', city: 'Bangalore', tier: 2, baseRate: 7500, isHighDemand: false, proximityToIT: 1.0 },

  // Hyderabad - Tier 1 & 2
  { name: 'Financial District', city: 'Hyderabad', tier: 1, baseRate: 13000, isHighDemand: true, proximityToIT: 1.0 },
  { name: 'Kokapet', city: 'Hyderabad', tier: 1, baseRate: 11500, isHighDemand: true, proximityToIT: 0.8 },
  { name: 'HITEC City', city: 'Hyderabad', tier: 1, baseRate: 12000, isHighDemand: true, proximityToIT: 1.0 },
  { name: 'Gachibowli', city: 'Hyderabad', tier: 1, baseRate: 10000, isHighDemand: true, proximityToIT: 0.9 },
  { name: 'Tellapur', city: 'Hyderabad', tier: 2, baseRate: 6800, isHighDemand: true, proximityToIT: 0.7 },

  // Chennai - Tier 1 & 2
  { name: 'OMR - IT Corridor', city: 'Chennai', tier: 1, baseRate: 9500, isHighDemand: true, proximityToIT: 1.0 },
  { name: 'ECR - Coastal', city: 'Chennai', tier: 1, baseRate: 14000, isHighDemand: true, proximityToIT: 0.5 },
  { name: 'Adyar', city: 'Chennai', tier: 1, baseRate: 16500, isHighDemand: true, proximityToIT: 0.4 },
  { name: 'Perungudi', city: 'Chennai', tier: 2, baseRate: 8200, isHighDemand: true, proximityToIT: 0.9 },

  // Kochi - Emerging
  { name: 'Kakkanad', city: 'Kochi', tier: 2, baseRate: 6500, isHighDemand: true, proximityToIT: 1.0 },
  { name: 'Marine Drive', city: 'Kochi', tier: 1, baseRate: 13500, isHighDemand: true, proximityToIT: 0.3 }
];
