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
      {/* Tool Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Link to="/" className="md-button-secondary text-sm flex items-center">
                <span className="material-symbols-outlined mr-2">home</span>
                Home
              </Link>
            </div>
            <div className="text-white/70 text-sm">
              Relationship Conflict Interpreter
            </div>
          </div>
        </div>
      </nav>

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
                    disabled={!person1Text.trim() || !person2Text.trim()}
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

          {/* Names Input */}
          <div className="bg-white rounded-2xl p-6 mb-6 shadow-lg border border-gray-200">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2 text-sm font-medium">
                  Person 1's name
                </label>
                <input
                  type="text"
                  value={person1Name}
                  onChange={(e) => setPerson1Name(e.target.value)}
                  placeholder="Name"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-200 transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2 text-sm font-medium">
                  Person 2's name
                </label>
                <input
                  type="text"
                  value={person2Name}
                  onChange={(e) => setPerson2Name(e.target.value)}
                  placeholder="Name"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-all duration-300"
                />
              </div>
            </div>
          </div>

          {/* Input Sections */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Person 1 Input */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-rose-200">
              <label className="block text-gray-700 mb-3 text-lg font-medium flex items-center">
                <span className="bg-rose-100 text-rose-600 rounded-full w-8 h-8 flex items-center justify-center mr-2 text-sm font-bold">1</span>
                {person1Name}'s perspective
              </label>
              <textarea
                value={person1Text}
                onChange={(e) => setPerson1Text(e.target.value)}
                placeholder="What happened from your perspective? How are you feeling? What matters to you here?"
                className="w-full h-64 bg-rose-50 border border-rose-200 rounded-xl p-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-200 transition-all duration-300 resize-none"
              />
            </div>

            {/* Person 2 Input */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-200">
              <label className="block text-gray-700 mb-3 text-lg font-medium flex items-center">
                <span className="bg-purple-100 text-purple-600 rounded-full w-8 h-8 flex items-center justify-center mr-2 text-sm font-bold">2</span>
                {person2Name}'s perspective
              </label>
              <textarea
                value={person2Text}
                onChange={(e) => setPerson2Text(e.target.value)}
                placeholder="What happened from your perspective? How are you feeling? What matters to you here?"
                className="w-full h-64 bg-purple-50 border border-purple-200 rounded-xl p-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-all duration-300 resize-none"
              />
            </div>
          </div>

          {/* Interpret Button */}
          <div className="mb-8">
            <button
              onClick={interpretConflict}
              disabled={isLoading || !person1Text.trim() || !person2Text.trim()}
              className={`w-full py-4 px-6 rounded-xl font-medium transition-all duration-300 ${isLoading || !person1Text.trim() || !person2Text.trim()
                  ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                  : 'bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-600 hover:to-purple-600 text-white transform hover:scale-105 shadow-lg'
                } flex items-center justify-center space-x-2 text-lg`}
            >
              {isLoading ? (
                <>
                  <span className="animate-spin text-xl">⏳</span>
                  <span>Interpreting both perspectives...</span>
                </>
              ) : (
                <>
                  <span className="text-xl">💕</span>
                  <span>Interpret this conflict</span>
                </>
              )}
            </button>

            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                {error}
              </div>
            )}
          </div>

          {/* PRESERVED ORIGINAL OUTPUT FORMAT - Dual Perspective Relationship Analysis */}
          {interpretation && (
            <div className={`space-y-6 ${isAnimating ? 'animate-fade-in' : ''}`}>
              {/* What's Beneath the Surface */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 shadow-lg border border-amber-200">
                <h2 className="text-2xl font-light mb-4 text-gray-800 flex items-center">
                  <span className="text-2xl mr-2">🎭</span>
                  What's beneath the surface
                </h2>
                <p className="text-gray-700 leading-relaxed text-lg font-medium">
                  {interpretation.whatsBeneathTheSurface}
                </p>
              </div>

              {/* Person 1's Understanding */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-rose-200">
                <h2 className="text-2xl font-light mb-6 text-rose-700 flex items-center">
                  <span className="bg-rose-100 text-rose-600 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm font-bold">1</span>
                  Understanding {interpretation.person1.name}
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">Underlying needs:</h3>
                    <div className="flex flex-wrap gap-2">
                      {interpretation.person1.underlyingNeeds.map((need, index) => (
                        <span
                          key={index}
                          className="bg-rose-100 px-4 py-2 rounded-full text-rose-700 text-sm border border-rose-200"
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
                          className="bg-pink-100 px-4 py-2 rounded-full text-pink-700 text-sm border border-pink-200"
                        >
                          {emotion}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-rose-50 p-5 rounded-lg border border-rose-200">
                    <h3 className="font-semibold text-rose-800 mb-2">What they're really saying:</h3>
                    <p className="text-gray-700 leading-relaxed italic">
                      "{interpretation.person1.whatTheyreReallySaying}"
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">Blind spots:</h3>
                    <div className="space-y-2">
                      {interpretation.person1.blindSpots.map((spot, index) => (
                        <div key={index} className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                          <p className="text-gray-700 text-sm">{spot}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-rose-50 to-pink-50 p-5 rounded-lg border border-rose-200">
                    <h3 className="font-semibold text-rose-800 mb-2">Reflection for {interpretation.person1.name}:</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {interpretation.person1.reflectionForThem}
                    </p>
                  </div>
                </div>
              </div>

              {/* Person 2's Understanding */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-purple-200">
                <h2 className="text-2xl font-light mb-6 text-purple-700 flex items-center">
                  <span className="bg-purple-100 text-purple-600 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm font-bold">2</span>
                  Understanding {interpretation.person2.name}
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">Underlying needs:</h3>
                    <div className="flex flex-wrap gap-2">
                      {interpretation.person2.underlyingNeeds.map((need, index) => (
                        <span
                          key={index}
                          className="bg-purple-100 px-4 py-2 rounded-full text-purple-700 text-sm border border-purple-200"
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
                          className="bg-indigo-100 px-4 py-2 rounded-full text-indigo-700 text-sm border border-indigo-200"
                        >
                          {emotion}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-purple-50 p-5 rounded-lg border border-purple-200">
                    <h3 className="font-semibold text-purple-800 mb-2">What they're really saying:</h3>
                    <p className="text-gray-700 leading-relaxed italic">
                      "{interpretation.person2.whatTheyreReallySaying}"
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">Blind spots:</h3>
                    <div className="space-y-2">
                      {interpretation.person2.blindSpots.map((spot, index) => (
                        <div key={index} className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                          <p className="text-gray-700 text-sm">{spot}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-5 rounded-lg border border-purple-200">
                    <h3 className="font-semibold text-purple-800 mb-2">Reflection for {interpretation.person2.name}:</h3>
                    <p className="text-gray-700 leading-relaxed">
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
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 shadow-lg border border-green-200">
                <h2 className="text-2xl font-light mb-4 text-gray-800 flex items-center">
                  <span className="text-2xl mr-2">🤝</span>
                  Where you actually agree
                </h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {interpretation.whereYouActuallyAgree}
                </p>
              </div>

              {/* Bridge Statements */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-indigo-200">
                <h2 className="text-2xl font-light mb-6 text-gray-800 flex items-center">
                  <span className="text-2xl mr-2">🌉</span>
                  Bridge statements
                </h2>
                <div className="space-y-4">
                  <div className="bg-rose-50 p-5 rounded-lg border border-rose-200">
                    <h3 className="font-semibold text-rose-800 mb-2">For {person1Name} to say:</h3>
                    <p className="text-gray-700 leading-relaxed italic">
                      "{interpretation.bridgeStatements.forPerson1ToSay}"
                    </p>
                  </div>
                  <div className="bg-purple-50 p-5 rounded-lg border border-purple-200">
                    <h3 className="font-semibold text-purple-800 mb-2">For {person2Name} to say:</h3>
                    <p className="text-gray-700 leading-relaxed italic">
                      "{interpretation.bridgeStatements.forPerson2ToSay}"
                    </p>
                  </div>
                </div>
              </div>

              {/* The Repair Path */}
              <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl p-8 shadow-lg border border-teal-200">
                <h2 className="text-2xl font-light mb-6 text-gray-800 flex items-center">
                  <span className="text-2xl mr-2">🌱</span>
                  The repair path
                </h2>
                <div className="space-y-3">
                  {interpretation.theRepairPath.map((step, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 bg-white p-4 rounded-lg border border-teal-200"
                    >
                      <span className="bg-teal-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-semibold mt-0.5">
                        {index + 1}
                      </span>
                      <p className="text-gray-700 leading-relaxed flex-1">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Deeper Invitation */}
              <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl p-8 shadow-lg border border-pink-200">
                <h2 className="text-2xl font-light mb-4 text-gray-800 flex items-center">
                  <span className="text-2xl mr-2">💝</span>
                  Deeper invitation
                </h2>
                <div className="bg-white p-6 rounded-lg border border-pink-200">
                  <p className="text-gray-700 leading-relaxed text-lg italic">
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
