import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const ConflictInterpreter = () => {
  const [conflictText, setConflictText] = useState('');
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

  const interpretConflict = async () => {
    if (!conflictText.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const prompt = `You are a compassionate relationship mediator with expertise in nonviolent communication, attachment theory, and conflict resolution. Analyze this conflict/disagreement and provide insights that help both people understand each other better:

Conflict description: "${conflictText}"

Please respond with a JSON object containing:
{
  "surfaceIssue": "what the argument appears to be about on the surface",
  "person1": {
    "underlyingNeeds": ["need1", "need2", "need3"],
    "emotions": ["emotion1", "emotion2"],
    "perspective": "their viewpoint explained compassionately"
  },
  "person2": {
    "underlyingNeeds": ["need1", "need2", "need3"],
    "emotions": ["emotion1", "emotion2"],
    "perspective": "their viewpoint explained compassionately"
  },
  "sharedValues": ["value1", "value2"],
  "hiddenCommonGround": "areas where both people actually want similar things",
  "bridgeStatements": [
    "statement person 1 could say to person 2",
    "statement person 2 could say to person 1"
  ],
  "nextSteps": [
    "concrete action or conversation approach",
    "another specific next step"
  ]
}

Focus on uncovering the underlying needs beneath positions, finding shared values, and building bridges. Be warm, non-judgmental, and solution-oriented.`;

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
          "surfaceIssue": "The argument appears to be about household chores and fairness in dividing responsibilities.",
          "person1": {
            "underlyingNeeds": ["respect", "partnership", "appreciation"],
            "emotions": ["frustrated", "overwhelmed"],
            "perspective": "Person 1 feels taken for granted and believes their partner doesn't value their contributions to the relationship. They want to feel like an equal partner rather than a servant."
          },
          "person2": {
            "underlyingNeeds": ["understanding", "support", "communication"],
            "emotions": ["defensive", "exhausted"],
            "perspective": "Person 2 feels constantly criticized and believes their efforts go unnoticed. They want their partner to acknowledge their hard work and approach conversations with more empathy."
          },
          "sharedValues": ["equality", "respect", "partnership"],
          "hiddenCommonGround": "Both people deeply care about their relationship and want to feel valued and appreciated. They both want to create a home environment that feels fair and supportive for both partners.",
          "bridgeStatements": [
            "I really appreciate all the work you do around the house, and I want us to figure out how to share these responsibilities in a way that feels fair to both of us.",
            "I hear that you feel overwhelmed, and I want to understand better what would help you feel more supported so we can work together on this."
          ],
          "nextSteps": [
            "Schedule a calm time to discuss household responsibilities without accusation, focusing on what each person needs to feel supported",
            "Create a shared list of household tasks and discuss preferences for who handles what, being open to compromise"
          ]
        };
      }

      setInterpretation(parsedResponse);
    } catch (err) {
      setError(err.message || 'Unable to interpret this conflict. Please try again.');
      console.error('Error interpreting conflict:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      interpretConflict();
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
                💙 Conflict Interpreter 💙
              </h1>
              <h2 className="text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4 font-light">
                Understanding the needs beneath the words ✨
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
                    onClick={interpretConflict}
                    disabled={!conflictText.trim()}
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

          {/* Conflict Input Section */}
          <div className="bg-white rounded-2xl p-8 mb-8 shadow-lg border border-gray-200">
            <div className="mb-6">
              <label className="block text-gray-700 mb-3 text-lg font-medium flex items-center">
                <span className="text-purple-600 mr-2">💬</span>
                Describe the conflict or disagreement...
              </label>
              <textarea
                value={conflictText}
                onChange={(e) => setConflictText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="What happened? What was said? What are each person's positions? Include as much context as you can..."
                className="w-full h-48 bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-all duration-300 resize-none"
              />
            </div>

            <button
              onClick={interpretConflict}
              disabled={isLoading || !conflictText.trim()}
              className={`w-full py-3 px-6 rounded-xl font-medium transition-all duration-300 ${isLoading || !conflictText.trim()
                ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                : 'bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-600 hover:to-purple-600 text-white transform hover:scale-105 shadow-md'
                } flex items-center justify-center space-x-2`}
            >
              {isLoading ? (
                <>
                  <span className="animate-spin text-xl">⏳</span>
                  <span>Interpreting...</span>
                </>
              ) : (
                <>
                  <span className="text-xl">👥</span>
                  <span>Understand this conflict</span>
                </>
              )}
            </button>

            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                {error}
              </div>
            )}
          </div>

          {/* Interpretation Section - PRESERVED ORIGINAL OUTPUT STYLE */}
          {interpretation && (
            <div className={`space-y-6 ${isAnimating ? 'animate-fade-in' : ''}`}>
              {/* Surface Issue */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 shadow-lg border border-amber-200">
                <h2 className="text-2xl font-light mb-4 text-gray-800 flex items-center">
                  <span className="text-2xl mr-2">🎭</span>
                  Surface issue
                </h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {interpretation.surfaceIssue}
                </p>
              </div>

              {/* Person 1 */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-blue-200">
                <h2 className="text-2xl font-light mb-6 text-blue-700 flex items-center">
                  <span className="text-2xl mr-2">👤</span>
                  Person 1's perspective
                </h2>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">Underlying needs:</h3>
                    <div className="flex flex-wrap gap-2">
                      {interpretation.person1.underlyingNeeds.map((need, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 px-4 py-2 rounded-full text-blue-700 text-sm border border-blue-200"
                        >
                          {need}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">Emotions:</h3>
                    <div className="flex flex-wrap gap-2">
                      {interpretation.person1.emotions.map((emotion, index) => (
                        <span
                          key={index}
                          className="bg-purple-100 px-4 py-2 rounded-full text-purple-700 text-sm border border-purple-200"
                        >
                          {emotion}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-gray-700 leading-relaxed">
                      {interpretation.person1.perspective}
                    </p>
                  </div>
                </div>
              </div>

              {/* Person 2 */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-green-200">
                <h2 className="text-2xl font-light mb-6 text-green-700 flex items-center">
                  <span className="text-2xl mr-2">👤</span>
                  Person 2's perspective
                </h2>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">Underlying needs:</h3>
                    <div className="flex flex-wrap gap-2">
                      {interpretation.person2.underlyingNeeds.map((need, index) => (
                        <span
                          key={index}
                          className="bg-green-100 px-4 py-2 rounded-full text-green-700 text-sm border border-green-200"
                        >
                          {need}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">Emotions:</h3>
                    <div className="flex flex-wrap gap-2">
                      {interpretation.person2.emotions.map((emotion, index) => (
                        <span
                          key={index}
                          className="bg-purple-100 px-4 py-2 rounded-full text-purple-700 text-sm border border-purple-200"
                        >
                          {emotion}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-gray-700 leading-relaxed">
                      {interpretation.person2.perspective}
                    </p>
                  </div>
                </div>
              </div>

              {/* Shared Values & Common Ground */}
              <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-8 shadow-lg border border-rose-200">
                <h2 className="text-2xl font-light mb-4 text-gray-800 flex items-center">
                  <span className="text-rose-500 mr-2">❤️</span>
                  Shared values & common ground
                </h2>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">You both value:</h3>
                    <div className="flex flex-wrap gap-2">
                      {interpretation.sharedValues.map((value, index) => (
                        <span
                          key={index}
                          className="bg-rose-100 px-4 py-2 rounded-full text-rose-700 border border-rose-200"
                        >
                          {value}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-rose-200">
                    <p className="text-gray-700 leading-relaxed">
                      {interpretation.hiddenCommonGround}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bridge Statements */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-indigo-200">
                <h2 className="text-2xl font-light mb-6 text-gray-800 flex items-center">
                  <span className="text-yellow-500 mr-2 text-xl">💡</span>
                  Bridge statements
                </h2>
                <div className="space-y-4">
                  {interpretation.bridgeStatements.map((statement, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-r from-indigo-50 to-purple-50 p-5 rounded-lg border border-indigo-200"
                    >
                      <p className="text-gray-700 leading-relaxed italic">
                        "{statement}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Next Steps */}
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-8 shadow-lg border border-emerald-200">
                <h2 className="text-2xl font-light mb-6 text-gray-800 flex items-center">
                  <span className="text-2xl mr-2">🌱</span>
                  Next steps forward
                </h2>
                <div className="space-y-3">
                  {interpretation.nextSteps.map((step, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 bg-white p-4 rounded-lg border border-emerald-200"
                    >
                      <span className="bg-emerald-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-semibold mt-0.5">
                        {index + 1}
                      </span>
                      <p className="text-gray-700 leading-relaxed flex-1">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ConflictInterpreter;
