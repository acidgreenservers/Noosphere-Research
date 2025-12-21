/**
 * Subconscious Journal Interpreter
 * AI-powered tool for analyzing journal entries using OpenRouter API
 */

// Configuration
const OPENROUTER_API_KEY = 'YOUR_OPENROUTER_API_KEY'; // Replace with actual key
const API_URL = 'https://openrouter.ai/api/v1/chat/completions';

/**
 * Main interpretation function
 */
async function interpretJournal() {
  const input = document.getElementById('journal-input');
  const btn = document.getElementById('interpret-btn');
  const errorDiv = document.getElementById('error-message');
  const resultsSection = document.getElementById('results-section');
  const resultDiv = document.getElementById('interpretation-result');

  const journalText = input.value.trim();

  if (!journalText) {
    showError('Please enter some journal text to interpret.');
    return;
  }

  if (!OPENROUTER_API_KEY || OPENROUTER_API_KEY === 'YOUR_OPENROUTER_API_KEY') {
    showError('OpenRouter API key not configured. Please add your API key to the script.');
    return;
  }

  // Show loading state
  setLoading(true);
  hideError();
  resultsSection.classList.add('hidden');

  try {
    const prompt = `You are a mirror for the subconscious. When given a journal entry, you reflect back what lies beneath the surface - the unspoken, the unnoticed, the currents running underneath the words.

Do not use frameworks, categories, bullet points, or structured analysis. Do not label emotions or patterns clinically. Do not give advice or suggestions.

Simply reflect. Write in flowing prose. Be direct but gentle. Name what you see without judgment. Notice what is present and what is conspicuously absent. Feel the weight of certain words, the spaces between sentences, what the writer might not even know they're saying.

You are not an interpreter imposing meaning. You are a clear surface showing back what is already there.

Keep your reflection focused and meaningful - typically 2-4 paragraphs. Let silence have its place.

Journal entry: "${journalText}"`;

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin,
        'X-Title': 'Noosphere Research Hub'
      },
      body: JSON.stringify({
        model: "anthropic/claude-3-haiku", // Free tier model
        messages: [
          { role: "user", content: prompt }
        ],
        max_tokens: 1000,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message || 'API returned an error');
    }

    const interpretation = data.choices[0]?.message?.content;

    if (!interpretation) {
      throw new Error('No interpretation received from API');
    }

    // Display result
    resultDiv.textContent = interpretation;
    resultsSection.classList.remove('hidden');

    // Scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

  } catch (error) {
    console.error('Interpretation error:', error);
    showError(`Failed to interpret journal: ${error.message}`);
  } finally {
    setLoading(false);
  }
}

/**
 * Set loading state
 */
function setLoading(loading) {
  const btn = document.getElementById('interpret-btn');
  const icon = btn.querySelector('.material-icons');

  if (loading) {
    btn.disabled = true;
    btn.innerHTML = `
      <span class="loading-spinner"></span>
      Interpreting...
    `;
  } else {
    btn.disabled = false;
    btn.innerHTML = `
      <i class="material-icons mr-2" style="vertical-align: middle;">psychology</i>
      Interpret subconscious patterns
    `;
  }
}

/**
 * Show error message
 */
function showError(message) {
  const errorDiv = document.getElementById('error-message');
  errorDiv.textContent = message;
  errorDiv.classList.remove('hidden');
}

/**
 * Hide error message
 */
function hideError() {
  const errorDiv = document.getElementById('error-message');
  errorDiv.classList.add('hidden');
}

/**
 * Handle keyboard shortcuts
 */
document.addEventListener('DOMContentLoaded', function() {
  const input = document.getElementById('journal-input');

  input.addEventListener('keydown', function(e) {
    // Ctrl+Enter to submit
    if (e.ctrlKey && e.key === 'Enter') {
      e.preventDefault();
      interpretJournal();
    }
  });

  // Focus input on page load
  input.focus();
});

/**
 * Alternative API configuration
 * Uncomment and modify these if you want to use different models/services
 */

// Anthropic Claude (if you have API key)
// const CLAUDE_API_KEY = 'YOUR_CLAUDE_API_KEY';
// const CLAUDE_URL = 'https://api.anthropic.com/v1/messages';

/*
// Alternative interpretation function using Claude
async function interpretWithClaude(journalText) {
  const response = await fetch(CLAUDE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "anthropic-version": "2023-06-01",
      "x-api-key": CLAUDE_API_KEY
    },
    body: JSON.stringify({
      model: "claude-3-haiku-20240307",
      max_tokens: 1000,
      messages: [
        { role: "user", content: prompt }
      ]
    })
  });

  const data = await response.json();
  return data.content[0].text;
}
*/

// Export for potential use in other scripts
window.JournalInterpreter = {
  interpretJournal,
  setLoading,
  showError,
  hideError
};
