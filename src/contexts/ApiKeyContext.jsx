import React, { createContext, useContext, useState } from 'react';

const ApiKeyContext = createContext();

export const ApiKeyProvider = ({ children }) => {
  const [apiKey, setApiKey] = useState('');
  const [hasApiKey, setHasApiKey] = useState(false);

  const saveApiKey = (key) => {
    setApiKey(key);
    setHasApiKey(!!key);
  };

  const clearApiKey = () => {
    setApiKey('');
    setHasApiKey(false);
  };

  return (
    <ApiKeyContext.Provider value={{ apiKey, hasApiKey, saveApiKey, clearApiKey }}>
      {children}
    </ApiKeyContext.Provider>
  );
};

export const useApiKey = () => {
  const context = useContext(ApiKeyContext);
  if (context === undefined) {
    throw new Error('useApiKey must be used within an ApiKeyProvider');
  }
  return context;
};
