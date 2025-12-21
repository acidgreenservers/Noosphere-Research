import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StarfieldLayout from '../../components/StarfieldLayout';

const DecisionClarifier = () => {
  const [decisionText, setDecisionText] = useState('');
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

  const clarifyDecision = async () => {
    if (!decisionText.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const prompt = `You are a decision clarity specialist who helps people understand the deeper dimensions of their choices. Analyze this decision and reveal what might not be immediately obvious:

Decision: "${decisionText}"

Please respond with a JSON object containing:
{
  "surfaceChoice": "what the decision appears to be about at first glance",
  "valuesInConflict": [
    {"value": "value1", "pullingToward": "which option this value supports"},
    {"value": "value2", "pullingToward": "which option this value supports"}
  ],
  "hiddenFactors": [
    "factor1 that might not be consciously considered",
    "factor2 that might not be consciously considered"
  ],
  "fearVsDesire": {
    "fears": ["fear1", "fear2"],
    "desires": ["desire1", "desire2"]
  },
  "reframingQuestions": [
    "question that shifts perspective",
    "another perspective-shifting question",
    "a third reframing question"
  ],
  "whatIfReversed": "What if you tried thinking about this decision in the opposite way?",
  "trueCost": "What choosing each option will actually cost (time, energy, opportunity, identity)",
  "signalsToWatch": [
    "internal or external signal that would indicate the right choice",
    "another signal to pay attention to"
  ]
}

Be insightful and help the person see dimensions of their decision they might be missing. Focus on clarity and self-awareness, not telling them what to choose.`;

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
          "surfaceChoice": "The decision appears to be about choosing between two job offers - one with higher pay but longer commute, the other with lower pay but better work-life balance.",
          "valuesInConflict": [
            {"value": "Financial security", "pullingToward": "the higher-paying job"},
            {"value": "Work-life balance", "pullingToward": "the lower-paying job with shorter commute"}
          ],
          "hiddenFactors": [
            "How much you value your time and energy outside of work",
            "Your long-term career goals and what type of experience each role offers",
            "The impact on your relationships and personal life"
          ],
          "fearVsDesire": {
            "fears": ["Not having enough money", "Regretting a decision that affects your lifestyle"],
            "desires": ["Financial stability", "Enjoying your work and having energy for personal life"]
          },
          "reframingQuestions": [
            "If money wasn't a factor, which job would excite you more?",
            "What would you tell a friend in your situation?",
            "How will you feel about this decision in 6 months vs 5 years?"
          ],
          "whatIfReversed": "What if instead of asking 'which job should I take?' you asked yourself 'what kind of life do I want to live, and which job supports that life?'",
          "trueCost": "The higher-paying job costs you 2 hours of commuting daily (10 hours/week, 40 hours/month) plus potential burnout from less recovery time. The lower-paying job costs you income but gives you more energy and time for other aspects of life that might create different kinds of abundance.",
          "signalsToWatch": [
            "How your body feels when you think about each option - tension vs ease",
            "Whether you find yourself making excuses for or against either choice",
            "What your trusted friends and mentors advise without you telling them which one you prefer"
          ]
        };
      }

      setInterpretation(parsedResponse);
    } catch (err) {
      setError(err.message || 'Unable to clarify this decision. Please try again.');
      console.error('Error clarifying decision:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      clarifyDecision();
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
              Decision Clarifier
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
                🧭 Decision Clarifier 🧭
              </h1>
              <h2 className="text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4 font-light">
                See the deeper dimensions of your choices ✨
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
                  onClick={clarifyDecision}
                  disabled={!decisionText.trim()}
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

        {/* Decision Input Section */}
        <div className="bg-white rounded-2xl p-8 mb-8 shadow-lg border border-gray-200">
          <div className="mb-6">
            <label className="block text-gray-700 mb-3 text-lg font-medium flex items-center">
              <span className="text-purple-600 mr-2">🧭</span>
              Describe your decision...
            </label>
            <textarea
              value={decisionText}
              onChange={(e) => setDecisionText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="What decision are you facing? What are your options? What's making this hard to decide? Include any context that feels relevant..."
              className="w-full h-48 bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-all duration-300 resize-none"
            />
          </div>

          <button
            onClick={clarifyDecision}
            disabled={isLoading || !decisionText.trim()}
            className={`w-full py-3 px-6 rounded-xl font-medium transition-all duration-300 ${
              isLoading || !decisionText.trim()
                ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white transform hover:scale-105 shadow-md'
            } flex items-center justify-center space-x-2`}
          >
            {isLoading ? (
              <>
                <span className="animate-spin text-xl">⏳</span>
                <span>Clarifying...</span>
              </>
            ) : (
              <>
                <span className="text-xl">🧭</span>
                <span>Clarify this decision</span>
              </>
            )}
          </button>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}
        </div>

        {/* PRESERVED ORIGINAL OUTPUT FORMAT - Decision Analysis */}
        {interpretation && (
          <div className={`space-y-6 ${isAnimating ? 'animate-fade-in' : ''}`}>
            {/* Surface Choice */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-lg border border-blue-200">
              <h2 className="text-2xl font-light mb-4 text-gray-800 flex items-center">
                <span className="text-2xl mr-2">🎯</span>
                Surface choice
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {interpretation.surfaceChoice}
              </p>
            </div>

            {/* Values in Conflict */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-purple-200">
              <h2 className="text-2xl font-light mb-6 text-gray-800 flex items-center">
                <span className="text-2xl mr-2">⚖️</span>
                Values in conflict
              </h2>
              <div className="space-y-4">
                {interpretation.valuesInConflict.map((item, index) => (
                  <div key={index} className="bg-purple-50 p-5 rounded-lg border border-purple-200">
                    <h3 className="font-semibold text-purple-800 mb-2">{item.value}</h3>
                    <p className="text-gray-700 leading-relaxed">
                      <span className="text-purple-600 font-medium">Pulling toward:</span> {item.pullingToward}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Hidden Factors */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-amber-200">
              <h2 className="text-2xl font-light mb-6 text-gray-800 flex items-center">
                <span className="text-2xl mr-2">🔍</span>
                Hidden factors
              </h2>
              <div className="space-y-3">
                {interpretation.hiddenFactors.map((factor, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 bg-amber-50 p-4 rounded-lg border border-amber-200"
                  >
                    <span className="bg-amber-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-semibold mt-0.5">
                      {index + 1}
                    </span>
                    <p className="text-gray-700 leading-relaxed flex-1">
                      {factor}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Fear vs Desire */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-rose-200">
              <h2 className="text-2xl font-light mb-6 text-gray-800 flex items-center">
                <span className="text-2xl mr-2">🎭</span>
                Fear vs Desire
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-red-700 mb-3 text-lg">Fears</h3>
                  <div className="space-y-2">
                    {interpretation.fearVsDesire.fears.map((fear, index) => (
                      <div key={index} className="bg-red-50 p-3 rounded-lg border border-red-200">
                        <p className="text-gray-700">{fear}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-green-700 mb-3 text-lg">Desires</h3>
                  <div className="space-y-2">
                    {interpretation.fearVsDesire.desires.map((desire, index) => (
                      <div key={index} className="bg-green-50 p-3 rounded-lg border border-green-200">
                        <p className="text-gray-700">{desire}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Reframing Questions */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 shadow-lg border border-indigo-200">
              <h2 className="text-2xl font-light mb-6 text-gray-800 flex items-center">
                <span className="text-2xl mr-2">🤔</span>
                Reframing questions
              </h2>
              <div className="space-y-4">
                {interpretation.reframingQuestions.map((question, index) => (
                  <div
                    key={index}
                    className="bg-white p-5 rounded-lg border border-indigo-200"
                  >
                    <p className="text-gray-700 leading-relaxed italic text-lg">
                      {question}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* What If Reversed */}
            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl p-8 shadow-lg border border-cyan-200">
              <h2 className="text-2xl font-light mb-4 text-gray-800 flex items-center">
                <span className="text-2xl mr-2">🔄</span>
                What if reversed?
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {interpretation.whatIfReversed}
              </p>
            </div>

            {/* True Cost */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-orange-200">
              <h2 className="text-2xl font-light mb-4 text-gray-800 flex items-center">
                <span className="text-2xl mr-2">💰</span>
                True cost
              </h2>
              <div className="bg-orange-50 p-5 rounded-lg border border-orange-200">
                <p className="text-gray-700 leading-relaxed text-lg">
                  {interpretation.trueCost}
                </p>
              </div>
            </div>

            {/* Signals to Watch */}
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-8 shadow-lg border border-emerald-200">
              <h2 className="text-2xl font-light mb-6 text-gray-800 flex items-center">
                <span className="text-2xl mr-2">📡</span>
                Signals to watch for
              </h2>
              <div className="space-y-3">
                {interpretation.signalsToWatch.map((signal, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 bg-white p-4 rounded-lg border border-emerald-200"
                  >
                    <span className="bg-emerald-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-semibold mt-0.5">
                      {index + 1}
                    </span>
                    <p className="text-gray-700 leading-relaxed flex-1">
                      {signal}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        </div>
      </div>
    </StarfieldLayout>
  );
};

export default DecisionClarifier;
