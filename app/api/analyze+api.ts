import { GoogleGenerativeAI } from '@google/generative-ai';

const genAi = new GoogleGenerativeAI(process.env.EXPO_PUBLIC_GEMINI_API_KEY as string);

export async function POST(req: Request): Promise<Response> {
  try {
    const { image } = await req.json();

    const model = genAi.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = `Analyze this food image and provide comprehensive nutritional information in the following JSON format:
{
  "foodAnalysis": {
    "identifiedFood": "Name and detailed description",
    "foodCategory": "Main food category (e.g., Fruits, Dairy, Grains)",
    "healthScore": 0-100, // Nutritional quality score
    "portionSize": "Estimated portion size in grams",
    "recognizedServingSize": "Standard serving size in grams",
    "nutritionFacts": {
      "perPortion": {
        "calories": "Estimated calories",
        "protein": "Protein in grams",
        "carbs": "Carbs in grams",
        "fat": "Fat in grams",
        "fiber": "Fiber in grams",
        "sugar": "Sugar in grams",
        "sodium": "Sodium in mg",
        "cholesterol": "Cholesterol in mg"
      },
      "per100g": {
        "calories": "Calories per 100g",
        "protein": "Protein per 100g",
        "carbs": "Carbs per 100g",
        "fat": "Fat per 100g",
        "fiber": "Fiber per 100g",
        "sugar": "Sugar per 100g",
        "sodium": "Sodium per 100g",
        "cholesterol": "Cholesterol per 100g"
      },
      "macronutrientDistribution": {
        "proteinPercentage": "Percentage of calories from protein",
        "carbsPercentage": "Percentage of calories from carbs",
        "fatPercentage": "Percentage of calories from fat"
      }
    },
    "micronutrients": [
      {
        "name": "Vitamin A",
        "amount": "Amount",
        "dailyValue": "Percentage of daily value"
      }
    ],
    "healthBenefits": [
      "Key health benefits of this food"
    ],
    "potentialConcerns": [
      "Any dietary concerns or allergens"
    ],
    "preparationTips": [
      "Best ways to prepare for maximum nutrition"
    ],
    "storageRecommendations": [
      "How to properly store this food"
    ],
    "sustainabilityInfo": {
      "carbonFootprint": "Estimated CO2 per serving",
      "seasonality": "When this food is in season"
    }
  }
}

Additional instructions:
1. Provide realistic estimates based on scientific nutritional databases
2. Include at least 3 micronutrients when available
3. Give specific, actionable health advice
4. Format all numbers without units in the JSON (e.g., 25 not 25g)
5. Never return markdown formatting, only pure JSON
6. For ice cream do not include parfait.
`;


    const result = await model.generateContent([prompt, image]);
    const response =  result.response;
    const text = response.text();

    // Clean up the response text to remove any markdown formatting
    const cleanedText = text.replace(/```json\n?|\n?```/g, '').trim();

    // Parse the response text as JSON to validate the format
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(cleanedText);
    } catch (error) {
      console.error('Failed to parse Gemini response as JSON:', error);
      throw new Error('Invalid response format from Gemini');
    }

    return Response.json({
      success: true,
      data: parsedResponse,
    });
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Failed to generate content' }, { status: 500 });
  }
}
