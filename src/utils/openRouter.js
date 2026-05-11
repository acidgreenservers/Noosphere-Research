/**
 * Utility to call OpenRouter API with consistent headers and error handling.
 */
export const callOpenRouter = async (apiKey, prompt, model = "nvidia/nemotron-nano-12b-v2-vl:free") => {
  if (!apiKey) {
    throw new Error('API key is required for AI analysis.');
  }

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://acidgreenservers.github.io/Noosphere-Research/',
      'X-Title': 'Noosphere Research Hub'
    },
    body: JSON.stringify({
      model: model,
      messages: [{ role: "user", content: prompt }],
      max_tokens: 2000,
      temperature: 0.7
    })
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Invalid API key. Please check your OpenRouter API key.');
    } else if (response.status === 402) {
      throw new Error('Insufficient credits. Please check your OpenRouter account.');
    } else if (response.status === 429) {
      throw new Error('Rate limit exceeded. Please try again later.');
    } else {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `API error: ${response.status}`);
    }
  }

  const data = await response.json();
  const text = data.choices[0]?.message?.content || '';

  if (!text) {
    throw new Error('No response generated from the AI.');
  }

  try {
    // Attempt to extract JSON if the model wrapped it in markdown
    const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/```([\s\S]*?)```/);
    const cleanJson = jsonMatch ? jsonMatch[1].trim() : text.trim();
    return JSON.parse(cleanJson);
  } catch (err) {
    console.error('Failed to parse AI response as JSON:', text);
    throw new Error('The AI returned an invalid response format. Please try again.');
  }
};
