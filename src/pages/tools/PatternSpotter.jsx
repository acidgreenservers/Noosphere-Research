import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const PatternSpotter = () => {
  const [situationText, setSituationText] = useState('');
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

  const spotPattern = async () => {
    if (!situationText.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const prompt = `You are a pattern recognition specialist who helps people see the systemic patterns in their recurring situations. Analyze this recurring situation and reveal the deeper patterns at play:

Recurring situation: "${situationText}"

Please respond with a JSON object containing:
{
  "corePattern": "the fundamental pattern that keeps repeating (be specific and insightful)",
  "triggerPoints": [
    {"trigger": "what initiates this pattern", "why": "why this trigger is significant"},
    {"trigger": "another trigger point", "why": "why this matters"}
  ],
  "yourRole": "the consistent role or position you occupy in this pattern",
  "systemicDynamics": [
    "first systemic force at play",
    "second systemic force",
    "third systemic force"
  ],
  "whatStaysHidden": "what this pattern helps you avoid seeing or dealing with",
  "secondaryGains": [
    "hidden benefit #1 of maintaining this pattern",
    "hidden benefit #2"
  ],
  "theLoop": {
    "stage1": "how it starts",
    "stage2": "how it develops",
    "stage3": "how it reinforces",
    "stage4": "how it resets for next time"
  },
  "leveragePoints": [
    {"point": "where you could intervene", "how": "what intervention would look like"},
    {"point": "another leverage point", "how": "how to use it"}
  ],
  "deeperQuestion": "a profound question that gets at the heart of why this pattern persists"
}

Focus on revealing the systemic nature of recurring patterns - the feedback loops, roles, hidden functions, and points where change is actually possible. Be insightful and help them see the pattern as a system, not just a series of events.`;

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
          "corePattern": "You repeatedly enter relationships where you give excessively while receiving little in return, creating a cycle of emotional depletion followed by desperate attempts to 'fix' the dynamic.",
          "triggerPoints": [
            { "trigger": "Meeting someone who seems 'needy' or 'damaged'", "why": "This activates your rescuer role and gives you a sense of purpose and control" },
            { "trigger": "Feeling emotionally disconnected or bored in stable relationships", "why": "This creates the perfect excuse to seek out more 'challenging' connections" }
          ],
          "yourRole": "The perpetual caregiver and fixer - the one who believes they can love someone into wholeness, sacrificing their own needs in the process.",
          "systemicDynamics": [
            "The pattern reinforces your identity as the 'strong one' who doesn't need care, while simultaneously creating the conditions where you desperately need it",
            "Your giving creates dependency in others, which then requires you to give even more to maintain the relationship equilibrium",
            "The emotional depletion creates anxiety, which you soothe by seeking out new relationships where you can feel needed again"
          ],
          "whatStaysHidden": "The deep-seated belief that you are only worthy of love when you are being useful or needed - that your intrinsic self is not enough.",
          "secondaryGains": [
            "Avoiding the vulnerability of asking for your own needs to be met",
            "Maintaining the illusion of control through caregiving",
            "Deflecting attention from your own unresolved emotional wounds"
          ],
          "theLoop": {
            "stage1": "Emotional depletion creates anxiety and longing for connection",
            "stage2": "You seek out someone who seems to need your help or healing",
            "stage3": "The relationship becomes increasingly one-sided, reinforcing your martyr role",
            "stage4": "The depletion becomes unbearable, leading to breakdown and starting the cycle again"
          },
          "leveragePoints": [
            { "point": "Before entering new relationships, pause and ask yourself what you truly need", "how": "Create a list of non-negotiable emotional needs and check them against potential partners" },
            { "point": "When feeling the urge to 'rescue' someone, redirect that energy toward yourself", "how": "Use that caregiving impulse as a signal to engage in self-care or seek support for yourself" }
          ],
          "deeperQuestion": "What would it mean for you to believe that you deserve to be cared for exactly as much as you care for others?"
        };
      }

      setInterpretation(parsedResponse);
    } catch (err) {
      setError(err.message || 'Unable to spot the pattern. Please try again.');
      console.error('Error spotting pattern:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      spotPattern();
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
                🔍 Pattern Spotter 🔍
              </h1>
              <h2 className="text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4 font-light">
                See the systems behind recurring situations ✨
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
                    onClick={spotPattern}
                    disabled={!situationText.trim()}
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

          {/* Situation Input Section */}
          <div className="bg-white rounded-2xl p-8 mb-8 shadow-lg border border-gray-200">
            <div className="mb-6">
              <label className="block text-gray-700 mb-3 text-lg font-medium flex items-center">
                <span className="text-purple-600 mr-2">🔄</span>
                Describe the recurring situation...
              </label>
              <textarea
                value={situationText}
                onChange={(e) => setSituationText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="What keeps happening? What situations keep repeating in your life? Describe the pattern as you see it - the more detail the better..."
                className="w-full h-48 bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-all duration-300 resize-none"
              />
            </div>

            <button
              onClick={spotPattern}
              disabled={isLoading || !situationText.trim()}
              className={`w-full py-3 px-6 rounded-xl font-medium transition-all duration-300 ${isLoading || !situationText.trim()
                ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                : 'bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white transform hover:scale-105 shadow-md'
                } flex items-center justify-center space-x-2`}
            >
              {isLoading ? (
                <>
                  <span className="animate-spin text-xl">⏳</span>
                  <span>Analyzing pattern...</span>
                </>
              ) : (
                <>
                  <span className="text-xl">🔍</span>
                  <span>Spot the pattern</span>
                </>
              )}
            </button>

            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                {error}
              </div>
            )}
          </div>

          {/* PRESERVED ORIGINAL OUTPUT FORMAT - Systemic Pattern Analysis */}
          {interpretation && (
            <div className={`space-y-6 ${isAnimating ? 'animate-fade-in' : ''}`}>
              {/* Core Pattern */}
              <div className="bg-gradient-to-r from-violet-50 to-fuchsia-50 rounded-2xl p-8 shadow-lg border border-violet-200">
                <h2 className="text-2xl font-light mb-4 text-gray-800 flex items-center">
                  <span className="text-2xl mr-2">🎯</span>
                  Core pattern
                </h2>
                <p className="text-gray-700 leading-relaxed text-lg font-medium">
                  {interpretation.corePattern}
                </p>
              </div>

              {/* Trigger Points */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-orange-200">
                <h2 className="text-2xl font-light mb-6 text-gray-800 flex items-center">
                  <span className="text-2xl mr-2">⚡</span>
                  Trigger points
                </h2>
                <div className="space-y-4">
                  {interpretation.triggerPoints.map((item, index) => (
                    <div key={index} className="bg-orange-50 p-5 rounded-lg border border-orange-200">
                      <h3 className="font-semibold text-orange-800 mb-2">{item.trigger}</h3>
                      <p className="text-gray-700 leading-relaxed">
                        {item.why}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Your Role */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-blue-200">
                <h2 className="text-2xl font-light mb-4 text-gray-800 flex items-center">
                  <span className="text-2xl mr-2">👤</span>
                  Your role in this pattern
                </h2>
                <div className="bg-blue-50 p-5 rounded-lg border border-blue-200">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {interpretation.yourRole}
                  </p>
                </div>
              </div>

              {/* Systemic Dynamics */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-purple-200">
                <h2 className="text-2xl font-light mb-6 text-gray-800 flex items-center">
                  <span className="text-2xl mr-2">🌀</span>
                  Systemic forces at play
                </h2>
                <div className="space-y-3">
                  {interpretation.systemicDynamics.map((dynamic, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 bg-purple-50 p-4 rounded-lg border border-purple-200"
                    >
                      <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-semibold mt-0.5">
                        {index + 1}
                      </span>
                      <p className="text-gray-700 leading-relaxed flex-1">
                        {dynamic}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* What Stays Hidden */}
              <div className="bg-gradient-to-r from-slate-50 to-gray-100 rounded-2xl p-8 shadow-lg border border-gray-300">
                <h2 className="text-2xl font-light mb-4 text-gray-800 flex items-center">
                  <span className="text-2xl mr-2">🎭</span>
                  What stays hidden
                </h2>
                <div className="bg-white p-5 rounded-lg border border-gray-200">
                  <p className="text-gray-700 leading-relaxed text-lg italic">
                    {interpretation.whatStaysHidden}
                  </p>
                </div>
              </div>

              {/* Secondary Gains */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-amber-200">
                <h2 className="text-2xl font-light mb-6 text-gray-800 flex items-center">
                  <span className="text-2xl mr-2">🎁</span>
                  Hidden benefits of this pattern
                </h2>
                <div className="space-y-3">
                  {interpretation.secondaryGains.map((gain, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 bg-amber-50 p-4 rounded-lg border border-amber-200"
                    >
                      <span className="text-amber-600 text-xl mt-0.5">•</span>
                      <p className="text-gray-700 leading-relaxed flex-1">
                        {gain}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* The Loop */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 shadow-lg border border-indigo-200">
                <h2 className="text-2xl font-light mb-6 text-gray-800 flex items-center">
                  <span className="text-2xl mr-2">🔄</span>
                  The loop
                </h2>
                <div className="space-y-4">
                  <div className="bg-white p-5 rounded-lg border border-indigo-200">
                    <div className="flex items-center mb-2">
                      <span className="bg-indigo-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold mr-3">1</span>
                      <h3 className="font-semibold text-indigo-800">How it starts</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed ml-11">{interpretation.theLoop.stage1}</p>
                  </div>

                  <div className="bg-white p-5 rounded-lg border border-indigo-200">
                    <div className="flex items-center mb-2">
                      <span className="bg-indigo-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold mr-3">2</span>
                      <h3 className="font-semibold text-indigo-800">How it develops</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed ml-11">{interpretation.theLoop.stage2}</p>
                  </div>

                  <div className="bg-white p-5 rounded-lg border border-indigo-200">
                    <div className="flex items-center mb-2">
                      <span className="bg-indigo-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold mr-3">3</span>
                      <h3 className="font-semibold text-indigo-800">How it reinforces</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed ml-11">{interpretation.theLoop.stage3}</p>
                  </div>

                  <div className="bg-white p-5 rounded-lg border border-indigo-200">
                    <div className="flex items-center mb-2">
                      <span className="bg-indigo-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold mr-3">4</span>
                      <h3 className="font-semibold text-indigo-800">How it resets</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed ml-11">{interpretation.theLoop.stage4}</p>
                  </div>
                </div>
              </div>

              {/* Leverage Points */}
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-8 shadow-lg border border-emerald-200">
                <h2 className="text-2xl font-light mb-6 text-gray-800 flex items-center">
                  <span className="text-2xl mr-2">🎯</span>
                  Leverage points for change
                </h2>
                <div className="space-y-4">
                  {interpretation.leveragePoints.map((item, index) => (
                    <div key={index} className="bg-white p-5 rounded-lg border border-emerald-200">
                      <h3 className="font-semibold text-emerald-800 mb-2">{item.point}</h3>
                      <p className="text-gray-700 leading-relaxed">
                        <span className="text-emerald-600 font-medium">Intervention:</span> {item.how}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Deeper Question */}
              <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-8 shadow-lg border border-rose-200">
                <h2 className="text-2xl font-light mb-4 text-gray-800 flex items-center">
                  <span className="text-2xl mr-2">❓</span>
                  The deeper question
                </h2>
                <div className="bg-white p-6 rounded-lg border border-rose-200">
                  <p className="text-gray-700 leading-relaxed text-lg italic font-medium">
                    {interpretation.deeperQuestion}
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

export default PatternSpotter;
