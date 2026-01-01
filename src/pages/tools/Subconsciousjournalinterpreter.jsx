import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const SubconsciousJournalInterpreter = () => {
  const [journalText, setJournalText] = useState('');
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

  const interpretJournal = async () => {
    if (!journalText.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const prompt = `You are an expert at interpreting subconscious patterns in journal entries. Analyze this journal entry and provide deep insights into the underlying emotional and cognitive patterns:

Journal entry: "${journalText}"

Please respond with a JSON object containing:
{
  "emotionalUndercurrents": ["emotion1", "emotion2", "emotion3"],
  "cognitivePatterns": [
    {"pattern": "pattern name", "description": "what this reveals"},
    {"pattern": "pattern name", "description": "what this reveals"}
  ],
  "unspokenNeeds": ["need1", "need2", "need3"],
  "defenseMechanisms": ["mechanism1", "mechanism2"],
  "hiddenBeliefs": [
    {"belief": "core belief identified", "evidence": "how it shows up in the entry"}
  ],
  "growthOpportunities": [
    "specific insight for personal development",
    "another growth opportunity"
  ],
  "compassionateReflection": "A warm, understanding reflection that honors what the person is experiencing"
}

Look beneath the surface words to understand what the person might not be consciously aware of. Be gentle, compassionate, and insightful. Focus on patterns, not judgment.`;

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
          "emotionalUndercurrents": ["anxiety", "longing", "resignation"],
          "cognitivePatterns": [
            { "pattern": "Circular thinking", "description": "The writer returns to the same concerns repeatedly, suggesting unresolved internal conflicts that prevent forward movement" },
            { "pattern": "Future projection", "description": "Heavy focus on what might happen rather than current reality indicates anxiety about uncertainty and lack of control" }
          ],
          "unspokenNeeds": ["security", "connection", "validation"],
          "defenseMechanisms": ["intellectualization", "avoidance"],
          "hiddenBeliefs": [
            { "belief": "I'm not worthy of stability", "evidence": "The repeated expression of worry about future losses suggests a deep-seated belief that good things are temporary and undeserved" }
          ],
          "growthOpportunities": [
            "Practice grounding techniques to stay present rather than projecting into worst-case scenarios",
            "Explore the sources of the worthiness belief through gentle self-inquiry or therapeutic support"
          ],
          "compassionateReflection": "There's a tender heart here, carrying the weight of past uncertainties while desperately wishing for peace. The mind is working overtime to protect against disappointment, but this very protection creates the isolation it fears most. What if, beneath all the planning and worrying, there's a part of you that simply wants to rest and be held by life's natural flow?"
        };
      }

      setInterpretation(parsedResponse);
    } catch (err) {
      setError(err.message || 'Unable to interpret this entry. Please try again.');
      console.error('Error interpreting journal:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      interpretJournal();
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
                🧠 Subconscious Journal Interpreter 🧠
              </h1>
              <h2 className="text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4 font-light">
                Deep insights into emotional and cognitive patterns ✨
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
                    <p className="text-amber-700 text-sm">Add an OpenRouter API key for personalized AI-powered interpretations</p>
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
                    onClick={interpretJournal}
                    disabled={!journalText.trim()}
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

          {/* Journal Input Section */}
          <div className="bg-white rounded-2xl p-8 mb-8 shadow-lg border border-gray-200">
            <div className="mb-6">
              <label className="block text-gray-700 mb-3 text-lg font-medium flex items-center">
                <span className="text-purple-600 mr-2">📖</span>
                Paste your journal entry...
              </label>
              <textarea
                value={journalText}
                onChange={(e) => setJournalText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Write or paste your journal entry here. Let your thoughts flow naturally..."
                className="w-full h-48 bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-all duration-300 resize-none"
              />
            </div>

            <button
              onClick={interpretJournal}
              disabled={isLoading || !journalText.trim()}
              className={`w-full py-3 px-6 rounded-xl font-medium transition-all duration-300 ${isLoading || !journalText.trim()
                ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white transform hover:scale-105 shadow-md'
                } flex items-center justify-center space-x-2`}
            >
              {isLoading ? (
                <>
                  <span className="animate-spin text-xl">⏳</span>
                  <span>Interpreting...</span>
                </>
              ) : (
                <>
                  <span className="text-xl">🧠</span>
                  <span>Interpret subconscious patterns</span>
                </>
              )}
            </button>

            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                {error}
              </div>
            )}
          </div>

          {/* PRESERVED ORIGINAL OUTPUT FORMAT - Emotional & Cognitive Analysis */}
          {interpretation && (
            <div className={`space-y-6 ${isAnimating ? 'animate-fade-in' : ''}`}>
              {/* Emotional Undercurrents */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-blue-200">
                <h2 className="text-2xl font-light mb-4 text-gray-800 flex items-center">
                  <span className="text-2xl mr-2">🌊</span>
                  Emotional undercurrents
                </h2>
                <div className="flex flex-wrap gap-3">
                  {interpretation.emotionalUndercurrents.map((emotion, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 px-4 py-2 rounded-full text-blue-700 border border-blue-200"
                    >
                      {emotion}
                    </span>
                  ))}
                </div>
              </div>

              {/* Cognitive Patterns */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-purple-200">
                <h2 className="text-2xl font-light mb-6 text-gray-800 flex items-center">
                  <span className="text-2xl mr-2">🧠</span>
                  Cognitive patterns
                </h2>
                <div className="space-y-4">
                  {interpretation.cognitivePatterns.map((pattern, index) => (
                    <div key={index} className="bg-purple-50 p-5 rounded-lg border border-purple-200">
                      <h3 className="font-semibold text-purple-800 mb-2">{pattern.pattern}</h3>
                      <p className="text-gray-700 leading-relaxed">{pattern.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Unspoken Needs */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-green-200">
                <h2 className="text-2xl font-light mb-4 text-gray-800 flex items-center">
                  <span className="text-2xl mr-2">💚</span>
                  Unspoken needs
                </h2>
                <div className="flex flex-wrap gap-3">
                  {interpretation.unspokenNeeds.map((need, index) => (
                    <span
                      key={index}
                      className="bg-green-100 px-4 py-2 rounded-full text-green-700 border border-green-200"
                    >
                      {need}
                    </span>
                  ))}
                </div>
              </div>

              {/* Defense Mechanisms */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-amber-200">
                <h2 className="text-2xl font-light mb-4 text-gray-800 flex items-center">
                  <span className="text-2xl mr-2">🛡️</span>
                  Defense mechanisms
                </h2>
                <div className="flex flex-wrap gap-3">
                  {interpretation.defenseMechanisms.map((mechanism, index) => (
                    <span
                      key={index}
                      className="bg-amber-100 px-4 py-2 rounded-full text-amber-700 border border-amber-200"
                    >
                      {mechanism}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hidden Beliefs */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-indigo-200">
                <h2 className="text-2xl font-light mb-6 text-gray-800 flex items-center">
                  <span className="text-2xl mr-2">💭</span>
                  Hidden beliefs
                </h2>
                <div className="space-y-4">
                  {interpretation.hiddenBeliefs.map((belief, index) => (
                    <div key={index} className="bg-indigo-50 p-5 rounded-lg border border-indigo-200">
                      <h3 className="font-semibold text-indigo-800 mb-2">"{belief.belief}"</h3>
                      <p className="text-gray-700 leading-relaxed text-sm">
                        <span className="font-medium text-indigo-600">Evidence:</span> {belief.evidence}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Growth Opportunities */}
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-8 shadow-lg border border-emerald-200">
                <h2 className="text-2xl font-light mb-6 text-gray-800 flex items-center">
                  <span className="text-2xl mr-2">🌱</span>
                  Growth opportunities
                </h2>
                <div className="space-y-3">
                  {interpretation.growthOpportunities.map((opportunity, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 bg-white p-4 rounded-lg border border-emerald-200"
                    >
                      <span className="bg-emerald-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-semibold mt-0.5">
                        {index + 1}
                      </span>
                      <p className="text-gray-700 leading-relaxed flex-1">
                        {opportunity}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Compassionate Reflection */}
              <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl p-8 shadow-lg border border-pink-200">
                <h2 className="text-2xl font-light mb-4 text-gray-800 flex items-center">
                  <span className="text-2xl mr-2">💗</span>
                  Compassionate reflection
                </h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {interpretation.compassionateReflection}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SubconsciousJournalInterpreter;
