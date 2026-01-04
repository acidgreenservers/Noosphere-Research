import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const RelationshipConflictInterpreter = () => {
  const [person1Text, setPerson1Text] = useState('');
  const [person2Text, setPerson2Text] = useState('');
  const [person1Name, setPerson1Name] = useState('Person 1');
  const [person2Name, setPerson2Name] = useState('Person 2');
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
    if (!person1Text.trim() || !person2Text.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      // Use demo response
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API delay
      const parsedResponse = {
        "whatsBeneathTheSurface": "This conflict is really about both partners feeling unseen and unheard in their relationship, with each person desperately wanting to feel valued and understood by the other, but expressing it through frustration and criticism rather than vulnerability.",
        "person1": {
          "name": person1Name,
          "underlyingNeeds": ["emotional safety", "feeling valued", "open communication"],
          "emotions": ["frustrated", "hurt", "lonely"],
          "whatTheyreReallySaying": "I feel like I'm giving so much and not getting back what I need to feel loved and secure in this relationship",
          "blindSpots": ["The impact their own withdrawal has on creating distance", "How their criticism might be pushing their partner away"],
          "reflectionForThem": "When you express your hurt through criticism, it might be protecting you from the vulnerability of directly asking for what you need, but it also creates the very distance you're afraid of"
        },
        "person2": {
          "name": person2Name,
          "underlyingNeeds": ["respect", "understanding", "space to process"],
          "emotions": ["defensive", "overwhelmed", "inadequate"],
          "whatTheyreReallySaying": "I feel like no matter what I do, it's never enough, and I'm constantly being judged and found wanting",
          "blindSpots": ["How their withdrawal makes their partner feel abandoned", "The impact of not expressing appreciation for what they do receive"],
          "reflectionForThem": "Your defensiveness might be protecting you from feeling inadequate, but it also prevents your partner from knowing how much you care and want to make things better"
        },
        "thePatternAtPlay": "This is the classic pursuer-distancer dynamic, where one person pursues connection through criticism when they feel disconnected, while the other distances through defensiveness when they feel criticized, creating a cycle that reinforces the original disconnection.",
        "whereYouActuallyAgree": "Both of you want a relationship where you feel valued, safe, and connected - you both want to be seen and appreciated for who you are and what you bring to the relationship.",
        "bridgeStatements": {
          "forPerson1ToSay": "I know I'm coming across as critical right now, and that's not what I want. What I really need is to feel like you see me and value me. Can we talk about what would help me feel more connected to you?",
          "forPerson2ToSay": "I can see how my defensiveness hurts you, and I'm sorry for that. I want to be there for you better. Can you help me understand what you need from me when you're feeling this way?"
        },
        "theRepairPath": [
          "Take a 24-hour pause to cool down and reflect individually before continuing the conversation",
          "Each person identifies one specific thing they need from the other to feel more secure",
          "Practice expressing needs without criticism, and receiving them without defensiveness",
          "Set up regular check-ins to prevent small disconnects from becoming big conflicts"
        ],
        "deeperInvitation": "What if this conflict isn't about who's right or wrong, but about two people who both deeply care about each other and want to love each other better? What if you could approach each other from that place of shared caring, even in the middle of disagreement?"
      };

      setInterpretation(parsedResponse);
    } catch (err) {
      setError(err.message || 'Unable to interpret this conflict. Please try again.');
      console.error('Error interpreting conflict:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen p-6 pt-24">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="md-card p-10 glow-card mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 glow-text text-white">
                💕 Relationship Conflict Interpreter 💕
              </h1>
              <h2 className="text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4 font-light">
                Two perspectives, one understanding ✨
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
                    disabled={!person1Text.trim() || !person2Text.trim()}
                    className="flex-1 md:flex-none px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed border border-white/10"
                  >
                    Use Demo
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Input Sections */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Person 1 Input */}
            <div className="md-card p-8 glow-card border-rose-500/20">
              <label className="block text-rose-300 mb-4 text-xl font-medium flex items-center justify-between">
                <div className="flex items-center">
                  <span className="material-symbols-outlined mr-2">face_3</span>
                  <input
                    type="text"
                    value={person1Name}
                    onChange={(e) => setPerson1Name(e.target.value)}
                    className="bg-transparent border-b border-rose-500/30 text-rose-300 focus:outline-none focus:border-rose-500 transition-colors w-32"
                  />
                </div>
                <span className="text-sm text-gray-400">'s Perspective</span>
              </label>
              <textarea
                value={person1Text}
                onChange={(e) => setPerson1Text(e.target.value)}
                placeholder={`What happened from ${person1Name}'s perspective? How are they feeling?`}
                className="w-full h-64 bg-white/5 border border-white/10 rounded-2xl p-6 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all resize-none leading-relaxed"
              />
            </div>

            {/* Person 2 Input */}
            <div className="md-card p-8 glow-card border-purple-500/20">
              <label className="block text-purple-300 mb-4 text-xl font-medium flex items-center justify-between">
                <div className="flex items-center">
                  <span className="material-symbols-outlined mr-2">face_6</span>
                  <input
                    type="text"
                    value={person2Name}
                    onChange={(e) => setPerson2Name(e.target.value)}
                    className="bg-transparent border-b border-purple-500/30 text-purple-300 focus:outline-none focus:border-purple-500 transition-colors w-32"
                  />
                </div>
                <span className="text-sm text-gray-400">'s Perspective</span>
              </label>
              <textarea
                value={person2Text}
                onChange={(e) => setPerson2Text(e.target.value)}
                placeholder={`What happened from ${person2Name}'s perspective? How are they feeling?`}
                className="w-full h-64 bg-white/5 border border-white/10 rounded-2xl p-6 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all resize-none leading-relaxed"
              />
            </div>
          </div>

          {/* Interpret Button */}
          <div className="max-w-2xl mx-auto mb-16">
            <button
              onClick={interpretConflict}
              disabled={isLoading || !person1Text.trim() || !person2Text.trim()}
              className={`w-full py-5 px-8 rounded-full font-bold transition-all duration-500 flex items-center justify-center gap-3 text-xl group overflow-hidden relative ${isLoading || !person1Text.trim() || !person2Text.trim()
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
                  <span>Interpret Relationship Dynamics</span>
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

          {/* Interpretation Results */}
          {interpretation && (
            <div className={`${isAnimating ? 'animate-fade-in' : ''}`}>
              <div className="space-y-6">
                {/* What's Beneath the Surface */}
                <div className="md-card p-10 glow-card border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-orange-500/5">
                  <h2 className="text-3xl font-light mb-6 text-amber-200 flex items-center">
                    <span className="material-symbols-outlined mr-3 text-amber-400 text-3xl">psychology</span>
                    Beneath the Surface
                  </h2>
                  <p className="text-xl text-gray-200 leading-relaxed font-light italic">
                    {interpretation.whatsBeneathTheSurface}
                  </p>
                </div>

                {/* Person 1's Understanding */}
                <div className="md-card p-8 glow-card border-rose-500/20">
                  <h2 className="text-2xl font-bold mb-8 text-rose-300 flex items-center">
                    <span className="material-symbols-outlined mr-3 text-rose-400">face_3</span>
                    Understanding {interpretation.person1.name}
                  </h2>

                  <div className="space-y-8">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-3 ml-1">Underlying Needs</h3>
                        <div className="flex flex-wrap gap-2">
                          {interpretation.person1.underlyingNeeds.map((need, index) => (
                            <span key={index} className="bg-rose-500/10 px-3 py-1 rounded-full text-rose-200 text-xs border border-rose-500/20">{need}</span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-3 ml-1">Emotional State</h3>
                        <div className="flex flex-wrap gap-2">
                          {interpretation.person1.emotions.map((emotion, index) => (
                            <span key={index} className="bg-pink-500/10 px-3 py-1 rounded-full text-pink-200 text-xs border border-pink-500/20">{emotion}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                      <h4 className="text-sm font-bold text-rose-400 mb-2">The Unspoken Message:</h4>
                      <p className="text-gray-300 italic">"{interpretation.person1.whatTheyreReallySaying}"</p>
                    </div>

                    <div>
                      <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-3 ml-1">Blind Spots</h3>
                      <div className="space-y-3">
                        {interpretation.person1.blindSpots.map((spot, index) => (
                          <div key={index} className="bg-white/5 p-4 rounded-xl border border-white/5">
                            <p className="text-gray-300 text-sm leading-relaxed">{spot}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-rose-500/10 to-pink-500/10 p-6 rounded-2xl border border-rose-500/20">
                      <h3 className="text-sm font-bold text-rose-200 mb-2">Personal Reflection:</h3>
                      <p className="text-gray-300 leading-relaxed font-light">
                        {interpretation.person1.reflectionForThem}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Person 2's Understanding */}
                <div className="md-card p-8 glow-card border-purple-500/20">
                  <h2 className="text-2xl font-bold mb-8 text-purple-300 flex items-center">
                    <span className="material-symbols-outlined mr-3 text-purple-400">face_6</span>
                    Understanding {interpretation.person2.name}
                  </h2>

                  <div className="space-y-8">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-3 ml-1">Underlying Needs</h3>
                        <div className="flex flex-wrap gap-2">
                          {interpretation.person2.underlyingNeeds.map((need, index) => (
                            <span key={index} className="bg-purple-500/10 px-3 py-1 rounded-full text-purple-200 text-xs border border-purple-500/20">{need}</span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-3 ml-1">Emotional State</h3>
                        <div className="flex flex-wrap gap-2">
                          {interpretation.person2.emotions.map((emotion, index) => (
                            <span key={index} className="bg-indigo-500/10 px-3 py-1 rounded-full text-indigo-200 text-xs border border-indigo-500/20">{emotion}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                      <h4 className="text-sm font-bold text-purple-400 mb-2">The Unspoken Message:</h4>
                      <p className="text-gray-300 italic">"{interpretation.person2.whatTheyreReallySaying}"</p>
                    </div>

                    <div>
                      <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-3 ml-1">Blind Spots</h3>
                      <div className="space-y-3">
                        {interpretation.person2.blindSpots.map((spot, index) => (
                          <div key={index} className="bg-white/5 p-4 rounded-xl border border-white/5">
                            <p className="text-gray-300 text-sm leading-relaxed">{spot}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-purple-500/10 to-indigo-500/10 p-6 rounded-2xl border border-purple-500/20">
                      <h3 className="text-sm font-bold text-purple-200 mb-2">Personal Reflection:</h3>
                      <p className="text-gray-300 leading-relaxed font-light">
                        {interpretation.person2.reflectionForThem}
                      </p>
                    </div>
                  </div>
                </div>

                {/* The Pattern at Play */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 shadow-lg border border-blue-200">
                  <h2 className="text-2xl font-light mb-4 text-gray-800 flex items-center">
                    <span className="text-2xl mr-2">🔄</span>
                    The pattern at play
                  </h2>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {interpretation.thePatternAtPlay}
                  </p>
                </div>

                {/* Where You Actually Agree */}
                <div className="md-card p-10 glow-card border-green-500/20 bg-green-500/5">
                  <h2 className="text-2xl font-bold mb-6 text-green-300 flex items-center">
                    <span className="material-symbols-outlined mr-3 text-green-400">handshake</span>
                    Where You Actually Agree
                  </h2>
                  <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                    <p className="text-gray-200 leading-relaxed font-light">
                      {interpretation.whereYouActuallyAgree}
                    </p>
                  </div>
                </div>

                {/* Bridge Statements */}
                <div className="md-card p-10 glow-card border-indigo-500/20 bg-indigo-500/5">
                  <h2 className="text-3xl font-light mb-8 text-indigo-200 flex items-center">
                    <span className="material-symbols-outlined mr-3 text-indigo-400 text-3xl">leak_add</span>
                    Bridge Statements
                  </h2>
                  <div className="space-y-4">
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                      <h4 className="text-sm font-bold text-rose-400 mb-2">For {person1Name} to say:</h4>
                      <p className="text-gray-300 italic">"{interpretation.bridgeStatements.forPerson1ToSay}"</p>
                    </div>
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                      <h4 className="text-sm font-bold text-purple-400 mb-2">For {person2Name} to say:</h4>
                      <p className="text-gray-300 italic">"{interpretation.bridgeStatements.forPerson2ToSay}"</p>
                    </div>
                  </div>
                </div>

                {/* The Repair Path */}
                <div className="md-card p-10 glow-card border-teal-500/20 bg-teal-500/5">
                  <h2 className="text-3xl font-light mb-8 text-teal-200 flex items-center">
                    <span className="material-symbols-outlined mr-3 text-teal-400 text-3xl">nature_people</span>
                    The Repair Path
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6 mb-10">
                    {interpretation.theRepairPath.map((step, index) => (
                      <div
                        key={index}
                        className="bg-white/5 p-6 rounded-2xl border border-white/5 relative group hover:bg-white/10 transition-colors"
                      >
                        <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center font-bold text-white shadow-lg flex-shrink-0">
                          {index + 1}
                        </div>
                        <p className="text-gray-200 leading-relaxed mt-2">
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Deeper Invitation */}
                <div className="md-card p-10 glow-card border-rose-500/20 bg-rose-500/5">
                  <h2 className="text-2xl font-bold mb-6 text-rose-300 flex items-center text-center justify-center">
                    <span className="material-symbols-outlined mr-3 text-rose-400">auto_awesome</span>
                    Deeper Invitation
                  </h2>
                  <div className="bg-white/5 p-8 rounded-3xl border border-rose-500/10 text-center">
                    <p className="text-xl text-gray-200 leading-relaxed font-light italic max-w-3xl mx-auto">
                      {interpretation.deeperInvitation}
                    </p>
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

export default RelationshipConflictInterpreter;
