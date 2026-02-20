import React, { useState } from 'react';
import './BrandEngine.css';

export default function BrandEngine() {
    const [colors, setColors] = useState(['#ff003c', '#00f0ff', '#ffffff']);

    return (
        <div className="brand-engine-container">
            <div className="brand-header">
                <h2 className="gradient-text">Brand Identity Engine</h2>
                <p className="subtitle">Upload your DNA. Lumina will enforce it across all AI generations.</p>
            </div>

            <div className="brand-content">
                <div className="brand-section glass-panel">
                    <h3>Visual Guidelines</h3>

                    <div className="setting-group">
                        <label>Brand Logo (SVG/PNG)</label>
                        <div className="logo-upload">
                            <div className="upload-icon">✦</div>
                            <span>Drop Primary Logo</span>
                        </div>
                    </div>

                    <div className="setting-group">
                        <label>Core Color Palette</label>
                        <div className="color-palette">
                            {colors.map((color, idx) => (
                                <div key={idx} className="color-swatch" style={{ backgroundColor: color }}>
                                    <span className="hex-code">{color}</span>
                                </div>
                            ))}
                            <div className="color-swatch add-swatch">+</div>
                        </div>
                    </div>

                    <div className="setting-group">
                        <label>Typography</label>
                        <select className="glass-input">
                            <option>Inter (Modern Sans)</option>
                            <option>Playfair Display (Elegant Serif)</option>
                            <option>Oswald (Bold Condensed)</option>
                        </select>
                    </div>
                </div>

                <div className="brand-section glass-panel">
                    <h3>Tone of Voice (AI Persona)</h3>

                    <div className="setting-group">
                        <label>Brand Archetype</label>
                        <div className="archetype-grid">
                            <button className="archetype-btn active">The Creator</button>
                            <button className="archetype-btn">The Ruler</button>
                            <button className="archetype-btn">The Outlaw</button>
                            <button className="archetype-btn">The Magician</button>
                        </div>
                    </div>

                    <div className="setting-group">
                        <label>Custom Instructions</label>
                        <textarea
                            className="glass-input brand-context"
                            placeholder="e.g. Always use high-contrast lighting. Never use the color yellow. Keep copy punchy and under 10 words."
                            defaultValue="We are a premium audio brand. Our aesthetics lean heavily into cyberpunk and neon-noir. Lighting should always be dramatic with deep shadows and vibrant edge-lighting."
                        />
                    </div>

                    <button className="glow-btn save-brand-btn">Sync Brand DNA</button>
                </div>
            </div>
        </div>
    );
}
