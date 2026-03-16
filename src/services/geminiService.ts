import { GoogleGenAI, Type } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY || "";
const ai = new GoogleGenAI({ apiKey });

export const analyzeFoodWasteImpact = async (foodType: string, quantity: string) => {
  const model = "gemini-3-flash-preview";
  const prompt = `Analyze the impact of wasting ${quantity} of ${foodType}. 
  Provide:
  1. Estimated number of people it could feed.
  2. Environmental resources used (water in liters, farming effort/CO2).
  3. A short emotional message encouraging not to waste food.
  Return the response in JSON format.`;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          peopleFed: { type: Type.NUMBER, description: "Number of people this could feed" },
          waterSaved: { type: Type.STRING, description: "Water used in liters" },
          environmentalImpact: { type: Type.STRING, description: "Brief description of farming effort/CO2" },
          emotionalMessage: { type: Type.STRING, description: "Encouraging message" }
        },
        required: ["peopleFed", "waterSaved", "environmentalImpact", "emotionalMessage"]
      }
    }
  });

  return JSON.parse(response.text || "{}");
};

export const analyzeProductHealth = async (productName: string, imageData?: string, location?: string) => {
  const model = "gemini-3-flash-preview";
  const parts: any[] = [{ text: `Analyze the health impact of this food product: ${productName}. 
    Identify if it's healthy, moderately healthy, or unhealthy. 
    Mention harmful ingredients (sugar, sodium, preservatives). 
    Explain health effects and suggest 2-3 healthier alternatives. 
    
    CRITICAL: Prioritize suggesting healthier alternatives that are commonly found in local markets, neighborhood grocery stores, or typical households (e.g., local grains, seasonal fruits, common pulses) rather than expensive or 'exotic' health foods. 
    ${location ? `Consider the user's location: ${location} to suggest region-specific local produce.` : ""}
    
    Provide a health score from 0 to 100.
    Return JSON.` }];

  if (imageData) {
    parts.push({
      inlineData: {
        mimeType: "image/jpeg",
        data: imageData.split(",")[1]
      }
    });
  }

  const response = await ai.models.generateContent({
    model,
    contents: { parts },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          productName: { type: Type.STRING },
          healthStatus: { type: Type.STRING, enum: ["Healthy", "Moderately Healthy", "Unhealthy"] },
          harmfulIngredients: { type: Type.ARRAY, items: { type: Type.STRING } },
          healthEffects: { type: Type.STRING },
          alternatives: { type: Type.ARRAY, items: { type: Type.STRING } },
          healthScore: { type: Type.NUMBER }
        },
        required: ["productName", "healthStatus", "harmfulIngredients", "healthEffects", "alternatives", "healthScore"]
      }
    }
  });

  return JSON.parse(response.text || "{}");
};

export const calculatePortions = async (age: number, weight: number, activityLevel: string, location?: string) => {
  const model = "gemini-3-flash-preview";
  const prompt = `Calculate daily calorie needs and portion sizes for a ${age} year old person weighing ${weight}kg with ${activityLevel} activity level.
  Explain how overeating affects health and encourage balanced eating.
  Also, translate the total calories into a simple "daily intake" description (e.g., "This is roughly equivalent to 3 balanced meals and 2 small snacks").
  
  CRITICAL: Prioritize portion suggestions and meal descriptions that use ingredients commonly found in local markets and typical households.
  ${location ? `Consider the user's location: ${location} for local food availability.` : ""}
  
  Make the explanations brief but detailed enough for anyone to understand easily.
  Return JSON.`;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          calories: { type: Type.NUMBER },
          dailyIntakeDescription: { type: Type.STRING, description: "Simple explanation of what these calories look like in terms of meals" },
          portionSuggestions: { type: Type.ARRAY, items: { type: Type.STRING } },
          healthAdvice: { type: Type.STRING },
          encouragement: { type: Type.STRING }
        },
        required: ["calories", "dailyIntakeDescription", "portionSuggestions", "healthAdvice", "encouragement"]
      }
    }
  });

  return JSON.parse(response.text || "{}");
};

export const analyzeDonationSafety = async (foodType: string, quantity: string, condition: string) => {
  const model = "gemini-3-flash-preview";
  const prompt = `Analyze if ${quantity} of ${foodType} in ${condition} condition is safe for human donation.
  Estimate people fed, safety precautions, and if it's suitable for humans.
  Explain things in a way that is brief but detailed and easy for anyone to understand.
  Return JSON.`;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          isSafe: { type: Type.BOOLEAN },
          peopleFed: { type: Type.NUMBER },
          precautions: { type: Type.ARRAY, items: { type: Type.STRING } },
          safetyMessage: { type: Type.STRING }
        },
        required: ["isSafe", "peopleFed", "precautions", "safetyMessage"]
      }
    }
  });

  return JSON.parse(response.text || "{}");
};

export const suggestAnimalFeeding = async (foodType: string) => {
  const model = "gemini-3-flash-preview";
  const prompt = `Suggest which animals (cows, dogs, birds, etc.) can safely eat ${foodType} if it's not suitable for human donation. 
  If the food is dangerous or toxic for ALL animals (like moldy food, chocolate for dogs, etc.), return an empty array for suitableAnimals and provide a strong warning in generalAdvice.
  Explain precautions for each suitable animal.
  Make the explanations brief but detailed enough for anyone to understand easily.
  Return JSON.`;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          suitableAnimals: { 
            type: Type.ARRAY, 
            items: { 
              type: Type.OBJECT,
              properties: {
                animal: { type: Type.STRING },
                precaution: { type: Type.STRING }
              }
            } 
          },
          generalAdvice: { type: Type.STRING }
        },
        required: ["suitableAnimals", "generalAdvice"]
      }
    }
  });

  return JSON.parse(response.text || "{}");
};
