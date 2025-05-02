import { atom } from 'jotai';

interface NutritionFacts {
  calories: string;
  protein: string;
  carbs: string;
  fat: string;
  fiber: string;
  sugar: string;
  sodium: string;
  cholesterol: string;
}

interface MacronutrientDistribution {
  proteinPercentage: string;
  carbsPercentage: string;
  fatPercentage: string;
}

interface Micronutrient {
  name: string;
  amount: string;
  dailyValue: string;
}

interface SustainabilityInfo {
  carbonFootprint?: string;
  seasonality?: string;
}

interface FoodAnalysis {
  identifiedFood: string;
  foodCategory: string;
  healthScore: number;
  image: string;
  portionSize: string;
  recognizedServingSize: string;
  nutritionFacts: {
    perPortion: NutritionFacts;
    per100g: NutritionFacts;
    macronutrientDistribution: MacronutrientDistribution;
  };
  micronutrients: Micronutrient[];
  healthBenefits: string[];
  potentialConcerns: string[];
  preparationTips: string[];
  storageRecommendations: string[];
  sustainabilityInfo?: SustainabilityInfo;
  additionalNotes: string[];
}

export const analysisAtom = atom<FoodAnalysis | null>(null);