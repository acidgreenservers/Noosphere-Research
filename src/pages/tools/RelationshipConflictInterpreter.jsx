import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Loader2, Users } from 'lucide-react';


const RelationshipConflictInterpreter = () => {
  const [person1Text, setPerson1Text] = useState('');
  const [person2Text, setPerson2Text] = useState('');
  const [person1Name, setPerson1Name] = useState('Person 1');
  const [person2Name, setPerson2Name] = useState('Person 2');
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
    if (!person1Text.trim() || !person2Text.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const prompt = `You are a compassionate relationship mediator with expertise in nonviolent communication and couples therapy. Two people in a relationship have shared their perspectives on a conflict. Help them both see what's really happening beneath the surface.

${person1Name}'s perspective: "${person1Text}"

${person2Name}'s perspective: "${person2Text}"

Please respond with a JSON object containing:
{
  "whatsBeneathTheSurface": "what this conflict is really about - the deeper issue both people are dancing around",
  "person1": {
    "name": "${person1Name}",
    "underlyingNeeds": ["need1", "need2", "need3"],
    "emotions": ["emotion1", "emotion2"],
    "whatTheyreReallySaying": "translation of their deeper message",
    "blindSpots": ["thing they might not be seeing", "another blindspot"],
    "reflectionForThem": "compassionate reflection specifically for this person to consider"
  },
  "person2": {
    "name": "${person2Name}",
    "underlyingNeeds": ["need1", "need2", "need3"],
    "emotions": ["emotion1", "emotion2"],
    "whatTheyreReallySaying": "translation of their deeper message",
    "blindSpots": ["thing they might not be seeing", "another blindspot"],
    "reflectionForThem": "compassionate reflection specifically for this person to consider"
  },
  "thePatternAtPlay": "the recurring dynamic or pattern this conflict is part of",
  "whereYouActuallyAgree": "hidden common ground - what both people actually want that's similar",
  "bridgeStatements": {
    "forPerson1ToSay": "statement that would help person 2 feel heard",
    "forPerson2ToSay": "statement that would help person 1 feel heard"
  },
  "theRepairPath": [
    "first step toward resolution",
    "second step",
    "third step"
  ],
  "deeperInvitation": "an invitation for both people to consider about their relationship and this moment"
}

Be deeply insightful, fair to both perspectives, and focused on helping them understand each other and reconnect. Don't take sides - help them see the system they're in together.`;

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
          "whatsBeneathTheSurface": "This conflict is really about both partners feeling unseen and unheard in their relationship, with each person desperately wanting to feel valued and understood by the other, but expressing it through frustration and criticism rather than vulnerability.",
          "person1": {
            "name": "Person 1",
            "underlyingNeeds": ["emotional safety", "feeling valued", "open communication"],
            "emotions": ["frustrated", "hurt", "lonely"],
            "whatTheyreReallySaying": "I feel like I'm giving so much and not getting back what I need to feel loved and secure in this relationship",
            "blindSpots": ["The impact their own withdrawal has on creating distance", "How their criticism might be pushing their partner away"],
            "reflectionForThem": "When you express your hurt through criticism, it might be protecting you from the vulnerability of directly asking for what you need, but it also creates the very distance you're afraid of"
          },
          "person2": {
            "name": "Person 2",
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
      }

      setInterpretation(parsedResponse);
    } catch (err) {
      setError(err.message || 'Unable to interpret this conflict. Please try again.');
      console.error('Error interpreting conflict:', err);
    } finally {
      setIsLoading(false);
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
                      onClick={interpretConflict}
                      disabled={!person1Text.trim() || !person2Text.trim()}
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

          {/* Names Input */}
          <div className="md-card p-6 mb-6 shadow-lg border border-white/10 bg-white/5">
            <div className="grid md-grid-cols-2 gap-6">
              <div>
                <label className="block text-rose-300 mb-2 text-sm font-medium">
                  Person 1's name
                </label>
                <input
                  type="text"
                  value={person1Name}
                  onChange={(e) => setPerson1Name(e.target.value)}
                  placeholder="Name"
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-gray-200 placeholder-gray-400 focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-500 transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-purple-300 mb-2 text-sm font-medium">
                  Person 2's name
                </label>
                <input
                  type="text"
                  value={person2Name}
                  onChange={(e) => setPerson2Name(e.target.value)}
                  placeholder="Name"
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-gray-200 placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-500 transition-all duration-300"
                />
              </div>
            </div>
          </div>

          {/* Input Sections */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Person 1 Input */}
            <div className="md-card p-8 glow-card border-rose-500/20">
              <label className="block text-rose-300 mb-4 text-xl font-medium flex items-center">
                <span className="material-symbols-outlined mr-2">face_3</span>
                {person1Name}'s Perspective
              </label>
              <textarea
                value={person1Text}
                onChange={(e) => setPerson1Text(e.target.value)}
                placeholder="What happened from your perspective? How are you feeling? What matters to you here?"
                className="w-full h-64 bg-white/5 border border-white/10 rounded-2xl p-6 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all resize-none leading-relaxed"
              />
            </div>

            {/* Person 2 Input */}
            <div className="md-card p-8 glow-card border-purple-500/20">
              <label className="block text-purple-300 mb-4 text-xl font-medium flex items-center">
                <span className="material-symbols-outlined mr-2">face_6</span>
                {person2Name}'s Perspective
              </label>
              <textarea
                value={person2Text}
                onChange={(e) => setPerson2Text(e.target.value)}
                placeholder="What happened from your perspective? How are you feeling? What matters to you here?"
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
                  <Loader2 className="w-7 h-7 animate-spin" />
                  <span>Interpreting Dynamics...</span>
                </>
              ) : (
                <>
                  <Users className="w-7 h-7 group-hover:rotate-12 transition-transform" />
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

          {/* PRESERVED ORIGINAL OUTPUT FORMAT - Dual Perspective Relationship Analysis */}
          {interpretation && (
            <div className={`space-y-6 ${isAnimating ? 'animate-fade-in' : ''}`}>
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
          )}
        </div>
      </div>
    </>
  );
};

export default RelationshipConflictInterpreter;
