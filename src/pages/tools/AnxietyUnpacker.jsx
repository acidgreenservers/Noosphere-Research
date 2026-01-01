import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const AnxietyUnpacker = () => {
  const [anxietyText, setAnxietyText] = useState('');
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

  const unpackAnxiety = async () => {
    if (!anxietyText.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const prompt = `You are a compassionate anxiety specialist who helps people untangle racing thoughts and understand what's really driving their anxiety. Analyze these anxious thoughts and help bring clarity:

Anxious thoughts: "${anxietyText}"

Please respond with a JSON object containing:
{
  "rootFears": [
    {"fear": "core fear #1", "whatItProtects": "what this fear is trying to protect"},
    {"fear": "core fear #2", "whatItProtects": "what this fear is trying to protect"}
  ],
  "catastrophicThinking": {
    "worstCase": "the worst-case scenario playing in their mind",
    "likelihood": "realistic assessment of how likely this actually is",
    "evidenceFor": "what supports this fear",
    "evidenceAgainst": "what contradicts this fear"
  },
  "controlVsUncertainty": "what they're trying to control vs what's actually uncertain",
  "bodySignals": [
    "physical sensation or response tied to this anxiety",
    "another body signal"
  ],
  "hiddenNeeds": [
    "underlying need #1",
    "underlying need #2"
  ],
  "thoughtDistortions": [
    {"distortion": "type of thinking pattern", "example": "how it shows up in their thoughts"}
  ],
  "groundingTruths": [
    "truth #1 that counters the anxiety",
    "truth #2 that provides perspective",
    "truth #3 that offers stability"
  ],
  "actionableSteps": [
    {"step": "immediate action they can take", "why": "how this helps"},
    {"step": "another concrete action", "why": "why this matters"}
  ],
  "compassionateReframe": "a gentle, realistic reframing of their situation that acknowledges both the fear and the truth"
}

Be warm, validating, and realistic. Don't minimize their anxiety, but help them see it more clearly. Focus on what's actionable and true.`;

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
          "rootFears": [
            { "fear": "Being completely alone and having no one to turn to", "whatItProtects": "the deep need for connection and belonging" },
            { "fear": "Making the wrong choice that leads to irreversible damage", "whatItProtects": "the desire to feel competent and in control of one's life" }
          ],
          "catastrophicThinking": {
            "worstCase": "Everything falls apart completely and there's no way to recover",
            "likelihood": "Very low - most situations are recoverable, though it might take time and effort",
            "evidenceFor": "Past experiences where things felt overwhelming and took longer than expected to resolve",
            "evidenceAgainst": "Many past challenges that seemed impossible but were eventually managed or resolved"
          },
          "controlVsUncertainty": "Trying to control outcomes and people's reactions vs the natural uncertainty of life and other people's choices",
          "bodySignals": [
            "racing heart and shallow breathing",
            "tightness in chest and stomach",
            "difficulty concentrating or 'brain fog'"
          ],
          "hiddenNeeds": [
            "safety and predictability in an unpredictable world",
            "validation that their feelings and choices matter",
            "clear guidance when feeling overwhelmed"
          ],
          "thoughtDistortions": [
            { "distortion": "All-or-nothing thinking", "example": "If this doesn't work perfectly, it will be a complete disaster" },
            { "distortion": "Mind reading", "example": "They must think I'm incompetent for feeling this anxious" }
          ],
          "groundingTruths": [
            "Anxiety is a normal response to uncertainty and doesn't mean something is actually wrong",
            "You've successfully navigated difficult situations before and have inner resources to draw on",
            "It's okay to feel anxious and still make decisions - the anxiety doesn't have to be the boss"
          ],
          "actionableSteps": [
            { "step": "Take 5 slow, deep breaths focusing on the sensation of air entering and leaving your body", "why": "This activates your parasympathetic nervous system and interrupts the anxiety cycle" },
            { "step": "Write down three things you can control right now, no matter what", "why": "This shifts focus from what's uncertain to what you have power over" }
          ],
          "compassionateReframe": "Your anxiety is like a smoke detector - it's going off loudly because it cares about you and wants to keep you safe. The challenge is that it's detecting smoke where there might just be steam from a normal pot of life. What if you could thank your anxiety for its vigilance while gently reminding it that not every alert requires the same response?"
        };
      }

      setInterpretation(parsedResponse);
    } catch (err) {
      setError(err.message || 'Unable to unpack this anxiety. Please try again.');
      console.error('Error unpacking anxiety:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      unpackAnxiety();
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
                🌊 Anxiety Unpacker 🌊
              </h1>
              <h2 className="text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4 font-light">
                Untangle racing thoughts, find solid ground ✨
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
                    onClick={unpackAnxiety}
                    disabled={!anxietyText.trim()}
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

          {/* Anxiety Input Section */}
          <div className="bg-white rounded-2xl p-8 mb-8 shadow-lg border border-gray-200">
            <div className="mb-6">
              <label className="block text-gray-700 mb-3 text-lg font-medium flex items-center">
                <span className="text-purple-600 mr-2">🌊</span>
                What's racing through your mind?
              </label>
              <textarea
                value={anxietyText}
                onChange={(e) => setAnxietyText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Let it all out... What are you anxious about? What thoughts keep spinning? What scenarios keep playing in your head? Just write it all down without filtering..."
                className="w-full h-48 bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-all duration-300 resize-none"
              />
            </div>

            <button
              onClick={unpackAnxiety}
              disabled={isLoading || !anxietyText.trim()}
              className={`w-full py-3 px-6 rounded-xl font-medium transition-all duration-300 ${isLoading || !anxietyText.trim()
                ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                : 'bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 text-white transform hover:scale-105 shadow-md'
                } flex items-center justify-center space-x-2`}
            >
              {isLoading ? (
                <>
                  <span className="animate-spin text-xl">⏳</span>
                  <span>Unpacking...</span>
                </>
              ) : (
                <>
                  <span className="text-xl">🌊</span>
                  <span>Unpack this anxiety</span>
                </>
              )}
            </button>

            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                {error}
              </div>
            )}
          </div>

          {/* PRESERVED ORIGINAL OUTPUT FORMAT - Anxiety Analysis */}
          {interpretation && (
            <div className={`space-y-6 ${isAnimating ? 'animate-fade-in' : ''}`}>
              {/* Root Fears */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-red-200">
                <h2 className="text-2xl font-light mb-6 text-gray-800 flex items-center">
                  <span className="text-2xl mr-2">🎯</span>
                  Root fears
                </h2>
                <div className="space-y-4">
                  {interpretation.rootFears.map((item, index) => (
                    <div key={index} className="bg-red-50 p-5 rounded-lg border border-red-200">
                      <h3 className="font-semibold text-red-800 mb-2">{item.fear}</h3>
                      <p className="text-gray-700 leading-relaxed">
                        <span className="text-red-600 font-medium">Protecting:</span> {item.whatItProtects}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Catastrophic Thinking */}
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-8 shadow-lg border border-orange-200">
                <h2 className="text-2xl font-light mb-6 text-gray-800 flex items-center">
                  <span className="text-2xl mr-2">⚠️</span>
                  Catastrophic thinking
                </h2>
                <div className="space-y-4">
                  <div className="bg-white p-5 rounded-lg border border-orange-200">
                    <h3 className="font-semibold text-orange-800 mb-2">Worst-case scenario</h3>
                    <p className="text-gray-700 leading-relaxed">{interpretation.catastrophicThinking.worstCase}</p>
                  </div>

                  <div className="bg-white p-5 rounded-lg border border-orange-200">
                    <h3 className="font-semibold text-orange-800 mb-2">Realistic likelihood</h3>
                    <p className="text-gray-700 leading-relaxed">{interpretation.catastrophicThinking.likelihood}</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg border border-orange-200">
                      <h3 className="font-semibold text-orange-800 mb-2 text-sm">Evidence for</h3>
                      <p className="text-gray-700 text-sm leading-relaxed">{interpretation.catastrophicThinking.evidenceFor}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-green-200">
                      <h3 className="font-semibold text-green-800 mb-2 text-sm">Evidence against</h3>
                      <p className="text-gray-700 text-sm leading-relaxed">{interpretation.catastrophicThinking.evidenceAgainst}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Control vs Uncertainty */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-purple-200">
                <h2 className="text-2xl font-light mb-4 text-gray-800 flex items-center">
                  <span className="text-2xl mr-2">🎭</span>
                  Control vs uncertainty
                </h2>
                <div className="bg-purple-50 p-5 rounded-lg border border-purple-200">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {interpretation.controlVsUncertainty}
                  </p>
                </div>
              </div>

              {/* Body Signals */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-blue-200">
                <h2 className="text-2xl font-light mb-6 text-gray-800 flex items-center">
                  <span className="text-2xl mr-2">💫</span>
                  Body signals
                </h2>
                <div className="flex flex-wrap gap-3">
                  {interpretation.bodySignals.map((signal, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 px-4 py-2 rounded-full text-blue-700 border border-blue-200"
                    >
                      {signal}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hidden Needs */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-emerald-200">
                <h2 className="text-2xl font-light mb-6 text-gray-800 flex items-center">
                  <span className="text-2xl mr-2">💚</span>
                  Hidden needs
                </h2>
                <div className="space-y-3">
                  {interpretation.hiddenNeeds.map((need, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 bg-emerald-50 p-4 rounded-lg border border-emerald-200"
                    >
                      <span className="text-emerald-600 text-xl mt-0.5">•</span>
                      <p className="text-gray-700 leading-relaxed flex-1">
                        {need}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Thought Distortions */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-indigo-200">
                <h2 className="text-2xl font-light mb-6 text-gray-800 flex items-center">
                  <span className="text-2xl mr-2">🧠</span>
                  Thought patterns
                </h2>
                <div className="space-y-4">
                  {interpretation.thoughtDistortions.map((item, index) => (
                    <div key={index} className="bg-indigo-50 p-5 rounded-lg border border-indigo-200">
                      <h3 className="font-semibold text-indigo-800 mb-2">{item.distortion}</h3>
                      <p className="text-gray-700 leading-relaxed italic">
                        "{item.example}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Grounding Truths */}
              <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl p-8 shadow-lg border border-teal-200">
                <h2 className="text-2xl font-light mb-6 text-gray-800 flex items-center">
                  <span className="text-2xl mr-2">⚓</span>
                  Grounding truths
                </h2>
                <div className="space-y-3">
                  {interpretation.groundingTruths.map((truth, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 bg-white p-4 rounded-lg border border-teal-200"
                    >
                      <span className="bg-teal-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-semibold mt-0.5">
                        {index + 1}
                      </span>
                      <p className="text-gray-700 leading-relaxed flex-1 font-medium">
                        {truth}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actionable Steps */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 shadow-lg border border-green-200">
                <h2 className="text-2xl font-light mb-6 text-gray-800 flex items-center">
                  <span className="text-2xl mr-2">✅</span>
                  Actionable steps
                </h2>
                <div className="space-y-4">
                  {interpretation.actionableSteps.map((item, index) => (
                    <div key={index} className="bg-white p-5 rounded-lg border border-green-200">
                      <h3 className="font-semibold text-green-800 mb-2">{item.step}</h3>
                      <p className="text-gray-700 leading-relaxed">
                        <span className="text-green-600 font-medium">Why:</span> {item.why}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Compassionate Reframe */}
              <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl p-8 shadow-lg border border-pink-200">
                <h2 className="text-2xl font-light mb-4 text-gray-800 flex items-center">
                  <span className="text-2xl mr-2">💗</span>
                  A gentler perspective
                </h2>
                <div className="bg-white p-6 rounded-lg border border-pink-200">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {interpretation.compassionateReframe}
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

export default AnxietyUnpacker;
