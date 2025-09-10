import React, { useState } from 'react';
import './index.css';

function App() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleCheck = async () => {
    setLoading(true);
    setResults(null);
    setError(null);

    try {
      // This fetches from the Flask backend you just created
      const response = await fetch('http://localhost:5000/api/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();
      if (response.ok) {
        setResults(data);
      } else {
        setError(data.error || "An error occurred.");
      }
    } catch (err) {
      setError("Failed to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1>AI Credibility Checker</h1>
        <p>Paste an article link or text snippet below.</p>
      </header>
      <div className="main-content">
        <textarea
          className="text-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste text or a URL to check its credibility..."
          rows="10"
        ></textarea>
        <button className="check-button" onClick={handleCheck} disabled={loading}>
          {loading ? 'Analyzing...' : 'Check Credibility'}
        </button>
        {error && <div className="error-message">{error}</div>}
        {results && (
          <div className="results-box">
            <div className="result-section">
              <h3>Fact-Check Summary</h3>
              <p>{results.factCheckSummary}</p>
            </div>
            <div className="result-section">
              <h3>Explainable Insights</h3>
              <p>{results.explainableInsights}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default App;