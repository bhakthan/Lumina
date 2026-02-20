import React, { useState } from 'react';
import './AssetModal.css';

export default function AssetModal({ asset, onClose }) {
    const [prompt, setPrompt] = useState(
        "A hyper-realistic 4K render of the product. Cinematic lighting, deep shadows, neon accents. Shot on 35mm lens."
    );
    const [isRegenerating, setIsRegenerating] = useState(false);

    if (!asset) return null;

    const handleRegenerate = () => {
        setIsRegenerating(true);
        setTimeout(() => {
            setIsRegenerating(false);
            onClose(); // In a real app, this would update the asset
        }, 3000);
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="asset-modal glass-panel" onClick={e => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>✕</button>

                <div className="asset-modal-content">
                    <div className="asset-preview-large">
                        <img
                            src={asset.url}
                            alt={`Asset ${asset.id}`}
                            className={isRegenerating ? 'processing' : ''}
                        />
                        {isRegenerating && (
                            <div className="regenerating-overlay">
                                <span className="rec-dot"></span> Refining Pixels...
                            </div>
                        )}
                    </div>

                    <div className="asset-details">
                        <div className="details-header">
                            <h3 className="gradient-text">Asset Inspector</h3>
                            <div className="badges">
                                <span className="badge category-badge">{asset.category}</span>
                                <span className="badge res-badge">4K Ultra</span>
                            </div>
                        </div>

                        <div className="prompt-editor">
                            <label>Generation Prompt</label>
                            <textarea
                                className="glass-input"
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                rows={4}
                            />
                        </div>

                        <div className="tuning-sliders">
                            <div className="slider-group">
                                <label>Lighting Intensity</label>
                                <input type="range" min="1" max="100" defaultValue="80" />
                            </div>
                            <div className="slider-group">
                                <label>Brand Presence</label>
                                <input type="range" min="1" max="100" defaultValue="50" />
                            </div>
                        </div>

                        <div className="modal-actions">
                            <button className="pill-btn">⬇️ Download High-Res</button>
                            <button
                                className="glow-btn regenerate-btn"
                                onClick={handleRegenerate}
                                disabled={isRegenerating}
                            >
                                {isRegenerating ? 'Regenerating...' : '🔄 Reroll with new prompt'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
