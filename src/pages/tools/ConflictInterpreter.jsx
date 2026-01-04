import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ConflictInterpreter = () => {
  const [conflictText, setConflictText] = useState('');
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

  const interpretConflict = async () => {
    if (!conflictText.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      // Use demo response
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API delay
      const parsedResponse = {
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
                    onClick={interpretConflict}
                    disabled={!conflictText.trim()}
                    className="flex-1 md:flex-none px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed border border-white/10"
                  >
                    Use Demo
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Conflict Input Section */}
          <div className="md-card p-10 glow-card mb-8">
            <div className="mb-6">
              <label className="block text-purple-300 mb-4 text-xl font-medium flex items-center">
                <span className="material-symbols-outlined mr-2">chat_bubble</span>
                Describe the conflict or disagreement...
              </label>
              <textarea
                value={conflictText}
                onChange={(e) => setConflictText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="What happened? What was said? What are each person's positions? Include as much context as you can..."
                className="w-full h-48 bg-white/5 border border-white/10 rounded-2xl p-6 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all resize-none leading-relaxed"
              />
            </div>

            <button
              onClick={interpretConflict}
              disabled={isLoading || !conflictText.trim()}
              className={`w-full py-5 px-8 rounded-full font-bold transition-all duration-500 flex items-center justify-center gap-3 text-xl group overflow-hidden relative ${isLoading || !conflictText.trim()
                ? 'bg-white/5 border border-white/10 text-gray-500 cursor-not-allowed'
                : 'md-button shadow-xl shadow-purple-500/20 active:scale-95 hover:scale-[1.02]'
                }`}
            >
              {isLoading ? (
                <>
                  <span className="material-symbols-outlined w-7 h-7 animate-spin">progress_activity</span>
                  <span>Interpreting Dynamics...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined w-7 h-7 group-hover:rotate-12 transition-transform">group</span>
                  <span>Understand this conflict</span>
                </>
              )}
              <div className={`absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ${isLoading ? 'hidden' : ''}`}></div>
            </button>

            {error && (
              <div className="mt-6 p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-rose-400 text-center flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">error</span>
                {error}
              </div>
            )}
          </div>

          {/* Interpretation Section - PRESERVED ORIGINAL OUTPUT STYLE */}
          {interpretation && (
            <div className={`space-y-6 ${isAnimating ? 'animate-fade-in' : ''}`}>
              {/* Surface Issue */}
              <div className="md-card p-10 glow-card border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-orange-500/5">
                <h2 className="text-3xl font-light mb-6 text-amber-200 flex items-center">
                  <span className="material-symbols-outlined mr-3 text-amber-400 text-3xl">psychology</span>
                  Surface Issue
                </h2>
                <p className="text-xl text-gray-200 leading-relaxed font-light italic">
                  {interpretation.surfaceIssue}
                </p>
              </div>

              {/* Person 1 */}
              <div className="md-card p-8 glow-card border-blue-500/20">
                <h2 className="text-2xl font-bold mb-8 text-blue-300 flex items-center">
                  <span className="material-symbols-outlined mr-3 text-blue-400">person</span>
                  Person 1's Perspective
                </h2>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-3 ml-1">Underlying Needs</h3>
                    <div className="flex flex-wrap gap-2">
                      {interpretation.person1.underlyingNeeds.map((need, index) => (
                        <span
                          key={index}
                          className="bg-blue-500/10 px-3 py-1 rounded-full text-blue-200 text-xs border border-blue-500/20"
                        >
                          {need}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-3 ml-1">Emotions</h3>
                    <div className="flex flex-wrap gap-2">
                      {interpretation.person1.emotions.map((emotion, index) => (
                        <span
                          key={index}
                          className="bg-purple-500/10 px-3 py-1 rounded-full text-purple-200 text-xs border border-purple-500/20"
                        >
                          {emotion}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                    <p className="text-gray-300 leading-relaxed italic font-light">
                      {interpretation.person1.perspective}
                    </p>
                  </div>
                </div>
              </div>

              {/* Person 2 */}
              <div className="md-card p-8 glow-card border-green-500/20">
                <h2 className="text-2xl font-bold mb-8 text-green-300 flex items-center">
                  <span className="material-symbols-outlined mr-3 text-green-400">person</span>
                  Person 2's Perspective
                </h2>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-3 ml-1">Underlying Needs</h3>
                    <div className="flex flex-wrap gap-2">
                      {interpretation.person2.underlyingNeeds.map((need, index) => (
                        <span
                          key={index}
                          className="bg-green-500/10 px-3 py-1 rounded-full text-green-200 text-xs border border-green-500/20"
                        >
                          {need}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-3 ml-1">Emotions</h3>
                    <div className="flex flex-wrap gap-2">
                      {interpretation.person2.emotions.map((emotion, index) => (
                        <span
                          key={index}
                          className="bg-purple-500/10 px-3 py-1 rounded-full text-purple-200 text-xs border border-purple-500/20"
                        >
                          {emotion}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                    <p className="text-gray-300 leading-relaxed italic font-light">
                      {interpretation.person2.perspective}
                    </p>
                  </div>
                </div>
              </div>

              {/* Shared Values & Common Ground */}
              <div className="md-card p-10 glow-card border-rose-500/20 bg-rose-500/5">
                <h2 className="text-3xl font-light mb-8 text-rose-200 flex items-center">
                  <span className="material-symbols-outlined mr-3 text-rose-400 text-3xl">favorite</span>
                  Common Ground
                </h2>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-4 flex items-center">
                      <span className="material-symbols-outlined w-3 h-3 mr-2 text-green-400 text-xs">favorite</span>
                      You both value:
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {interpretation.sharedValues.map((value, index) => (
                        <span
                          key={index}
                          className="bg-green-500/10 px-4 py-2 rounded-full text-green-300 border border-green-500/20 text-sm"
                        >
                          {value}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white/5 p-8 rounded-3xl border border-rose-500/10 text-center">
                    <p className="text-xl text-gray-200 leading-relaxed font-light italic">
                      "{interpretation.hiddenCommonGround}"
                    </p>
                  </div>
                </div>
              </div>

              {/* Bridge Statements */}
              <div className="md-card p-10 glow-card border-indigo-500/20 bg-indigo-500/5">
                <h2 className="text-3xl font-light mb-8 text-indigo-200 flex items-center">
                  <span className="material-symbols-outlined mr-3 text-indigo-400 text-3xl">leak_add</span>
                  Bridge Statements
                </h2>
                <div className="space-y-4">
                  {interpretation.bridgeStatements.map((statement, index) => (
                    <div
                      key={index}
                      className="bg-white/5 p-6 rounded-2xl border border-white/5"
                    >
                      <p className="text-gray-300 leading-relaxed italic font-light">
                        "{statement}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Next Steps */}
              <div className="md-card p-10 glow-card border-teal-500/20 bg-teal-500/5">
                <h2 className="text-3xl font-light mb-8 text-teal-200 flex items-center">
                  <span className="material-symbols-outlined mr-3 text-teal-400 text-3xl">nature_people</span>
                  Next Steps Forward
                </h2>
                <div className="space-y-6">
                  {interpretation.nextSteps.map((step, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-4 bg-white/5 p-6 rounded-2xl border border-white/5 relative group hover:bg-white/10 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center font-bold text-white shadow-lg flex-shrink-0">
                        {index + 1}
                      </div>
                      <p className="text-gray-200 leading-relaxed flex-1 pt-1">
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
