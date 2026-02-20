import React, { useState } from 'react';
import './NeuralStoryboard.css';

export default function NeuralStoryboard({ timelineSnippets }) {
    const [script, setScript] = useState("In a world of noise, stand out with pristine audio fidelity.");
    const [isPreviewing, setIsPreviewing] = useState(false);
    const [previewProgress, setPreviewProgress] = useState(0);
    const [isPreviewPlaying, setIsPreviewPlaying] = useState(false);
    const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
    const [voices, setVoices] = useState([]);
    const [selectedVoice, setSelectedVoice] = useState(null);

    // Initialize voices
    React.useEffect(() => {
        const loadVoices = () => {
            const availableVoices = window.speechSynthesis.getVoices();
            if (availableVoices.length > 0) {
                setVoices(availableVoices);
                setSelectedVoice(availableVoices[0]);
            }
        };

        loadVoices();
        // Chrome loads voices asynchronously
        if (speechSynthesis.onvoiceschanged !== undefined) {
            speechSynthesis.onvoiceschanged = loadVoices;
        }
    }, []);

    // Simulate rendering process when preview is triggered
    React.useEffect(() => {
        if (isPreviewing) {
            setPreviewProgress(0);
            setIsPreviewPlaying(false);
            const timer = setInterval(() => {
                setPreviewProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(timer);
                        return 100;
                    }
                    return prev + 10;
                });
            }, 300);
            return () => clearInterval(timer);
        }
    }, [isPreviewing]);

    const handleGenerateAudio = () => {
        if (!('speechSynthesis' in window)) {
            alert("Sorry, your browser doesn't support text to speech!");
            return;
        }

        setIsGeneratingAudio(true);

        // Stop any currently playing audio
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(script);
        if (selectedVoice) {
            utterance.voice = selectedVoice;
        }

        // Customize the "AI Voice" feel a bit
        utterance.pitch = 0.9;
        utterance.rate = 0.9;

        utterance.onend = () => {
            setIsGeneratingAudio(false);
        };

        utterance.onerror = () => {
            setIsGeneratingAudio(false);
        };

        window.speechSynthesis.speak(utterance);
    };

    return (
        <div className="storyboard-container">
            <div className="storyboard-header">
                <h2 className="gradient-text">Neural Storyboard</h2>
                <p className="subtitle">Assemble your assets. AI handles the transitions and voiceover.</p>
            </div>

            <div className="storyboard-workspace">
                <div className="timeline-section glass-panel">
                    <h3>Visual Timeline</h3>
                    <div className="timeline-track">
                        {timelineSnippets.map((item, idx) => (
                            <div key={idx} className={`timeline-item ${item.type}`}>
                                {item.type === 'video' && (
                                    <>
                                        <img src={item.url} alt="clip" />
                                        <span className="duration">{item.duration}</span>
                                    </>
                                )}
                                {item.type === 'transition' && (
                                    <div className="transition-badge">⚡ {item.name}</div>
                                )}
                                {item.type === 'empty' && (
                                    <div className="empty-slot">+ Drag Asset Here</div>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="timeline-controls">
                        <button className="glow-btn play-btn" onClick={() => setIsPreviewing(true)}>
                            ▶ Preview Commercial
                        </button>
                        <button className="icon-btn">⚙️ Auto-Sync Beats</button>
                    </div>
                </div>

                <div className="audio-section glass-panel">
                    <h3>AI Voiceover Script</h3>
                    <textarea
                        className="glass-input script-textarea"
                        value={script}
                        onChange={(e) => setScript(e.target.value)}
                    />
                    <div className="voice-controls">
                        <div className="setting-group">
                            <label>Voice Clone</label>
                            <select
                                className="glass-input mini-select"
                                value={selectedVoice?.name || ''}
                                onChange={(e) => {
                                    const voice = voices.find(v => v.name === e.target.value);
                                    if (voice) setSelectedVoice(voice);
                                }}
                            >
                                {voices.length > 0 ? (
                                    voices.map((v, i) => (
                                        <option key={i} value={v.name}>{v.name} ({v.lang})</option>
                                    ))
                                ) : (
                                    <>
                                        <option>Deep Cinematic (Male)</option>
                                        <option>Energetic Trust (Female)</option>
                                        <option>Cyberpunk AI</option>
                                    </>
                                )}
                            </select>
                        </div>
                        <button
                            className="glow-btn generate-vo-btn"
                            onClick={handleGenerateAudio}
                            disabled={isGeneratingAudio}
                        >
                            {isGeneratingAudio ? 'Synthesizing Voice...' : 'Generate Audio Line'}
                        </button>
                    </div>
                </div>
            </div>

            {isPreviewing && (
                <div className="modal-overlay" onClick={() => setIsPreviewing(false)}>
                    <div className="video-modal glass-panel" style={{ textAlign: 'center' }} onClick={e => e.stopPropagation()}>
                        <button className="close-btn" onClick={() => setIsPreviewing(false)}>✕</button>
                        <h3 className="gradient-text" style={{ marginBottom: '1.5rem', fontSize: '2rem' }}>Final Cut Preview</h3>

                        <div className="commercial-player" style={{ backgroundColor: '#000', borderRadius: '8px', overflow: 'hidden', aspectRatio: '16/9', position: 'relative' }}>
                            {previewProgress < 100 ? (
                                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                                    <p style={{ color: 'var(--accent-cyan)' }}>Stitching Neural Assets & Syncing VO...</p>
                                    <div style={{ width: '60%', height: '4px', background: 'rgba(255,255,255,0.2)', borderRadius: '2px' }}>
                                        <div style={{ width: `${previewProgress}%`, height: '100%', background: 'var(--accent-cyan)', transition: 'width 0.3s ease' }}></div>
                                    </div>
                                </div>
                            ) : (
                                <div className={`final-commercial-player ${isPreviewPlaying ? 'playing' : ''}`} style={{ position: 'absolute', inset: 0, background: 'url(https://picsum.photos/seed/commercial/800/450)', backgroundSize: 'cover', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    {!isPreviewPlaying ? (
                                        <div style={{ background: 'rgba(0,0,0,0.5)', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setIsPreviewPlaying(true)}>
                                            <span style={{ fontSize: '4rem', color: 'white', cursor: 'pointer', transition: 'transform 0.2s' }} className="play-icon-hover">▶</span>
                                        </div>
                                    ) : (
                                        <div style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'rgba(255,0,0,0.8)', color: 'white', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <span className="rec-dot"></span> COMMERCIAL PLAYING
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
