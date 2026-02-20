import React, { useState, useEffect } from 'react';
import './VideoModal.css';

export default function VideoModal({ asset, onClose, onAddToStoryboard }) {
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState('Initializing VO Video Model...');
    const [isComplete, setIsComplete] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (progress < 100) {
            const timer = setTimeout(() => {
                setProgress(prev => {
                    const newProg = prev + Math.floor(Math.random() * 15) + 5;
                    return newProg > 100 ? 100 : newProg;
                });
            }, 500); // Sped up the mock generation slightly

            return () => clearTimeout(timer);
        } else {
            setIsComplete(true);
            setStatus('Video Generated Successfully!');
        }
    }, [progress]);

    useEffect(() => {
        if (progress > 20 && progress < 50) setStatus('Analyzing Composition & Depth...');
        if (progress >= 50 && progress < 80) setStatus('Generating Motion Vectors...');
        if (progress >= 80 && progress < 100) setStatus('Rendering final 4K frames...');
    }, [progress]);

    if (!asset) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="video-modal glass-panel" onClick={e => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>✕</button>

                <div className="modal-content">
                    <div className="preview-section">
                        <img
                            src={asset.url}
                            alt="Source Asset"
                            className={`source-image ${isComplete ? 'video-ready' : 'processing'} ${isPlaying ? 'ken-burns-active' : ''}`}
                        />
                        {isComplete && !isPlaying && (
                            <div className="play-overlay" onClick={() => setIsPlaying(true)}>
                                <span className="play-icon">▶</span>
                            </div>
                        )}
                        {isPlaying && (
                            <div className="video-playing-indicator">
                                <span className="rec-dot"></span> LIVE RENDER
                            </div>
                        )}
                    </div>

                    <div className="status-section">
                        <h3 className="gradient-text">VO Video Engine</h3>

                        {!isComplete ? (
                            <div className="generating-state">
                                <p className="status-text">{status}</p>
                                <div className="progress-bar-container">
                                    <div
                                        className="progress-bar"
                                        style={{ width: `${progress}%` }}
                                    ></div>
                                </div>
                                <span className="percentage">{progress}%</span>
                            </div>
                        ) : (
                            <div className="complete-state">
                                <p className="status-text success">{status}</p>
                                <div className="action-buttons">
                                    <button className="glow-btn">Download MP4</button>
                                    <button
                                        className="pill-btn"
                                        onClick={() => {
                                            onAddToStoryboard(asset);
                                            onClose();
                                        }}
                                    >
                                        Add to Storyboard
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
