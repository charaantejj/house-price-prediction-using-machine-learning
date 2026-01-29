
export interface HouseInputs {
  sqft: number;
  bhk: number;
  bathrooms: number;
  neighborhood: string;
}

export interface LifestyleScores {
  connectivity: number;
  education: number;
  workLife: number;
  overall: number;
}

export interface PredictionResult {
  estimatedPrice: number;
  confidenceScore: number;
  pricePerSqft: number;
  marketTrend: 'up' | 'stable' | 'down';
  comparables: ComparableProperty[];
  lifestyle: LifestyleScores;
  localityTier: 1 | 2 | 3;
}

export interface ComparableProperty {
  id: string;
  title: string;
  location: string;
  price: number;
  sqft: number;
  beds: number;
  baths: number;
  imageUrl: string;
  matchScore: number;
  amenities?: string[];
}

export interface NeighborhoodData {
  name: string;
  city: string;
  tier: 1 | 2 | 3;
  baseRate: number; // Projected 2026 Base Rate
  isHighDemand: boolean;
  proximityToIT: number; // 0 to 1
}
