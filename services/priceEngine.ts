
import { HouseInputs, PredictionResult, ComparableProperty, LifestyleScores } from '../types';
import { SOUTH_INDIA_LOCALITIES, INFLATION_FACTOR_2026 } from '../constants';

// High-resolution, distinct luxury architecture images to prevent 'cloning' appearance
const PROPERTY_IMAGE_IDS = [
  "1600585154340-be6161a56a0c", // Modern white villa
  "1512917774080-9991f1c4c750", // High-end terrace
  "1600607687940-4e2a09695d51", // Luxury night house
  "1600047509807-ba8f99d2cdde", // Wood/Glass structure
  "1600596542815-ffad4c1539a9", // Contemporary pool house
  "1480074568708-e7b720bb3f09", // Minimalist white house
  "1600566753376-12c8ab7fb75b", // Modern architecture geometry
  "1564013799919-ab600027ffc6", // Waterfront luxury mansion
  "1600210492486-724fe5c67fb0", // Interior/Exterior blended view
  "1600573472591-ee6b68d14c68", // Large estate mansion
  "1605276374104-dee2a0ed3cd6", // Modern suburban villa
  "1416331108676-a22ccb276e35"  // Contemporary multi-level
];

const AMENITIES_POOL = [
  "SMART HOME TECH", "EV CHARGING", "GYM & YOGA STUDIO", 
  "CLOSE TO METRO", "PRIVATE GARDEN", "GATED SECURITY",
  "ROOFTOP INFINITY POOL", "MARBLE FLOORING", "DESIGNER KITCHEN", 
  "HOME CINEMA"
];

export const predictHousePrice = async (inputs: HouseInputs): Promise<PredictionResult> => {
  // Artificial delay for premium feel
  await new Promise(resolve => setTimeout(resolve, 2000));

  const locality = SOUTH_INDIA_LOCALITIES.find(l => l.name === inputs.neighborhood) || SOUTH_INDIA_LOCALITIES[0];
  
  const tierMultiplier = locality.tier === 1 ? 1.15 : locality.tier === 2 ? 1.0 : 0.85;
  const bhkPremium = 1 + (inputs.bhk * 0.12);
  const bathPremium = 1 + (inputs.bathrooms * 0.08);
  
  const basePricePerSqft = (locality.baseRate * INFLATION_FACTOR_2026 * tierMultiplier);
  const estimatedPrice = inputs.sqft * basePricePerSqft * bhkPremium * bathPremium;
  
  const lifestyle: LifestyleScores = {
    connectivity: Math.round(70 + Math.random() * 25),
    education: Math.round(60 + Math.random() * 35),
    workLife: Math.round(locality.proximityToIT * 100),
    overall: 0
  };
  lifestyle.overall = Math.round((lifestyle.connectivity + lifestyle.education + lifestyle.workLife) / 3);

  // Generate 12 unique comparables with reliable and distinct images
  const comparables: ComparableProperty[] = Array.from({ length: 12 }).map((_, i) => {
    // Add significant variance to prices and sizes to ensure they feel like different listings
    const variance = 0.82 + (Math.random() * 0.36); 
    const sizeVariance = inputs.sqft * (0.8 + Math.random() * 0.4);
    
    // Pick 2-4 unique random amenities
    const shuffledAmenities = [...AMENITIES_POOL].sort(() => 0.5 - Math.random());
    const propertyAmenities = shuffledAmenities.slice(0, Math.floor(Math.random() * 3) + 2);

    return {
      id: `prop-${i}-${locality.name}-${Math.random().toString(36).substr(2, 9)}`,
      title: `${['Azure', 'Summit', 'Haven', 'Pine', 'Crystal', 'Orchid', 'Zenith', 'Heritage', 'Aura', 'Serene'][i % 10]} ${['Residency', 'Gardens', 'Villas', 'Estates', 'Courts', 'Terraces'][i % 6]}`,
      location: locality.name,
      price: estimatedPrice * variance,
      sqft: Math.round(sizeVariance),
      beds: Math.max(1, inputs.bhk + (i % 2 === 0 ? 0 : (Math.random() > 0.5 ? 1 : -1))),
      baths: Math.max(1, inputs.bathrooms + (i % 3 === 0 ? 0 : 1)),
      // Use unique IDs from our curated list
      imageUrl: `https://images.unsplash.com/photo-${PROPERTY_IMAGE_IDS[i % PROPERTY_IMAGE_IDS.length]}?auto=format&fit=crop&w=1200&q=80`,
      matchScore: Math.round(82 + Math.random() * 17),
      amenities: propertyAmenities
    };
  });

  return {
    estimatedPrice,
    confidenceScore: 0.92 + (Math.random() * 0.05),
    pricePerSqft: estimatedPrice / inputs.sqft,
    marketTrend: locality.tier === 1 ? 'up' : 'stable',
    comparables,
    lifestyle,
    localityTier: locality.tier
  };
};
