import React, { useState } from 'react';
import './AICoDirector.css';

export default function AICoDirector({ currentView }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', text: 'I am your AI Co-Director. I can analyze your assets, predict CTR, and suggest improvements.' }
    ]);

    const handleAnalyzeView = () => {
        setIsAnalyzing(true);
        setTimeout(() => {
            setIsAnalyzing(false);
            let analysisText = '';
            if (currentView === 'upload') {
                analysisText = 'Tip: Uploading at least 3 distinct angles of the product improves visual consistency by 40%.';
            } else if (currentView === 'gallery') {
                analysisText = 'I scanned these 12 assets. The "Midnight Luxury" variants have the highest predicted CTR (3.2%) based on current market trends for premium tech.';
            } else if (currentView === 'storyboard') {
                analysisText = 'The transition between clip 2 and 3 is jarring. I suggest generating a 2-second B-roll filler or using a crossfade to maintain viewer retention loops.';
            } else {
                analysisText = 'I am monitoring your workspace. How can I help optimize your campaign?';
            }
            setMessages([...messages, { role: 'assistant', text: analysisText }]);
        }, 1500);
    };

    return (
        <div className={`ai-codirector ${isOpen ? 'open' : 'closed'}`}>
            <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
                🤖 {isOpen ? 'Close Co-Director' : 'AI Co-Director'}
            </button>

            {isOpen && (
                <div className="codirector-panel glass-panel">
                    <div className="chat-header">
                        <h4>Live Analysis Agent</h4>
                        <span className="status-dot pulsing"></span>
                    </div>

                    <div className="chat-messages">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`message ${msg.role}`}>
                                {msg.text}
                            </div>
                        ))}
                        {isAnalyzing && (
                            <div className="message assistant analyzing">
                                <span className="dot"></span><span className="dot"></span><span className="dot"></span>
                            </div>
                        )}
                    </div>

                    <div className="chat-actions">
                        <button className="glow-btn action-btn" onClick={handleAnalyzeView} disabled={isAnalyzing}>
                            {isAnalyzing ? 'Analyzing View...' : `Analyze ${currentView.charAt(0).toUpperCase() + currentView.slice(1)}`}
                        </button>
                        <div className="quick-fixes">
                            <button className="pill-btn">Optimize Copy</button>
                            <button className="pill-btn">Check Brand Tone</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
