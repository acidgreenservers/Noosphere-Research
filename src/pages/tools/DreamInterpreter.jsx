import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StarfieldLayout from '../../components/StarfieldLayout';

const DreamInterpreter = () => {
  const [dreamText, setDreamText] = useState('');
  const [interpretation, setInterpretation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [hasApiKey, setHasApiKey] = useState(false);
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);

  useEffect(() => {
    if (interpretation) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 1000);
    }
  }, [interpretation]);

  const interpretDream = async () => {
    if (!dreamText.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const prompt = `You are a compassionate dream interpreter with expertise in psychology, symbolism, and emotional wellness. Analyze this dream and provide a thoughtful interpretation:

Dream: "${dreamText}"

Please respond with a JSON object containing:
{
  "mainThemes": ["theme1", "theme2", "theme3"],
  "emotionalTone": "description of the emotional undertones",
  "symbols": [
    {"symbol": "symbol1", "meaning": "meaning1"},
    {"symbol": "symbol2", "meaning": "meaning2"}
  ],
  "personalInsight": "deep personal insight about what this dream might mean for the dreamer",
  "guidance": "gentle guidance for reflection or action"
}

Provide a warm, supportive interpretation that helps the dreamer understand their subconscious messages. Focus on positive insights while acknowledging any challenging emotions.`;

      let parsedResponse;

      if (hasApiKey && apiKey) {
        // Use real AI API
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': window.location.origin,
            'X-Title': 'Noosphere Research Hub'
          },
          body: JSON.stringify({
            model: "nvidia/nemotron-nano-12b-v2-vl:free",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 2000,
            temperature: 0.7
          })
        });

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Invalid API key. Please check your OpenRouter API key.');
          } else if (response.status === 429) {
            throw new Error('Rate limit exceeded. Please try again later.');
          } else {
            throw new Error(`API error: ${response.status}`);
          }
        }

        const data = await response.json();
        const text = data.choices[0]?.message?.content || 'No response generated.';
        const clean = text.replace(/```json|```/g, "").trim();
        parsedResponse = JSON.parse(clean);
      } else {
        // Use demo response
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API delay
        parsedResponse = {
          "mainThemes": ["transformation", "exploration", "emotional release"],
          "emotionalTone": "A mix of wonder and gentle anxiety, with an underlying current of hope and curiosity about what lies ahead",
          "symbols": [
            {"symbol": "flying through clouds", "meaning": "rising above everyday concerns, gaining new perspective, freedom from limitations"},
            {"symbol": "water/deep ocean", "meaning": "emotional depths, the unconscious mind, cleansing and renewal"},
            {"symbol": "keys or doors", "meaning": "new opportunities, unlocking potential, access to hidden aspects of self"}
          ],
          "personalInsight": "This dream suggests you're in a period of significant personal growth and exploration. The act of flying through clouds represents your desire to rise above current challenges and see things from a higher perspective, while the water elements indicate you're ready to dive deeper into your emotions and subconscious patterns.",
          "guidance": "Consider what areas of your life feel 'stuck' or need fresh perspective. The dream encourages you to trust your ability to navigate uncertainty and explore the unknown with courage and curiosity."
        };
      }

      setInterpretation(parsedResponse);
    } catch (err) {
      setError(err.message || 'Unable to interpret your dream. Please try again.');
      console.error('Error interpreting dream:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const validateApiKey = (key) => {
    // OpenRouter API keys start with 'sk-or-v1-'
    return key.startsWith('sk-or-v1-') && key.length > 20;
  };

  const handleApiKeySubmit = (e) => {
    e.preventDefault();
    if (validateApiKey(apiKey)) {
      setHasApiKey(true);
      setShowApiKeyInput(false);
      setError(null);
    } else {
      setError('Invalid OpenRouter API key format. Keys should start with "sk-or-v1-"');
    }
  };

  const clearApiKey = () => {
    setApiKey('');
    setHasApiKey(false);
    setShowApiKeyInput(false);
  };

  return (
    <StarfieldLayout>
      {/* Tool Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Link to="/" className="md-button-secondary text-sm flex items-center">
                <span className="material-symbols-outlined mr-2">home</span>
                Home
              </Link>
            </div>
            <div className="text-white/70 text-sm">
              Dream Interpreter
            </div>
          </div>
        </div>
      </nav>

      <div className="min-h-screen p-6 pt-24">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="md-card p-10 glow-card mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 glow-text text-white">
                🌙 Dream Interpreter 🌙
              </h1>
              <h2 className="text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4 font-light">
                Share your dream, discover its hidden meanings ✨
              </h2>
            </div>
          </div>

        {/* API Key Section */}
        {!hasApiKey && !showApiKeyInput && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-amber-600 mr-3">🔑</span>
                <div>
                  <h3 className="font-semibold text-amber-800">Enhance with AI Analysis</h3>
                  <p className="text-amber-700 text-sm">Add an OpenRouter API key for personalized AI-powered dream interpretations</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowApiKeyInput(true)}
                  className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors text-sm font-medium"
                >
                  Add API Key
                </button>
                <button
                  onClick={interpretDream}
                  disabled={!dreamText.trim()}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Use Demo
                </button>
              </div>
            </div>
          </div>
        )}

        {/* API Key Input Form */}
        {showApiKeyInput && !hasApiKey && (
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-6">
            <div className="flex items-center mb-4">
              <span className="text-blue-600 mr-3">🔐</span>
              <h3 className="font-semibold text-blue-800">Enter OpenRouter API Key</h3>
            </div>

            <div className="mb-4">
              <p className="text-blue-700 text-sm mb-3">
                Your API key is stored only in memory for this session and never saved or transmitted except to OpenRouter's secure API.
              </p>
              <ul className="text-blue-700 text-sm space-y-1 mb-4">
                <li>• Get your free API key at <a href="https://openrouter.ai/keys" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-800">openrouter.ai/keys</a></li>
                <li>• Keys start with "sk-or-v1-"</li>
                <li>• Your key is never stored or shared</li>
              </ul>
            </div>

            <form onSubmit={handleApiKeySubmit} className="space-y-4">
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-or-v1-..."
                className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                autoComplete="off"
                spellCheck="false"
              />

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={!apiKey.trim()}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  Save & Enable AI
                </button>
                <button
                  type="button"
                  onClick={() => setShowApiKeyInput(false)}
                  className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* API Key Status */}
        {hasApiKey && (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                <span className="text-green-800 font-medium">AI Analysis Enabled</span>
              </div>
              <button
                onClick={clearApiKey}
                className="text-green-700 hover:text-green-800 text-sm underline"
              >
                Clear Key
              </button>
            </div>
          </div>
        )}

        {/* Dream Input Section */}
        <div className="bg-white rounded-2xl p-8 mb-8 shadow-lg border border-gray-200">
          <div className="mb-6">
            <label className="block text-gray-700 mb-3 text-lg font-medium flex items-center">
              <span className="text-purple-600 mr-2">🌙</span>
              Tell me about your dream...
            </label>
            <textarea
              value={dreamText}
              onChange={(e) => setDreamText(e.target.value)}
              placeholder="Describe your dream in as much detail as you can remember... What happened? How did you feel? What stood out to you? ☁️"
              className="w-full h-48 bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-all duration-300 resize-none"
            />
          </div>

          <button
            onClick={interpretDream}
            disabled={isLoading || !dreamText.trim()}
            className={`w-full py-3 px-6 rounded-xl font-medium transition-all duration-300 ${
              isLoading || !dreamText.trim()
                ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white transform hover:scale-105 shadow-md'
            } flex items-center justify-center space-x-2`}
          >
            {isLoading ? (
              <>
                <span className="animate-spin text-xl">⏳</span>
                <span>Interpreting your dream...</span>
              </>
            ) : (
              <>
                <span className="text-xl">🌙</span>
                <span>Interpret dream</span>
              </>
            )}
          </button>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}
        </div>

        {/* PRESERVED ORIGINAL OUTPUT FORMAT - Dream Analysis */}
        {interpretation && (
          <div className={`space-y-6 ${isAnimating ? 'animate-fade-in' : ''}`}>
            {/* Main Themes */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 shadow-lg border border-indigo-200">
              <h2 className="text-2xl font-light mb-4 text-gray-800 flex items-center">
                <span className="text-2xl mr-2">🎯</span>
                Main themes
              </h2>
              <div className="flex flex-wrap gap-3">
                {interpretation.mainThemes.map((theme, index) => (
                  <span
                    key={index}
                    className="bg-indigo-100 px-4 py-2 rounded-full text-indigo-700 border border-indigo-200"
                  >
                    {theme}
                  </span>
                ))}
              </div>
            </div>

            {/* Emotional Tone */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-blue-200">
              <h2 className="text-2xl font-light mb-4 text-gray-800 flex items-center">
                <span className="text-2xl mr-2">💫</span>
                Emotional atmosphere
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {interpretation.emotionalTone}
              </p>
            </div>

            {/* Symbols */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-purple-200">
              <h2 className="text-2xl font-light mb-6 text-gray-800 flex items-center">
                <span className="text-2xl mr-2">🔮</span>
                Dream symbols
              </h2>
              <div className="space-y-4">
                {interpretation.symbols.map((symbol, index) => (
                  <div key={index} className="bg-purple-50 p-5 rounded-lg border border-purple-200">
                    <h3 className="font-semibold text-purple-800 mb-2">{symbol.symbol}</h3>
                    <p className="text-gray-700 leading-relaxed">{symbol.meaning}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Personal Insight */}
            <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl p-8 shadow-lg border border-pink-200">
              <h2 className="text-2xl font-light mb-4 text-gray-800 flex items-center">
                <span className="text-2xl mr-2">💭</span>
                Personal insight
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {interpretation.personalInsight}
              </p>
            </div>

            {/* Guidance */}
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-8 shadow-lg border border-emerald-200">
              <h2 className="text-2xl font-light mb-4 text-gray-800 flex items-center">
                <span className="text-2xl mr-2">🌟</span>
                Guidance for reflection
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {interpretation.guidance}
              </p>
            </div>
          </div>
        )}
        </div>
      </div>
    </StarfieldLayout>
  );
};

export default DreamInterpreter;
