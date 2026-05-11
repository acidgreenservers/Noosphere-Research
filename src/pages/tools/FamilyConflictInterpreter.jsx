import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const FamilyConflictInterpreter = () => {
  const [motherText, setMotherText] = useState('');
  const [fatherText, setFatherText] = useState('');
  const [children, setChildren] = useState([{ id: 1, name: 'Child 1', text: '' }]);
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

  const addChild = () => {
    const newId = Math.max(...children.map(c => c.id), 0) + 1;
    setChildren([...children, { id: newId, name: `Child ${newId}`, text: '' }]);
  };

  const removeChild = (id) => {
    if (children.length > 1) {
      setChildren(children.filter(c => c.id !== id));
    }
  };

  const updateChildName = (id, name) => {
    setChildren(children.map(c => c.id === id ? { ...c, name } : c));
  };

  const updateChildText = (id, text) => {
    setChildren(children.map(c => c.id === id ? { ...c, text } : c));
  };

  const interpretConflict = async () => {
    if (!motherText.trim() || !fatherText.trim() || children.some(c => !c.text.trim())) return;

    setIsLoading(true);
    setError(null);

    try {
      // Use demo response
      await new Promise(resolve => setTimeout(resolve, 2000));
      const parsedResponse = {
        "whatsBeneathTheSurface": "This conflict is really about unmet needs for connection and validation within the family system. Each member is expressing their pain through different behaviors, but they're all seeking the same fundamental things: to feel heard, valued, and emotionally safe.",
        "mother": {
          "underlyingNeeds": ["emotional support", "appreciation", "family harmony"],
          "emotions": ["frustrated", "overwhelmed"],
          "whatTheyreReallySaying": "I'm trying so hard to hold this family together and I feel like no one notices or cares about my efforts",
          "roleInFamily": "The emotional caretaker and family organizer",
          "reflectionForThem": "Your love for this family is evident in how much you do for them. Have you considered that they might want to support you too, if they knew how?"
        },
        "father": {
          "underlyingNeeds": ["respect", "peace", "connection"],
          "emotions": ["defensive", "exhausted"],
          "whatTheyreReallySaying": "I feel like I can't do anything right and I'm constantly being criticized. I just want some peace and appreciation",
          "roleInFamily": "The provider and problem-solver",
          "reflectionForThem": "Your desire to protect and provide for your family is strong. Could there be ways to express your needs that help your family understand rather than defend?"
        },
        "children": [
          {
            "name": "Child 1",
            "underlyingNeeds": ["attention", "stability"],
            "emotions": ["confused", "anxious"],
            "whatTheyreReallySaying": "I don't understand why everyone is always fighting. I just want things to be calm and happy",
            "impactOnThem": "The conflict is creating anxiety and uncertainty about family stability",
            "reflectionForThem": "Your feelings matter too. It's okay to ask your parents for the calm and happiness you need"
          }
        ],
        "familyPattern": "The family falls into a pattern where mother expresses frustration through criticism, father responds with defensiveness and withdrawal, and children feel caught in the middle. This creates a cycle of disconnection rather than resolution.",
        "generationalDynamics": "This pattern may have roots in how conflict was handled in previous generations, where emotions were either expressed through criticism or suppressed through withdrawal.",
        "hiddenAlliances": "The children may be forming alliances with one parent or the other as they try to navigate the conflict, creating triangulation in the family system.",
        "sharedValues": ["family unity", "love", "mutual support"],
        "repairPathForFamily": [
          "Create a family meeting where everyone can express their feelings without interruption",
          "Practice active listening where each person repeats back what they heard before responding",
          "Identify one small change each family member can make to improve communication"
        ],
        "invitationToGrowth": "What if this conflict could become an opportunity for your family to grow closer and understand each other better? What would it look like to approach this challenge as a team rather than as opponents?"
      };

      setInterpretation(parsedResponse);
    } catch (err) {
      setError(err.message || 'Unable to interpret this family conflict. Please try again.');
      console.error('Error interpreting family conflict:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const allFieldsFilled = motherText.trim() && fatherText.trim() && children.every(c => c.text.trim());

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="md-card p-10 glow-card mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 glow-text text-white">
              👨‍👩‍👧‍👦 Family Conflict Interpreter
            </h1>
            <h2 className="text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4 font-light">
              Understanding the Whole Family System
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Map the hidden dynamics, alliances, and generational patterns that shape your family's interactions.
            </p>
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
                  disabled={!allFieldsFilled}
                  className="flex-1 md:flex-none px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed border border-white/10"
                >
                  Use Demo
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Family Input Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Mother Input */}
          <div className="md-card p-8 glow-card">
            <h3 className="text-xl font-bold text-rose-300 mb-4 flex items-center">
              <span className="material-symbols-outlined mr-2">face_3</span>
              Mother's Perspective
            </h3>
            <textarea
              value={motherText}
              onChange={(e) => setMotherText(e.target.value)}
              placeholder="What is she feeling? What is her side of the story?"
              className="w-full h-40 bg-white/5 border border-white/10 rounded-2xl p-6 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all resize-none leading-relaxed"
            />
          </div>

          {/* Father Input */}
          <div className="md-card p-8 glow-card">
            <h3 className="text-xl font-bold text-blue-300 mb-4 flex items-center">
              <span className="material-symbols-outlined mr-2">face_6</span>
              Father's Perspective
            </h3>
            <textarea
              value={fatherText}
              onChange={(e) => setFatherText(e.target.value)}
              placeholder="What is he feeling? What is his side of the story?"
              className="w-full h-40 bg-white/5 border border-white/10 rounded-2xl p-6 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none leading-relaxed"
            />
          </div>
        </div>

        {/* Children Inputs */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8 px-2">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">
              Children's Perspectives
            </h2>
            <button
              onClick={addChild}
              className="md-button px-6 py-2 text-sm"
            >
              <span className="material-symbols-outlined mr-2 text-sm">add</span>
              <span>Add Child</span>
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {children.map((child, index) => (
              <div key={child.id} className="md-card p-8 glow-card relative group animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex-1 mr-4">
                    <input
                      type="text"
                      value={child.name}
                      onChange={(e) => updateChildName(child.id, e.target.value)}
                      placeholder="Child's Name / Role"
                      className="w-full bg-white/5 border-b border-white/10 p-2 text-indigo-300 font-bold focus:outline-none focus:border-indigo-500 transition-all"
                    />
                  </div>
                  {children.length > 1 && (
                    <button
                      onClick={() => removeChild(child.id)}
                      className="p-2 text-gray-500 hover:text-rose-400 hover:bg-rose-400/10 rounded-full transition-all"
                      title="Remove Child"
                    >
                      <span className="material-symbols-outlined text-xl">delete</span>
                    </button>
                  )}
                </div>
                <textarea
                  value={child.text}
                  onChange={(e) => updateChildText(child.id, e.target.value)}
                  placeholder="What is their perspective? How are they affected?"
                  className="w-full h-40 bg-white/5 border border-white/10 rounded-2xl p-6 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-none leading-relaxed"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Interpret Button */}
        <div className="max-w-2xl mx-auto mb-16">
          <button
            onClick={interpretConflict}
            disabled={isLoading || !allFieldsFilled}
            className={`w-full py-5 px-8 rounded-full font-bold transition-all duration-500 flex items-center justify-center gap-3 text-xl group overflow-hidden relative ${isLoading || !allFieldsFilled
              ? 'bg-white/5 border border-white/10 text-gray-500 cursor-not-allowed'
              : 'md-button shadow-xl shadow-purple-500/20 active:scale-95 hover:scale-[1.02]'
              }`}
          >
            {isLoading ? (
              <>
                <span className="material-symbols-outlined w-7 h-7 animate-spin">progress_activity</span>
                <span>Interpreting Family Dynamics...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined w-7 h-7 group-hover:rotate-12 transition-transform">group</span>
                <span>Interpret Family Conflict</span>
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
          <div className="space-y-12 pb-24 animate-fade-in">
            {/* Core Insight */}
            <div className="md-card p-10 glow-card border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-orange-500/5">
              <h2 className="text-3xl font-light mb-6 text-amber-200 flex items-center">
                <span className="material-symbols-outlined mr-3 text-amber-400 text-3xl">psychology</span>
                The Systemic Core
              </h2>
              <p className="text-xl text-gray-200 leading-relaxed font-light italic">
                {interpretation.whatsBeneathTheSurface}
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Mother Dynamic */}
              <div className="md-card p-8 glow-card border-rose-500/20">
                <h2 className="text-2xl font-bold mb-8 text-rose-300 flex items-center">
                  <span className="material-symbols-outlined mr-3 text-rose-400">face_3</span>
                  Understanding Mother
                </h2>
                <div className="space-y-8">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-3 ml-1">Underlying Needs</h3>
                      <div className="flex flex-wrap gap-2">
                        {interpretation.mother.underlyingNeeds.map((need, idx) => (
                          <span key={idx} className="bg-rose-500/10 px-3 py-1 rounded-full text-rose-200 text-xs border border-rose-500/20">{need}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-3 ml-1">Emotional State</h3>
                      <div className="flex flex-wrap gap-2">
                        {interpretation.mother.emotions.map((emotion, idx) => (
                          <span key={idx} className="bg-pink-500/10 px-3 py-1 rounded-full text-pink-200 text-xs border border-pink-500/20">{emotion}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                    <h4 className="text-sm font-bold text-rose-400 mb-2">The Unspoken Message:</h4>
                    <p className="text-gray-300 italic">"{interpretation.mother.whatTheyreReallySaying}"</p>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-1 ml-1">Systemic Role</h4>
                      <p className="text-gray-200">{interpretation.mother.roleInFamily}</p>
                    </div>
                    <div>
                      <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-1 ml-1">Personal Reflection</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">{interpretation.mother.reflectionForThem}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Father Dynamic */}
              <div className="md-card p-8 glow-card border-blue-500/20">
                <h2 className="text-2xl font-bold mb-8 text-blue-300 flex items-center">
                  <span className="material-symbols-outlined mr-3 text-blue-400">face_6</span>
                  Understanding Father
                </h2>
                <div className="space-y-8">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-3 ml-1">Underlying Needs</h3>
                      <div className="flex flex-wrap gap-2">
                        {interpretation.father.underlyingNeeds.map((need, idx) => (
                          <span key={idx} className="bg-blue-500/10 px-3 py-1 rounded-full text-blue-200 text-xs border border-blue-500/20">{need}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-3 ml-1">Emotional State</h3>
                      <div className="flex flex-wrap gap-2">
                        {interpretation.father.emotions.map((emotion, idx) => (
                          <span key={idx} className="bg-cyan-500/10 px-3 py-1 rounded-full text-cyan-200 text-xs border border-cyan-500/20">{emotion}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                    <h4 className="text-sm font-bold text-blue-400 mb-2">The Unspoken Message:</h4>
                    <p className="text-gray-300 italic">"{interpretation.father.whatTheyreReallySaying}"</p>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-1 ml-1">Systemic Role</h4>
                      <p className="text-gray-200">{interpretation.father.roleInFamily}</p>
                    </div>
                    <div>
                      <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-1 ml-1">Personal Reflection</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">{interpretation.father.reflectionForThem}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Children Dynamic */}
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
              {interpretation.children.map((child, idx) => (
                <div key={idx} className="md-card p-8 glow-card border-indigo-500/20 bg-indigo-500/5">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="material-symbols-outlined text-indigo-400">child_care</span>
                    <h2 className="text-xl font-bold text-indigo-300">{child.name}</h2>
                  </div>
                  <div className="space-y-6">
                    <div className="bg-white/5 p-5 rounded-2xl border border-white/5">
                      <p className="text-sm text-indigo-200 italic leading-relaxed">"{child.whatTheyreReallySaying}"</p>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-1 ml-1">Psychological Impact</h4>
                        <p className="text-gray-300 text-sm">{child.impactOnThem}</p>
                      </div>
                      <div>
                        <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-1 ml-1">Path to Safety</h4>
                        <p className="text-gray-400 text-xs leading-relaxed">{child.reflectionForThem}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* systemic patterns */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="md-card p-8 glow-card border-purple-500/20">
                <h2 className="text-2xl font-bold mb-6 text-purple-300 flex items-center">
                  <span className="material-symbols-outlined mr-3 text-purple-400">schema</span>
                  Family Patterns
                </h2>
                <div className="space-y-6">
                  <div className="bg-white/5 p-6 rounded-2xl">
                    <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-3">Recurring Cycle</h4>
                    <p className="text-gray-200 leading-relaxed font-light">{interpretation.familyPattern}</p>
                  </div>
                  <div className="bg-white/5 p-6 rounded-2xl">
                    <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-3">Generational Roots</h4>
                    <p className="text-gray-200 leading-relaxed font-light">{interpretation.generationalDynamics}</p>
                  </div>
                </div>
              </div>

              <div className="md-card p-8 glow-card border-yellow-500/20">
                <h2 className="text-2xl font-bold mb-6 text-yellow-300 flex items-center">
                  <span className="material-symbols-outlined mr-3 text-yellow-400">hub</span>
                  Hidden Alliances
                </h2>
                <p className="text-gray-200 leading-relaxed font-light mb-8">{interpretation.hiddenAlliances}</p>
                <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-4 flex items-center">
                  <span className="material-symbols-outlined w-3 h-3 mr-2 text-green-400 text-xs">favorite</span>
                  Shared Foundational Values
                </h3>
                <div className="flex flex-wrap gap-2">
                  {interpretation.sharedValues.map((val, idx) => (
                    <span key={idx} className="bg-green-500/10 px-4 py-2 rounded-full text-green-300 border border-green-500/20 text-sm">{val}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Repair Path */}
            <div className="md-card p-10 glow-card border-teal-500/20 bg-teal-500/5">
              <h2 className="text-3xl font-light mb-8 text-teal-200 flex items-center">
                <span className="material-symbols-outlined mr-3 text-teal-400 text-3xl">nature_people</span>
                The Path to Repair
              </h2>
              <div className="grid md:grid-cols-3 gap-6 mb-10">
                {interpretation.repairPathForFamily.map((step, idx) => (
                  <div key={idx} className="bg-white/5 p-6 rounded-2xl border border-white/5 relative group hover:bg-white/10 transition-colors">
                    <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center font-bold text-white shadow-lg">{idx + 1}</div>
                    <p className="text-gray-200 leading-relaxed mt-2">{step}</p>
                  </div>
                ))}
              </div>
              <div className="bg-white/5 p-8 rounded-3xl border border-indigo-500/20 text-center">
                <span className="material-symbols-outlined text-indigo-400 text-4xl mb-4 block">auto_awesome</span>
                <p className="text-xl text-gray-200 leading-relaxed font-light italic max-w-3xl mx-auto">
                  "{interpretation.invitationToGrowth}"
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @media (max-width: 640px) {
          .glow-text {
            font-size: 2.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default FamilyConflictInterpreter;
