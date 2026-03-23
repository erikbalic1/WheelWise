const extractJson = (text) => {
  const trimmed = String(text || '').trim();

  try {
    return JSON.parse(trimmed);
  } catch (error) {
    const start = trimmed.indexOf('{');
    const end = trimmed.lastIndexOf('}');
    if (start !== -1 && end !== -1 && end > start) {
      const jsonSlice = trimmed.slice(start, end + 1);
      return JSON.parse(jsonSlice);
    }
    throw error;
  }
};

const getFallbackRecommendations = (preferences) => {
  const normalized = preferences.toLowerCase();

  const rules = [
    {
      test: /family|kids|child|space|suv|safe/,
      items: [
        { model: 'Toyota RAV4 Hybrid', reason: 'Spacious, efficient, and strong reliability for family usage.' },
        { model: 'Skoda Kodiaq', reason: 'Large interior and practical 7-seat option for growing families.' },
        { model: 'Honda CR-V', reason: 'Comfortable ride and excellent long-term ownership reputation.' }
      ]
    },
    {
      test: /city|urban|small|park|economy|cheap|budget/,
      items: [
        { model: 'Toyota Yaris Hybrid', reason: 'Great fuel economy and very easy to park in city environments.' },
        { model: 'Honda Jazz', reason: 'Flexible interior layout with low running costs.' },
        { model: 'Volkswagen Polo', reason: 'Balanced comfort and efficiency for daily urban commuting.' }
      ]
    },
    {
      test: /sport|fast|performance|horsepower|fun/,
      items: [
        { model: 'BMW M340i', reason: 'Strong performance with practical everyday usability.' },
        { model: 'Audi S3', reason: 'Quick acceleration and premium compact sport character.' },
        { model: 'Toyota GR86', reason: 'Engaging driving feel and good value for enthusiasts.' }
      ]
    },
    {
      test: /electric|ev|battery|zero emission/,
      items: [
        { model: 'Tesla Model 3', reason: 'Long range and strong charging ecosystem support.' },
        { model: 'Hyundai Ioniq 5', reason: 'Fast charging and practical crossover utility.' },
        { model: 'Kia EV6', reason: 'Good range, performance variants, and modern technology package.' }
      ]
    }
  ];

  const matched = rules.find((rule) => rule.test.test(normalized));
  const recommendations = matched
    ? matched.items
    : [
        { model: 'Toyota Corolla', reason: 'Reliable all-round option with efficient engines.' },
        { model: 'Mazda CX-5', reason: 'Comfortable interior and balanced driving experience.' },
        { model: 'Skoda Octavia', reason: 'Excellent practicality, value, and comfort for most buyers.' }
      ];

  return {
    summary: 'Here are practical model suggestions based on your preferences.',
    recommendations
  };
};

exports.getCarAdvice = async (req, res) => {
  try {
    const { preferences } = req.body;

    if (!preferences || typeof preferences !== 'string' || preferences.trim().length < 5) {
      return res.status(400).json({
        success: false,
        message: 'Please provide your car preferences with at least 5 characters.'
      });
    }

    const groqApiKey = process.env.GROQ_API_KEY;
    const model = process.env.GROQ_MODEL || 'llama-3.1-8b-instant';

    if (!groqApiKey) {
      return res.status(500).json({
        success: false,
        message: 'GROQ_API_KEY is missing. Add your Groq API key in backend/.env.'
      });
    }

    const prompt = `You are a professional car advisor.\nUser preferences: ${preferences.trim()}\n\nReturn only valid JSON in this exact format:\n{\n  "summary": "short explanation",\n  "recommendations": [\n    { "model": "car model", "reason": "why it matches" },\n    { "model": "car model", "reason": "why it matches" },\n    { "model": "car model", "reason": "why it matches" }\n  ]\n}\n\nRules:\n- 3 to 5 recommendations\n- Mention real production car models\n- Keep reasons concise and practical\n- Do not include markdown or extra text outside JSON.`;

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${groqApiKey}`
        },
        body: JSON.stringify({
          model,
          messages: [
            {
              role: 'system',
              content: 'You are a professional car advisor focused on recommending real production vehicles.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.4,
          max_tokens: 700,
          response_format: {
            type: 'json_object'
          }
        })
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`Groq request failed with status ${response.status}: ${errorBody}`);
      }

      const data = await response.json();
      const modelOutput = data?.choices?.[0]?.message?.content;
      const parsed = extractJson(modelOutput);
      const recommendations = Array.isArray(parsed.recommendations) ? parsed.recommendations : [];

      if (!parsed.summary || recommendations.length === 0) {
        throw new Error('Model response missing required recommendation content');
      }

      const sanitized = recommendations
        .filter((item) => item?.model && item?.reason)
        .slice(0, 5)
        .map((item) => ({
          model: String(item.model).trim(),
          reason: String(item.reason).trim()
        }));

      if (sanitized.length === 0) {
        throw new Error('No valid recommendations found in model response');
      }

      return res.status(200).json({
        success: true,
        source: 'groq',
        summary: String(parsed.summary).trim(),
        recommendations: sanitized
      });
    } catch (modelError) {
      const fallback = getFallbackRecommendations(preferences);
      return res.status(200).json({
        success: true,
        source: 'fallback',
        summary: fallback.summary,
        recommendations: fallback.recommendations,
        note: `Groq Llama model unavailable (${modelError.message}). Showing fallback recommendations.`
      });
    }
  } catch (error) {
    console.error('AI advice error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to generate car advice',
      error: error.message
    });
  }
};
