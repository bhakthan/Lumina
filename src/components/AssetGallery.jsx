import React, { useState } from 'react';
import VideoModal from './VideoModal';
import AssetModal from './AssetModal';
import './AssetGallery.css';

// Mock data generator for initial assets
const MOCK_ASSETS = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    category: i % 3 === 0 ? 'Influencer' : i % 3 === 1 ? 'Cinematic' : 'Midnight Luxury',
    url: `https://picsum.photos/seed/ad${i}/600/800`,
    hasVideo: true
}));

export default function AssetGallery({ onAddToStoryboard }) {
    const [activeTab, setActiveTab] = useState('All');
    const [showHeatmap, setShowHeatmap] = useState(false);
    const [activeVideoAsset, setActiveVideoAsset] = useState(null);
    const [activeModalAsset, setActiveModalAsset] = useState(null);
    const [isGeneratingBespoke, setIsGeneratingBespoke] = useState(false);

    const handleGenerateBespoke = () => {
        setIsGeneratingBespoke(true);
        setTimeout(() => {
            setIsGeneratingBespoke(false);
        }, 3000);
    };

    const filteredAssets = activeTab === 'All'
        ? MOCK_ASSETS
        : MOCK_ASSETS.filter(a => a.category === activeTab);

    return (
        <div className="gallery-container">
            <div className="gallery-header">
                <div className="header-titles">
                    <h2 className="gradient-text">Generation Hub</h2>
                    <p className="subtitle">Your AI-generated assets are ready.</p>
                </div>

                <div className="gallery-actions">
                    <button
                        className={`glow-btn ${showHeatmap ? 'active-heatmap' : 'heatmap-btn'}`}
                        onClick={() => setShowHeatmap(!showHeatmap)}
                    >
                        {showHeatmap ? 'Hide Heatmap' : '👁️ Predict Attention'}
                    </button>
                    <button
                        className="glow-btn bespoke-btn"
                        onClick={handleGenerateBespoke}
                        disabled={isGeneratingBespoke}
                    >
                        {isGeneratingBespoke ? '✨ Synthesizing Visions...' : '✨ Generate Bespoke Concepts'}
                    </button>
                </div>
            </div>

            {isGeneratingBespoke && (
                <div className="bespoke-loading-overlay">
                    <div className="bespoke-loader">
                        <div className="spinner"></div>
                        <p className="gradient-text">Dreaming up new concepts based on your style...</p>
                    </div>
                </div>
            )}

            <div className="category-tabs">
                {['All', 'Influencer', 'Cinematic', 'Midnight Luxury'].map(tab => (
                    <button
                        key={tab}
                        className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="masonry-grid">
                {filteredAssets.map(asset => (
                    <div key={asset.id} className="asset-card glass-panel">
                        <div className="asset-image-wrapper">
                            <img src={asset.url} alt={`Asset ${asset.id}`} className="asset-image" />
                            {showHeatmap && (
                                <div className="heatmap-overlay"></div>
                            )}
                            <div className="asset-overlay">
                                <div className="overlay-actions">
                                    <button
                                        className="icon-btn edit-btn"
                                        title="Edit Prompt & Regenerate"
                                        onClick={() => setActiveModalAsset(asset)}
                                    >
                                        ✏️
                                    </button>
                                    <button className="icon-btn" title="Download">⬇️</button>
                                    {asset.hasVideo && (
                                        <button
                                            className="icon-btn video-btn"
                                            title="Generate VO Video"
                                            onClick={() => setActiveVideoAsset(asset)}
                                        >
                                            🎥
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="asset-info">
                            <span className="asset-category">{asset.category}</span>
                            <span className="asset-res">4K</span>
                        </div>
                    </div>
                ))}
            </div>

            {activeVideoAsset && (
                <VideoModal
                    asset={activeVideoAsset}
                    onClose={() => setActiveVideoAsset(null)}
                    onAddToStoryboard={onAddToStoryboard}
                />
            )}

            {activeModalAsset && (
                <AssetModal
                    asset={activeModalAsset}
                    onClose={() => setActiveModalAsset(null)}
                />
            )}
        </div>
    );
}
