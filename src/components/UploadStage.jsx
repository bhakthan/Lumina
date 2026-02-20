import React, { useState } from 'react';
import './UploadStage.css';

export default function UploadStage({ onGenerate }) {
    const [dragActive, setDragActive] = useState(false);
    const [file, setFile] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleGenerateClick = () => {
        setIsGenerating(true);
        setProgress(0);

        const timer = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(() => {
                        onGenerate();
                    }, 500);
                    return 100;
                }
                return prev + Math.floor(Math.random() * 20) + 5;
            });
        }, 400);
    };

    return (
        <div className="upload-stage">
            <div className="upload-header">
                <h2 className="gradient-text">New Campaign</h2>
                <p className="subtitle">Upload your product to generate 4K visual assets instantly.</p>
            </div>

            <div className="upload-content">
                <div
                    className={`drop-zone glass-panel ${dragActive ? 'active' : ''}`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                >
                    <input
                        type="file"
                        id="file-upload"
                        multiple={false}
                        onChange={handleChange}
                        accept="image/*"
                    />
                    <label htmlFor="file-upload" className="drop-zone-content">
                        <div className="upload-icon">📸</div>
                        {file ? (
                            <p>Selected: <span className="highlight">{file.name}</span></p>
                        ) : (
                            <p>Drag & drop your product image here, or <span className="highlight">click to browse</span></p>
                        )}
                    </label>
                </div>

                <div className="settings-panel glass-panel">
                    <h3>Campaign Settings</h3>
                    <div className="setting-group">
                        <label>Aspect Ratio</label>
                        <div className="ratio-options">
                            <button className="ratio-btn active">1:1</button>
                            <button className="ratio-btn">16:9</button>
                            <button className="ratio-btn">9:16</button>
                        </div>
                    </div>

                    <div className="setting-group">
                        <label>Quality</label>
                        <select className="glass-input">
                            <option>Ultra (4K)</option>
                            <option>High (1080p)</option>
                            <option>Standard (720p)</option>
                        </select>
                    </div>

                    <div className="generate-wrapper">
                        {isGenerating && (
                            <div className="generation-progress">
                                <span className="status-text">Analyzing & Generating...</span>
                                <div className="progress-bar-container">
                                    <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                                </div>
                                <span className="percentage">{progress}%</span>
                            </div>
                        )}
                        <button
                            className="glow-btn generate-btn"
                            onClick={handleGenerateClick}
                            disabled={!file || isGenerating}
                        >
                            {isGenerating ? 'Synthesizing...' : 'Generate Assets'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
