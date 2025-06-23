import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // State variables
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  // Get feedback from server
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!userInput.trim()) {
      alert('Please enter some text!');
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_input: userInput }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setFeedback(data);
        setUserInput(''); // Clear input
        loadHistory(); // Refresh history
      } else {
        alert(data.error);
      }
    } catch (error) {
      alert('Error: Make sure server is running!');
    }
    
    setLoading(false);
  };

  // Load history from server
  const loadHistory = async () => {
    try {
      const response = await fetch('/api/history');
      const data = await response.json();
      setHistory(data);
    } catch (error) {
      console.log('Could not load history');
    }
  };

  // Load history when component starts
  useEffect(() => {
    loadHistory();
  }, []);

  return (
    <div className="App">
      <header>
        <h1>🤖 AI Feedback App</h1>
        
      </header>

      <main>
        
        <div className="nav">
          <button 
            className={!showHistory ? 'active' : ''}
            onClick={() => setShowHistory(false)}
          >
            Get Feedback
          </button>
          <button 
            className={showHistory ? 'active' : ''}
            onClick={() => setShowHistory(true)}
          >
            History ({history.length})
          </button>
        </div>

        {!showHistory ? (
          // Feedback Section
          <div className="feedback-section">
            <div className="input-section">
              <h2>Submit Your Response</h2>
              <form onSubmit={handleSubmit}>
                <textarea
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Enter your response here..."
                  rows="6"
                  disabled={loading}
                />
                <button type="submit" disabled={loading}>
                  {loading ? 'Getting Feedback...' : 'Get Feedback'}
                </button>
              </form>
            </div>

            {/* Display Feedback */}
            {feedback && (
              <div className="feedback-result">
                <h2>AI Feedback</h2>
                <div className="your-input">
                  <h3>Your Response:</h3>
                  <p>{feedback.user_input}</p>
                </div>
                <div className="ai-feedback">
                  <h3>🤖 AI Says:</h3>
                  <p>{feedback.feedback}</p>
                </div>
                <small>Received: {new Date(feedback.timestamp).toLocaleString()}</small>
              </div>
            )}
          </div>
        ) : (
          // History Section
          <div className="history-section">
            <h2>Feedback History</h2>
            {history.length === 0 ? (
              <p className="no-history">No feedback history yet. Submit your first response!</p>
            ) : (
              <div className="history-list">
                {history.map((item, index) => (
                  <div key={item._id || index} className="history-item">
                    <div className="history-input">
                      <strong>Your Response:</strong>
                      <p>{item.user_input}</p>
                    </div>
                    <div className="history-feedback">
                      <strong>AI Feedback:</strong>
                      <p>{item.feedback}</p>
                    </div>
                    <small>{new Date(item.timestamp).toLocaleString()}</small>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;