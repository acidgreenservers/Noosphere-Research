import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';



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
            { "symbol": "flying through clouds", "meaning": "rising above everyday concerns, gaining new perspective, freedom from limitations" },
            { "symbol": "water/deep ocean", "meaning": "emotional depths, the unconscious mind, cleansing and renewal" },
            { "symbol": "keys or doors", "meaning": "new opportunities, unlocking potential, access to hidden aspects of self" }
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
    <>

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
          <div className="max-w-4xl mx-auto mb-8">
            {!hasApiKey && !showApiKeyInput && (
              <div className="md-card p-6 border-amber-500/30 bg-amber-500/5 transition-all hover:border-amber-500/50">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center text-left">
                    <span className="material-symbols-outlined text-amber-400 mr-3 text-3xl">key</span>
                    <div>
                      <h3 className="font-semibold text-amber-200">Enhance with AI Analysis</h3>
                      <p className="text-amber-400/70 text-sm">Add an OpenRouter API key for personalized AI-powered interpretations</p>
                    </div>
                  </div>
                  <div className="flex gap-3 w-full md:w-auto">
                    <button
                      onClick={() => setShowApiKeyInput(true)}
                      className="flex-1 md:flex-none px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-full transition-colors text-sm font-medium shadow-lg shadow-amber-900/20"
                    >
                      Add API Key
                    </button>
                    <button
                      onClick={interpretDream}
                      disabled={!dreamText.trim()}
                      className="flex-1 md:flex-none px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed border border-white/10"
                    >
                      Use Demo
                    </button>
                  </div>
                </div>
              </div>
            )}

            {showApiKeyInput && !hasApiKey && (
              <div className="md-card p-8 border-blue-500/30 bg-blue-500/5 animate-fade-in">
                <div className="flex items-center mb-6">
                  <span className="material-symbols-outlined text-blue-400 mr-3">lock</span>
                  <h3 className="text-xl font-semibold text-blue-200">Enter OpenRouter API Key</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-6">
                  <div className="text-sm text-gray-400 space-y-3 font-light leading-relaxed text-left">
                    <p>Your API key is stored only in memory for this session and never saved or transmitted except to OpenRouter's secure API.</p>
                    <ul className="space-y-2">
                      <li className="flex items-start"><span className="material-symbols-outlined text-xs mr-2 text-blue-400 mt-1">link</span> <a href="https://openrouter.ai/keys" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Get your free API key at OpenRouter</a></li>
                      <li className="flex items-start"><span className="material-symbols-outlined text-xs mr-2 text-blue-400 mt-1">check_circle</span> Keys start with "sk-or-v1-"</li>
                      <li className="flex items-start"><span className="material-symbols-outlined text-xs mr-2 text-blue-400 mt-1">shield</span> Your key is never stored or shared</li>
                    </ul>
                  </div>

                  <form onSubmit={handleApiKeySubmit} className="space-y-4">
                    <input
                      type="password"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="sk-or-v1-..."
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                      autoComplete="off"
                      spellCheck="false"
                    />
                    <div className="flex gap-3">
                      <button
                        type="submit"
                        disabled={!apiKey.trim()}
                        className="flex-1 md-button py-2 text-sm"
                      >
                        Save & Enable AI
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowApiKeyInput(false)}
                        className="flex-1 md-button-secondary py-2 text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* API Key Status */}
            {hasApiKey && (
              <div className="md-card p-4 border-green-500/30 bg-green-500/5 animate-fade-in">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="material-symbols-outlined text-green-400 mr-2">check_circle</span>
                    <span className="text-green-200 font-medium">AI Analysis Enabled</span>
                  </div>
                  <button
                    onClick={clearApiKey}
                    className="text-green-400 hover:text-green-300 text-sm underline transition-colors"
                  >
                    Clear Key
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Dream Input Section */}
          <div className="md-card p-10 glow-card mb-12">
            <div className="mb-8">
              <label className="block text-purple-300 mb-4 text-xl font-medium flex items-center">
                <span className="material-symbols-outlined mr-3 text-purple-400">cloud</span>
                Tell me about your dream...
              </label>
              <textarea
                value={dreamText}
                onChange={(e) => setDreamText(e.target.value)}
                placeholder="Describe your dream in as much detail as you can remember... What happened? How did you feel? What stood out to you? ☁️"
                className="w-full h-64 bg-white/5 border border-white/10 rounded-2xl p-6 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all resize-none leading-relaxed"
              />
            </div>

            <button
              onClick={interpretDream}
              disabled={isLoading || !dreamText.trim()}
              className={`w-full py-5 px-8 rounded-full font-bold transition-all duration-500 flex items-center justify-center gap-3 text-xl group overflow-hidden relative ${isLoading || !dreamText.trim()
                ? 'bg-white/5 border border-white/10 text-gray-500 cursor-not-allowed'
                : 'md-button shadow-xl shadow-purple-500/20 active:scale-95 hover:scale-[1.02]'
                }`}
            >
              {isLoading ? (
                <>
                  <span className="material-symbols-outlined w-7 h-7 animate-spin">progress_activity</span>
                  <span>Interpreting...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-2xl group-hover:rotate-12 transition-transform">auto_awesome</span>
                  <span>Interpret Dream</span>
                </>
              )}
              <div className={`absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ${isLoading ? 'hidden' : ''}`}></div>
            </button>

            {error && (
              <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-center flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">error</span>
                {error}
              </div>
            )}
          </div>

          {/* PRESERVED ORIGINAL OUTPUT FORMAT - Dream Analysis */}
          {interpretation && (
            <div className={`space-y-6 ${isAnimating ? 'animate-fade-in' : ''}`}>
              {/* Main Themes */}
              <div className="md-card p-10 glow-card border-indigo-500/20 bg-indigo-500/5">
                <h2 className="text-3xl font-light mb-8 text-indigo-200 flex items-center">
                  <span className="material-symbols-outlined mr-3 text-indigo-400 text-3xl">local_library</span>
                  Main Themes
                </h2>
                <div className="flex flex-wrap gap-4">
                  {interpretation.mainThemes.map((theme, index) => (
                    <span
                      key={index}
                      className="bg-indigo-500/10 px-6 py-2 rounded-full text-indigo-200 border border-indigo-500/20 text-sm tracking-wide font-medium"
                    >
                      {theme}
                    </span>
                  ))}
                </div>
              </div>

              {/* Emotional Tone */}
              <div className="md-card p-10 glow-card border-blue-500/20 bg-blue-500/5">
                <h2 className="text-3xl font-light mb-8 text-blue-200 flex items-center">
                  <span className="material-symbols-outlined mr-3 text-blue-400 text-3xl">air</span>
                  Emotional Atmosphere
                </h2>
                <div className="bg-white/5 p-6 rounded-2xl border border-white/5 font-light leading-relaxed">
                  <p className="text-gray-200 text-lg">
                    {interpretation.emotionalTone}
                  </p>
                </div>
              </div>

              {/* Symbols */}
              <div className="md-card p-10 glow-card border-purple-500/20 bg-purple-500/5">
                <h2 className="text-3xl font-light mb-8 text-purple-200 flex items-center">
                  <span className="material-symbols-outlined mr-3 text-purple-400 text-3xl">auto_fix_high</span>
                  Dream Symbols
                </h2>
                <div className="space-y-4">
                  {interpretation.symbols.map((symbol, index) => (
                    <div key={index} className="bg-white/5 p-6 rounded-2xl border border-white/5 group hover:bg-white/10 transition-colors">
                      <h3 className="text-xl font-bold text-purple-300 mb-2">{symbol.symbol}</h3>
                      <p className="text-gray-300 leading-relaxed font-light">{symbol.meaning}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Personal Insight */}
              <div className="md-card p-10 glow-card border-pink-500/20 bg-pink-500/5">
                <h2 className="text-3xl font-light mb-8 text-rose-200 flex items-center">
                  <span className="material-symbols-outlined mr-3 text-rose-400 text-3xl">psychology</span>
                  Personal Insight
                </h2>
                <div className="bg-white/5 p-8 rounded-3xl border border-pink-500/10 text-center font-light italic leading-relaxed">
                  <p className="text-xl text-gray-200">
                    {interpretation.personalInsight}
                  </p>
                </div>
              </div>

              {/* Guidance */}
              <div className="md-card p-10 glow-card border-emerald-500/20 bg-emerald-500/5">
                <h2 className="text-3xl font-light mb-8 text-emerald-200 flex items-center">
                  <span className="material-symbols-outlined mr-3 text-emerald-400 text-3xl">moving</span>
                  Guidance for Reflection
                </h2>
                <div className="bg-white/5 p-6 rounded-2xl border border-white/5 font-light leading-relaxed">
                  <p className="text-gray-200 text-lg">
                    {interpretation.guidance}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DreamInterpreter;
