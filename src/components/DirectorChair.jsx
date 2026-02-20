import React, { useState } from 'react';
import './DirectorChair.css';

export default function DirectorChair() {
    const [activeTab, setActiveTab] = useState('competitor'); // 'competitor' or 'custom'
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [promptGenerated, setPromptGenerated] = useState(false);

    const handleAnalyze = () => {
        setIsAnalyzing(true);
        setTimeout(() => {
            setIsAnalyzing(false);
            setPromptGenerated(true);
        }, 2000);
    };

    return (
        <div className="director-container">
            <div className="director-header">
                <h2 className="gradient-text">Director's Chair</h2>
                <p className="subtitle">Take full control. Analyze competitors or build bespoke super prompts.</p>
            </div>

            <div className="director-tabs">
                <button
                    className={`tab-btn ${activeTab === 'competitor' ? 'active' : ''}`}
                    onClick={() => setActiveTab('competitor')}
                >
                    Competitor Analysis
                </button>
                <button
                    className={`tab-btn ${activeTab === 'custom' ? 'active' : ''}`}
                    onClick={() => setActiveTab('custom')}
                >
                    Custom Brief & Enhance
                </button>
            </div>

            <div className="director-content">
                {activeTab === 'competitor' ? (
                    <div className="competitor-flow glass-panel">
                        <div className="upload-section">
                            <h3>1. Upload Competitor Ad</h3>
                            <div className="mini-drop-zone">
                                <p>Drag high-performing ad here</p>
                            </div>
                        </div>

                        <div className="analysis-section">
                            <h3>2. AI Analysis & Reconstruction</h3>
                            {!promptGenerated ? (
                                <button
                                    className="glow-btn analyze-btn"
                                    onClick={handleAnalyze}
                                    disabled={isAnalyzing}
                                >
                                    {isAnalyzing ? 'Analyzing Visuals...' : 'Generate Super Prompt ✨'}
                                </button>
                            ) : (
                                <div className="mock-prompt-result">
                                    <div className="super-prompt">
                                        <span className="prompt-label">Super Prompt Generated:</span>
                                        <p>"Cinematic close-up, high-end headphones resting on a mossy rock, neon cyberpunk background out of focus, anamorphic lens flare, 8k resolution, photorealistic..."</p>
                                    </div>
                                    <button className="glow-btn green-light-btn">Green Light Campaign</button>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="custom-brief-flow glass-panel">
                        <h3>Custom Campaign Brief</h3>
                        <textarea
                            className="glass-input brief-textarea"
                            placeholder="e.g. High-End Headphones for a Cyberpunk movie set in Tokyo 2077..."
                        ></textarea>

                        <div className="enhance-actions">
                            <button className="glow-btn gemini-btn">
                                <span className="gemini-icon">✨</span> Enhance with Gemini 3.0
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
