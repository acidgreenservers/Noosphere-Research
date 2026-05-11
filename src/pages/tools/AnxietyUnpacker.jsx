import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';



const AnxietyUnpacker = () => {
  const [anxietyText, setAnxietyText] = useState('');
  const [interpretation, setInterpretation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

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
                      onClick={unpackAnxiety}
                      disabled={!anxietyText.trim()}
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

          {/* Anxiety Input Section */}
          <div className="md-card p-10 glow-card mb-12">
            <div className="mb-8">
              <label className="block text-purple-300 mb-4 text-xl font-medium flex items-center">
                <span className="material-symbols-outlined mr-3 text-purple-400">water_drop</span>
                What's racing through your mind?
              </label>
              <textarea
                value={anxietyText}
                onChange={(e) => setAnxietyText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Let it all out... What are you anxious about? What thoughts keep spinning? What scenarios keep playing in your head? Just write it all down without filtering..."
                className="w-full h-64 bg-white/5 border border-white/10 rounded-2xl p-6 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all resize-none leading-relaxed"
              />
            </div>

            <button
              onClick={unpackAnxiety}
              disabled={isLoading || !anxietyText.trim()}
              className={`w-full py-5 px-8 rounded-full font-bold transition-all duration-500 flex items-center justify-center gap-3 text-xl group overflow-hidden relative ${isLoading || !anxietyText.trim()
                ? 'bg-white/5 border border-white/10 text-gray-500 cursor-not-allowed'
                : 'md-button shadow-xl shadow-purple-500/20 active:scale-95 hover:scale-[1.02]'
                }`}
            >
              {isLoading ? (
                <>
                  <span className="material-symbols-outlined w-7 h-7 animate-spin">progress_activity</span>
                  <span>Unpacking Anxiety...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-2xl group-hover:rotate-12 transition-transform">water_drop</span>
                  <span>Unpack this Anxiety</span>
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

          {/* PRESERVED ORIGINAL OUTPUT FORMAT - Anxiety Analysis */}
          {interpretation && (
            <div className={`space-y-6 ${isAnimating ? 'animate-fade-in' : ''}`}>
              {/* Root Fears */}
              <div className="md-card p-10 glow-card border-red-500/20 bg-red-500/5">
                <h2 className="text-3xl font-light mb-8 text-rose-200 flex items-center">
                  <span className="material-symbols-outlined mr-3 text-rose-400 text-3xl">target</span>
                  Root Fears
                </h2>
                <div className="space-y-4">
                  {interpretation.rootFears.map((item, index) => (
                    <div key={index} className="bg-white/5 p-6 rounded-2xl border border-white/5 group hover:bg-white/10 transition-colors">
                      <h3 className="text-xl font-bold text-rose-300 mb-2">{item.fear}</h3>
                      <p className="text-gray-300 leading-relaxed font-light">
                        <span className="text-rose-400 font-bold uppercase text-xs tracking-widest mr-2">Protecting:</span> {item.whatItProtects}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Catastrophic Thinking */}
              <div className="md-card p-10 glow-card border-orange-500/20 bg-orange-500/5">
                <h2 className="text-3xl font-light mb-8 text-orange-200 flex items-center">
                  <span className="material-symbols-outlined mr-3 text-orange-400 text-3xl">warning</span>
                  Catastrophic Thinking
                </h2>
                <div className="space-y-6">
                  <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                    <h3 className="text-xs uppercase tracking-widest text-orange-400 mb-3 font-bold">Worst-Case Scenario</h3>
                    <p className="text-gray-200 text-lg font-light italic leading-relaxed">"{interpretation.catastrophicThinking.worstCase}"</p>
                  </div>

                  <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                    <h3 className="text-xs uppercase tracking-widest text-orange-400 mb-3 font-bold">Realistic Likelihood</h3>
                    <p className="text-gray-200 font-light leading-relaxed">{interpretation.catastrophicThinking.likelihood}</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                      <h3 className="text-xs uppercase tracking-widest text-orange-500 mb-3 font-bold">Evidence For</h3>
                      <p className="text-gray-300 text-sm leading-relaxed">{interpretation.catastrophicThinking.evidenceFor}</p>
                    </div>
                    <div className="bg-green-500/5 p-6 rounded-2xl border border-green-500/20">
                      <h3 className="text-xs uppercase tracking-widest text-green-400 mb-3 font-bold">Evidence Against</h3>
                      <p className="text-gray-200 text-sm leading-relaxed">{interpretation.catastrophicThinking.evidenceAgainst}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Control vs Uncertainty */}
              <div className="md-card p-10 glow-card border-purple-500/20 bg-purple-500/5">
                <h2 className="text-2xl font-bold mb-6 text-purple-200 flex items-center">
                  <span className="material-symbols-outlined mr-3 text-purple-400">theater_comedy</span>
                  Control vs Uncertainty
                </h2>
                <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                  <p className="text-gray-200 leading-relaxed text-lg font-light">
                    {interpretation.controlVsUncertainty}
                  </p>
                </div>
              </div>

              {/* Body Signals */}
              <div className="md-card p-10 glow-card border-blue-500/20 bg-blue-500/5">
                <h2 className="text-2xl font-bold mb-6 text-blue-200 flex items-center">
                  <span className="material-symbols-outlined mr-3 text-blue-400">auto_awesome</span>
                  Body Signals
                </h2>
                <div className="flex flex-wrap gap-3">
                  {interpretation.bodySignals.map((signal, index) => (
                    <span
                      key={index}
                      className="bg-blue-500/10 px-4 py-2 rounded-full text-blue-200 border border-blue-500/20 text-sm tracking-wide"
                    >
                      {signal}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hidden Needs */}
              <div className="md-card p-10 glow-card border-emerald-500/20 bg-emerald-500/5">
                <h2 className="text-2xl font-bold mb-6 text-emerald-200 flex items-center">
                  <span className="material-symbols-outlined mr-3 text-emerald-400">favorite</span>
                  Hidden Needs
                </h2>
                <div className="space-y-4">
                  {interpretation.hiddenNeeds.map((need, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-4 bg-white/5 p-5 rounded-2xl border border-white/5 group hover:bg-white/10 transition-colors"
                    >
                      <span className="text-emerald-400 text-2xl mt-0.5">•</span>
                      <p className="text-gray-200 leading-relaxed font-light">
                        {need}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Thought Distortions */}
              <div className="md-card p-10 glow-card border-indigo-500/20 bg-indigo-500/5">
                <h2 className="text-2xl font-bold mb-8 text-indigo-200 flex items-center">
                  <span className="material-symbols-outlined mr-3 text-indigo-400">psychology</span>
                  Thought Patterns
                </h2>
                <div className="space-y-4">
                  {interpretation.thoughtDistortions.map((item, index) => (
                    <div key={index} className="bg-white/5 p-6 rounded-2xl border border-white/5 group hover:bg-white/10 transition-colors">
                      <h3 className="text-lg font-bold text-indigo-300 mb-2">{item.distortion}</h3>
                      <p className="text-gray-300 leading-relaxed italic font-light">
                        "{item.example}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Grounding Truths */}
              <div className="md-card p-10 glow-card border-teal-500/20 bg-teal-500/5">
                <h2 className="text-3xl font-light mb-8 text-teal-200 flex items-center">
                  <span className="material-symbols-outlined mr-3 text-teal-400 text-3xl">anchor</span>
                  Grounding Truths
                </h2>
                <div className="space-y-4">
                  {interpretation.groundingTruths.map((truth, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-4 bg-white/5 p-6 rounded-2xl border border-white/5 relative group hover:bg-white/10 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center font-bold text-white shadow-lg flex-shrink-0">
                        {index + 1}
                      </div>
                      <p className="text-gray-200 leading-relaxed flex-1 pt-1 font-medium">
                        {truth}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actionable Steps */}
              <div className="md-card p-10 glow-card border-green-500/20 bg-green-500/5">
                <h2 className="text-3xl font-light mb-8 text-green-200 flex items-center">
                  <span className="material-symbols-outlined mr-3 text-green-400 text-3xl">check_circle</span>
                  Actionable Steps
                </h2>
                <div className="space-y-6">
                  {interpretation.actionableSteps.map((item, index) => (
                    <div key={index} className="bg-white/5 p-6 rounded-2xl border border-white/5 group hover:bg-white/10 transition-colors">
                      <h3 className="text-xl font-bold text-green-300 mb-2">{item.step}</h3>
                      <p className="text-gray-300 leading-relaxed font-light">
                        <span className="text-green-400 font-bold uppercase text-xs tracking-widest mr-2">Why:</span> {item.why}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Compassionate Reframe */}
              <div className="md-card p-10 glow-card border-rose-500/20 bg-rose-500/5">
                <h2 className="text-2xl font-bold mb-6 text-rose-300 flex items-center text-center justify-center">
                  <span className="material-symbols-outlined mr-3 text-rose-400">favorite</span>
                  A Gentler Perspective
                </h2>
                <div className="bg-white/5 p-8 rounded-3xl border border-rose-500/10 text-center">
                  <p className="text-xl text-gray-200 leading-relaxed font-light italic max-w-3xl mx-auto">
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
