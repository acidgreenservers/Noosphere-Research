import React, { useState } from 'react';
import { useApiKey } from '../contexts/ApiKeyContext';

const ApiKeySection = ({ onUseDemo }) => {
  const { hasApiKey, saveApiKey, clearApiKey } = useApiKey();
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [error, setError] = useState(null);

  const validateApiKey = (key) => {
    // OpenRouter API keys usually start with 'sk-or-v1-'
    return key.startsWith('sk-or-v1-') && key.length > 20;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateApiKey(apiKeyInput)) {
      saveApiKey(apiKeyInput);
      setShowInput(false);
      setError(null);
    } else {
      setError('Invalid OpenRouter API key format. Keys should start with "sk-or-v1-"');
    }
  };

  return (
    <div className="max-w-4xl mx-auto mb-8">
      {!hasApiKey && !showInput && (
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
                onClick={() => setShowInput(true)}
                className="flex-1 md:flex-none px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-full transition-colors text-sm font-medium shadow-lg shadow-amber-900/20"
              >
                Add API Key
              </button>
              {onUseDemo && (
                <button
                  onClick={onUseDemo}
                  className="flex-1 md:flex-none px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors text-sm font-medium border border-white/10"
                >
                  Use Demo
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {showInput && !hasApiKey && (
        <div className="md-card p-8 border-blue-500/30 bg-blue-500/5 animate-fade-in">
          <div className="flex items-center mb-6">
            <span className="material-symbols-outlined text-blue-400 mr-3">lock</span>
            <h3 className="text-xl font-semibold text-blue-200">Enter OpenRouter API Key</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-6">
            <div className="text-sm text-gray-400 space-y-3 font-light leading-relaxed text-left">
              <p>Your API key is stored only in memory for this session and never saved or transmitted except to OpenRouter's secure API.</p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="material-symbols-outlined text-xs mr-2 text-blue-400 mt-1">link</span>
                  <a href="https://openrouter.ai/keys" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Get your free API key at OpenRouter</a>
                </li>
                <li className="flex items-start">
                  <span className="material-symbols-outlined text-xs mr-2 text-blue-400 mt-1">check_circle</span>
                  Keys start with "sk-or-v1-"
                </li>
                <li className="flex items-start">
                  <span className="material-symbols-outlined text-xs mr-2 text-blue-400 mt-1">shield</span>
                  Your key is never stored or shared
                </li>
              </ul>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="password"
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                placeholder="sk-or-v1-..."
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                autoComplete="off"
                spellCheck="false"
              />
              {error && <p className="text-red-400 text-xs">{error}</p>}
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={!apiKeyInput.trim()}
                  className="flex-1 md-button py-2 text-sm"
                >
                  Save & Enable AI
                </button>
                <button
                  type="button"
                  onClick={() => setShowInput(false)}
                  className="flex-1 md-button-secondary py-2 text-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
  );
};

export default ApiKeySection;
