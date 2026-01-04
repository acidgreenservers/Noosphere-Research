import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Loader2, Users } from 'lucide-react';


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
            { "value": "Financial security", "pullingToward": "the higher-paying job" },
            { "value": "Work-life balance", "pullingToward": "the lower-paying job with shorter commute" }
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
    <>

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
                      onClick={clarifyDecision}
                      disabled={!decisionText.trim()}
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

          {/* Decision Input Section */}
          <div className="md-card p-10 glow-card mb-12">
            <div className="mb-8">
              <label className="block text-purple-300 mb-4 text-xl font-medium flex items-center">
                <span className="material-symbols-outlined mr-3 text-purple-400">explore</span>
                Describe your decision...
              </label>
              <textarea
                value={decisionText}
                onChange={(e) => setDecisionText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="What decision are you facing? What are your options? What's making this hard to decide? Include any context that feels relevant..."
                className="w-full h-64 bg-white/5 border border-white/10 rounded-2xl p-6 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all resize-none leading-relaxed"
              />
            </div>

            <button
              onClick={clarifyDecision}
              disabled={isLoading || !decisionText.trim()}
              className={`w-full py-5 px-8 rounded-full font-bold transition-all duration-500 flex items-center justify-center gap-3 text-xl group overflow-hidden relative ${isLoading || !decisionText.trim()
                ? 'bg-white/5 border border-white/10 text-gray-500 cursor-not-allowed'
                : 'md-button shadow-xl shadow-purple-500/20 active:scale-95 hover:scale-[1.02]'
                }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-7 h-7 animate-spin" />
                  <span>Clarifying...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-2xl group-hover:rotate-12 transition-transform">explore</span>
                  <span>Clarify this Decision</span>
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

          {/* PRESERVED ORIGINAL OUTPUT FORMAT - Decision Analysis */}
          {interpretation && (
            <div className={`space-y-6 ${isAnimating ? 'animate-fade-in' : ''}`}>
              {/* Surface Choice */}
              <div className="md-card p-10 glow-card border-blue-500/20 bg-blue-500/5">
                <h2 className="text-3xl font-light mb-8 text-blue-200 flex items-center">
                  <span className="material-symbols-outlined mr-3 text-blue-400 text-3xl">target</span>
                  Surface Choice
                </h2>
                <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                  <p className="text-gray-200 leading-relaxed text-lg font-light italic">
                    {interpretation.surfaceChoice}
                  </p>
                </div>
              </div>

              {/* Values in Conflict */}
              <div className="md-card p-10 glow-card border-purple-500/20 bg-purple-500/5">
                <h2 className="text-3xl font-light mb-8 text-purple-200 flex items-center">
                  <span className="material-symbols-outlined mr-3 text-purple-400 text-3xl">balance</span>
                  Values in Conflict
                </h2>
                <div className="space-y-4">
                  {interpretation.valuesInConflict.map((item, index) => (
                    <div key={index} className="bg-white/5 p-6 rounded-2xl border border-white/5 group hover:bg-white/10 transition-colors">
                      <h3 className="text-xl font-bold text-purple-300 mb-2">{item.value}</h3>
                      <p className="text-gray-300 leading-relaxed font-light">
                        <span className="text-purple-400 font-bold uppercase text-xs tracking-widest mr-2">Pulling toward:</span> {item.pullingToward}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hidden Factors */}
              <div className="md-card p-10 glow-card border-amber-500/20 bg-amber-500/5">
                <h2 className="text-3xl font-light mb-8 text-amber-200 flex items-center">
                  <span className="material-symbols-outlined mr-3 text-amber-400 text-3xl">search</span>
                  Hidden Factors
                </h2>
                <div className="space-y-4">
                  {interpretation.hiddenFactors.map((factor, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-4 bg-white/5 p-6 rounded-2xl border border-white/5 group hover:bg-white/10 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center font-bold text-white shadow-lg flex-shrink-0">
                        {index + 1}
                      </div>
                      <p className="text-gray-200 leading-relaxed font-light pt-1">
                        {factor}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fear vs Desire */}
              <div className="md-card p-10 glow-card border-rose-500/20 bg-rose-500/5">
                <h2 className="text-3xl font-light mb-8 text-rose-200 flex items-center">
                  <span className="material-symbols-outlined mr-3 text-rose-400 text-3xl">theater_comedy</span>
                  Fear vs Desire
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                    <h3 className="text-xs uppercase tracking-widest text-rose-400 mb-4 font-bold">Fears</h3>
                    <div className="space-y-3">
                      {interpretation.fearVsDesire.fears.map((fear, index) => (
                        <div key={index} className="bg-rose-500/5 p-4 rounded-xl border border-rose-500/10">
                          <p className="text-gray-300 font-light leading-relaxed">{fear}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                    <h3 className="text-xs uppercase tracking-widest text-green-400 mb-4 font-bold">Desires</h3>
                    <div className="space-y-3">
                      {interpretation.fearVsDesire.desires.map((desire, index) => (
                        <div key={index} className="bg-green-500/5 p-4 rounded-xl border border-green-500/10">
                          <p className="text-gray-200 font-light leading-relaxed">{desire}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Reframing Questions */}
              <div className="md-card p-10 glow-card border-indigo-500/20 bg-indigo-500/5">
                <h2 className="text-3xl font-light mb-8 text-indigo-200 flex items-center">
                  <span className="material-symbols-outlined mr-3 text-indigo-400 text-3xl">psychology</span>
                  Reframing Questions
                </h2>
                <div className="space-y-4">
                  {interpretation.reframingQuestions.map((question, index) => (
                    <div
                      key={index}
                      className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors"
                    >
                      <p className="text-gray-300 leading-relaxed italic font-light text-lg">
                        "{question}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* What If Reversed */}
              <div className="md-card p-10 glow-card border-cyan-500/20 bg-cyan-500/5">
                <h2 className="text-2xl font-bold mb-6 text-cyan-200 flex items-center">
                  <span className="material-symbols-outlined mr-3 text-cyan-400">sync</span>
                  What if Reversed?
                </h2>
                <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                  <p className="text-gray-200 leading-relaxed text-lg font-light">
                    {interpretation.whatIfReversed}
                  </p>
                </div>
              </div>

              {/* True Cost */}
              <div className="md-card p-10 glow-card border-orange-500/20 bg-orange-500/5">
                <h2 className="text-2xl font-bold mb-6 text-orange-200 flex items-center">
                  <span className="material-symbols-outlined mr-3 text-orange-400">payments</span>
                  True Cost
                </h2>
                <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                  <p className="text-gray-200 leading-relaxed text-lg font-light">
                    {interpretation.trueCost}
                  </p>
                </div>
              </div>

              {/* Signals to Watch */}
              <div className="md-card p-10 glow-card border-emerald-500/20 bg-emerald-500/5">
                <h2 className="text-3xl font-light mb-8 text-emerald-200 flex items-center">
                  <span className="material-symbols-outlined mr-3 text-emerald-400 text-3xl">sensors</span>
                  Signals to Watch for
                </h2>
                <div className="space-y-4">
                  {interpretation.signalsToWatch.map((signal, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-4 bg-white/5 p-6 rounded-2xl border border-white/5 relative group hover:bg-white/10 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-white shadow-lg flex-shrink-0">
                        {index + 1}
                      </div>
                      <p className="text-gray-200 leading-relaxed font-light pt-1">
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
    </>
  );
};

export default DecisionClarifier;
