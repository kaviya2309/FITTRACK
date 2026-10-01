const { GoogleGenAI } = require('@google/genai');

// Initialize Gemini client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// Generates a personalized workout recommendation
const generateWorkoutRecommendation = async (age, fitnessGoal, experience) => {
  try {
    const prompt = `Generate a personalized workout recommendation for a person with the following details:

Age: ${age}
Fitness Goal: ${fitnessGoal}
Experience Level: ${experience}

Keep the recommendation extremely direct, practical, and concise, within 2-3 paragraphs. Do not include greetings, markdown, bullet points, or introductory phrases. Speak directly to the user and provide a clear step-by-step execution plan.`;

    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL || 'gemini-3.5-flash',
      contents: prompt,
    });

    return response.text
      ? response.text.trim()
      : 'No recommendation could be generated.';
  } catch (error) {
    console.error('Gemini Recommendation Error:', error.message);
    throw new Error('Failed to generate workout recommendation from Gemini AI');
  }
};

// Generates personalized fitness insights
const generateFitnessInsights = async (
  totalWorkouts,
  averageDuration,
  totalCaloriesBurned
) => {
  try {
    const prompt = `Analyze this user's fitness progress and generate a personalized, encouraging fitness insight:

Total Workouts Logged: ${totalWorkouts}
Average Workout Duration: ${averageDuration} minutes
Total Calories Burned: ${totalCaloriesBurned} kcal

Keep the insight extremely direct, actionable, and concise, within 2-3 sentences. Do not include greetings, markdown, bullet points, or introductory phrases. Provide clear guidance on what to adjust or continue.`;

    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL || 'gemini-3.5-flash',
      contents: prompt,
    });

    return response.text
      ? response.text.trim()
      : 'No insight could be generated.';
  } catch (error) {
    console.error('Gemini Insights Error:', error.message);
    throw new Error('Failed to generate fitness insights from Gemini AI');
  }
};

module.exports = {
  generateWorkoutRecommendation,
  generateFitnessInsights,
};
