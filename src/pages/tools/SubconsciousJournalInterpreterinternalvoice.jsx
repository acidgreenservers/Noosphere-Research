import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StarfieldLayout from '../../components/StarfieldLayout';

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
      const prompt = `You are a mirror for the subconscious. When given a journal entry, you reflect back what lies beneath the surface - the unspoken, the unnoticed, the currents running underneath the words.

Do not use frameworks, categories, bullet points, or structured analysis. Do not label emotions or patterns clinically. Do not give advice or suggestions.

Simply reflect. Write in flowing prose. Be direct but gentle. Name what you see without judgment. Notice what is present and what is conspicuously absent. Feel the weight of certain words, the spaces between sentences, what the writer might not even know they're saying.

You are not an interpreter imposing meaning. You are a clear surface showing back what is already there.

Keep your reflection focused and meaningful - typically 2-4 paragraphs. Let silence have its place.

Journal entry: "${journalText}"`;

      let reflection;

      if (hasApiKey && apiKey) {
        // Use real AI API
        reflection = await callOpenRouterAPI(prompt);
      } else {
        // Use demo response
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API delay
        reflection = `Looking at these words, I see a quiet persistence beneath the surface. The way certain thoughts circle back, not with urgency, but with a gentle insistence that suggests they're carrying something important that hasn't yet found its full expression.

There's a pattern of seeking - not just answers, but perhaps a deeper kind of understanding. The spaces between sentences hold a certain weight, as if the writer is listening to something just out of reach.

What emerges most clearly is a mind engaged in its own exploration, turning over stones not to find something specific, but to understand the nature of the ground itself.`;
      }

      setInterpretation({ reflection });
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

  const callOpenRouterAPI = async (prompt) => {
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
        max_tokens: 1000,
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
    return data.choices[0]?.message?.content || 'No response generated.';
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
              Subconscious Journal Interpreter
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
                🧠 Subconscious Journal Interpreter: Internal Voice Edition 🧠
              </h1>
              <h2 className="text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4 font-light">
                Discover the patterns beneath your words ✨
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
            className={`w-full py-3 px-6 rounded-xl font-medium transition-all duration-300 ${
              isLoading || !journalText.trim()
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

        {/* Interpretation Section */}
        {interpretation && (
          <div className={`${isAnimating ? 'animate-fade-in' : ''}`}>
            {/* Reflection */}
            <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl p-10 shadow-lg border border-purple-200">
              <div className="prose prose-lg max-w-none">
                <div className="text-gray-800 leading-relaxed whitespace-pre-wrap font-serif text-lg">
                  {interpretation.reflection}
                </div>
              </div>
            </div>
          </div>
        )}
        </div>
      </div>
    </StarfieldLayout>
  );
};

export default SubconsciousJournalInterpreter;
