import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const StageComponent = (stage, idx) => (
  <div key={idx} className="bg-white/5 p-6 rounded-2xl border border-white/5 group hover:bg-white/10 transition-colors">
    <div className="flex items-center mb-4">
      <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-white shadow-lg mr-4 group-hover:scale-110 transition-transform">
        {idx + 1}
      </div>
      <h3 className={`text-lg font-bold ${stage.color}`}>{stage.title}</h3>
    </div>
    <p className="text-gray-300 leading-relaxed font-light">
      {stage.content}
    </p>
  </div>
);

const PatternSpotter = () => {
  const [situationText, setSituationText] = useState('');
  const [interpretation, setInterpretation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Animation effect for new results
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
      // Simulate API delay for demo feel
      await new Promise(resolve => setTimeout(resolve, 2000));

      const mockResponse = {
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

      setInterpretation(mockResponse);
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

          {/* Enhance with AI Placeholder (Visual Only) */}
          <div className="max-w-4xl mx-auto mb-8">
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
                    disabled
                    className="flex-1 md:flex-none px-6 py-2 bg-amber-600/50 text-white/50 rounded-full cursor-not-allowed transition-colors text-sm font-medium shadow-lg shadow-amber-900/20"
                    title="API Key functionality temporarily disabled"
                  >
                    Add API Key
                  </button>
                  <button
                    onClick={spotPattern}
                    disabled={!situationText.trim()}
                    className="flex-1 md:flex-none px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed border border-white/10"
                  >
                    Use Demo
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Input Section */}
          <div className="md-card p-10 glow-card mb-12">
            <div className="mb-8">
              <label className="block text-purple-300 mb-4 text-xl font-medium flex items-center">
                <span className="material-symbols-outlined mr-3 text-purple-400">psychology</span>
                Describe your recurring situation...
              </label>
              <textarea
                value={situationText}
                onChange={(e) => setSituationText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="What keeps happening? Who is involved? How does it usually start? How does it end? Describe the cycle you feel stuck in..."
                className="w-full h-64 bg-white/5 border border-white/10 rounded-2xl p-6 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all resize-none leading-relaxed"
              />
            </div>

            <button
              onClick={spotPattern}
              disabled={isLoading || !situationText.trim()}
              className={`w-full py-5 px-8 rounded-full font-bold transition-all duration-500 flex items-center justify-center gap-3 text-xl group overflow-hidden relative ${isLoading || !situationText.trim()
                ? 'bg-white/5 border border-white/10 text-gray-500 cursor-not-allowed'
                : 'md-button shadow-xl shadow-purple-500/20 active:scale-95 hover:scale-[1.02]'
                }`}
            >
              {isLoading ? (
                <>
                  <span className="material-symbols-outlined w-7 h-7 animate-spin">progress_activity</span>
                  <span>Spotting Pattern...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-2xl group-hover:rotate-12 transition-transform">search</span>
                  <span>Spot the Pattern</span>
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

          {/* Results Analysis */}
          {interpretation && (
            <div className={`space-y-6 ${isAnimating ? 'animate-fade-in' : ''}`}>
              {/* Trigger Points */}
              <div className="md-card p-10 glow-card border-orange-500/20 bg-orange-500/5">
                <h2 className="text-3xl font-light mb-8 text-orange-200 flex items-center">
                  <span className="material-symbols-outlined mr-3 text-orange-400 text-3xl">bolt</span>
                  Trigger Points
                </h2>
                <div className="space-y-4">
                  {interpretation.triggerPoints.map((item, index) => (
                    <div key={index} className="bg-white/5 p-6 rounded-2xl border border-white/5 group hover:bg-white/10 transition-colors">
                      <h3 className="text-xl font-bold text-orange-300 mb-2">{item.trigger}</h3>
                      <p className="text-gray-300 leading-relaxed font-light">
                        {item.why}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Your Role */}
              <div className="md-card p-10 glow-card border-blue-500/20 bg-blue-500/5">
                <h2 className="text-3xl font-light mb-8 text-blue-200 flex items-center">
                  <span className="material-symbols-outlined mr-3 text-blue-400 text-3xl">person</span>
                  Your Role in this Pattern
                </h2>
                <div className="bg-white/5 p-6 rounded-2xl border border-white/5 font-light">
                  <p className="text-gray-200 leading-relaxed text-lg">
                    {interpretation.yourRole}
                  </p>
                </div>
              </div>

              {/* Systemic Dynamics */}
              <div className="md-card p-10 glow-card border-purple-500/20 bg-purple-500/5">
                <h2 className="text-3xl font-light mb-8 text-purple-200 flex items-center">
                  <span className="material-symbols-outlined mr-3 text-purple-400 text-3xl">cyclone</span>
                  Systemic Forces at Play
                </h2>
                <div className="space-y-4">
                  {interpretation.systemicDynamics.map((dynamic, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-4 bg-white/5 p-6 rounded-2xl border border-white/5 relative group hover:bg-white/10 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center font-bold text-white shadow-lg flex-shrink-0">
                        {index + 1}
                      </div>
                      <p className="text-gray-200 leading-relaxed font-light pt-1">
                        {dynamic}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* What Stays Hidden */}
              <div className="md-card p-10 glow-card border-slate-500/20 bg-slate-500/5">
                <h2 className="text-3xl font-light mb-8 text-slate-200 flex items-center">
                  <span className="material-symbols-outlined mr-3 text-slate-400 text-3xl">mask</span>
                  What Stays Hidden
                </h2>
                <div className="bg-white/5 p-8 rounded-3xl border border-white/5 text-center">
                  <p className="text-xl text-gray-200 leading-relaxed font-light italic max-w-3xl mx-auto">
                    "{interpretation.whatStaysHidden}"
                  </p>
                </div>
              </div>

              {/* Secondary Gains */}
              <div className="md-card p-10 glow-card border-amber-500/20 bg-amber-500/5">
                <h2 className="text-3xl font-light mb-8 text-amber-200 flex items-center">
                  <span className="material-symbols-outlined mr-3 text-amber-400 text-3xl">redeem</span>
                  Hidden Benefits
                </h2>
                <div className="space-y-4">
                  {interpretation.secondaryGains.map((gain, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-4 bg-white/5 p-5 rounded-2xl border border-white/5 group hover:bg-white/10 transition-colors"
                    >
                      <span className="text-amber-400 text-2xl mt-0.5">•</span>
                      <p className="text-gray-200 leading-relaxed font-light">
                        {gain}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* The Loop */}
              <div className="md-card p-10 glow-card border-indigo-500/20 bg-indigo-500/5">
                <h2 className="text-3xl font-light mb-8 text-indigo-200 flex items-center">
                  <span className="material-symbols-outlined mr-3 text-indigo-400 text-3xl">all_inclusive</span>
                  The Loop
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { title: "How it starts", content: interpretation.theLoop.stage1, color: "text-indigo-400" },
                    { title: "How it develops", content: interpretation.theLoop.stage2, color: "text-blue-400" },
                    { title: "How it reinforces", content: interpretation.theLoop.stage3, color: "text-purple-400" },
                    { title: "How it resets", content: interpretation.theLoop.stage4, color: "text-indigo-300" }
                  ].map((stage, idx) => (StageComponent(stage, idx)))}
                </div>
              </div>

              {/* Leverage Points */}
              <div className="md-card p-10 glow-card border-emerald-500/20 bg-emerald-500/5">
                <h2 className="text-3xl font-light mb-8 text-emerald-200 flex items-center">
                  <span className="material-symbols-outlined mr-3 text-emerald-400 text-3xl">point_scan</span>
                  Leverage Points for Change
                </h2>
                <div className="space-y-6">
                  {interpretation.leveragePoints.map((item, index) => (
                    <div key={index} className="bg-white/5 p-6 rounded-2xl border border-white/5 group hover:bg-white/10 transition-colors">
                      <h3 className="text-xl font-bold text-emerald-300 mb-2">{item.point}</h3>
                      <p className="text-gray-300 leading-relaxed font-light">
                        <span className="text-emerald-400 font-bold uppercase text-xs tracking-widest mr-2">Intervention:</span> {item.how}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Deeper Question */}
              <div className="md-card p-10 glow-card border-rose-500/20 bg-rose-500/5">
                <h2 className="text-2xl font-bold mb-6 text-rose-300 flex items-center text-center justify-center">
                  <span className="material-symbols-outlined mr-3 text-rose-400">help_center</span>
                  The Deeper Question
                </h2>
                <div className="bg-white/5 p-8 rounded-3xl border border-rose-500/10 text-center">
                  <p className="text-xl text-gray-200 leading-relaxed font-light italic max-w-3xl mx-auto">
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
