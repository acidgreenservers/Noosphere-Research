import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SubconsciousJournalInterpreter = () => {
  const [journalText, setJournalText] = useState('');
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

  const interpretJournal = async () => {
    if (!journalText.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      // Use demo response
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API delay
      const reflection = `Looking at these words, I see a quiet persistence beneath the surface. The way certain thoughts circle back, not with urgency, but with a gentle insistence that suggests they're carrying something important that hasn't yet found its full expression.

There's a pattern of seeking - not just answers, but perhaps a deeper kind of understanding. The spaces between sentences hold a certain weight, as if the writer is listening to something just out of reach.

What emerges most clearly is a mind engaged in its own exploration, turning over stones not to find something specific, but to understand the nature of the ground itself.`;

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

  return (
    <>
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
                    onClick={interpretJournal}
                    disabled={!journalText.trim()}
                    className="flex-1 md:flex-none px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed border border-white/10"
                  >
                    Use Demo
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Journal Input Section */}
          <div className="md-card p-10 glow-card mb-12">
            <div className="mb-8">
              <label className="block text-purple-300 mb-4 text-xl font-medium flex items-center">
                <span className="material-symbols-outlined mr-3 text-purple-400">psychology</span>
                Paste your internal dialogue...
              </label>
              <textarea
                value={journalText}
                onChange={(e) => setJournalText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Write or paste your journal entry here. Focus on the internal voices or conflicting thoughts you're experiencing..."
                className="w-full h-64 bg-white/5 border border-white/10 rounded-2xl p-6 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all resize-none leading-relaxed"
              />
            </div>

            <button
              onClick={interpretJournal}
              disabled={isLoading || !journalText.trim()}
              className={`w-full py-5 px-8 rounded-full font-bold transition-all duration-500 flex items-center justify-center gap-3 text-xl group overflow-hidden relative ${isLoading || !journalText.trim()
                ? 'bg-white/5 border border-white/10 text-gray-500 cursor-not-allowed'
                : 'md-button shadow-xl shadow-purple-500/20 active:scale-95 hover:scale-[1.02]'
                }`}
            >
              {isLoading ? (
                <>
                  <span className="material-symbols-outlined w-7 h-7 animate-spin">progress_activity</span>
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-2xl group-hover:rotate-12 transition-transform">headset_mic</span>
                  <span>Listen to Internal Voices</span>
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

          {/* Interpretation Section */}
          {interpretation && (
            <div className={`${isAnimating ? 'animate-fade-in' : ''}`}>
              {/* Reflection */}
              <div className="md-card p-10 glow-card border-purple-500/20 bg-purple-500/5">
                <div className="prose prose-invert prose-lg max-w-none">
                  <div className="text-gray-200 leading-relaxed whitespace-pre-wrap font-serif text-xl italic font-light drop-shadow-sm">
                    {interpretation.reflection}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SubconsciousJournalInterpreter;
