import { useState } from 'react'
import UploadStage from './components/UploadStage'
import AssetGallery from './components/AssetGallery'
import DirectorChair from './components/DirectorChair'
import NeuralStoryboard from './components/NeuralStoryboard'
import BrandEngine from './components/BrandEngine'
import AICoDirector from './components/AICoDirector'
import './index.css'

function App() {
  const [currentView, setCurrentView] = useState('upload') // 'upload', 'gallery', 'director', 'storyboard', 'brand'
  const [timelineSnippets, setTimelineSnippets] = useState([
    { id: 1, type: 'video', url: 'https://picsum.photos/seed/ad1/300/200', duration: '3s' },
    { id: 2, type: 'transition', name: 'Cyber Glitch' },
    { id: 3, type: 'video', url: 'https://picsum.photos/seed/ad2/300/200', duration: '2.5s' },
    { id: 'empty', type: 'empty' }
  ]);

  const handleAddToStoryboard = (asset) => {
    setTimelineSnippets(prev => [
      ...prev.filter(item => item.id !== 'empty'),
      { id: Date.now(), type: 'video', url: asset.url, duration: '4s' },
      { id: 'empty', type: 'empty' }
    ]);
    setCurrentView('storyboard');
  };

  return (
    <div className="app-container">
      <header className="glass-panel main-header">
        <div className="logo-area">
          <h2 className="gradient-text">Lumina</h2>
          <span className="badge">The Studio</span>
        </div>
        <nav className="nav-links">
          <button
            className={`nav-btn ${currentView === 'upload' ? 'active' : ''}`}
            onClick={() => setCurrentView('upload')}
          >
            New Project
          </button>
          <button
            className={`nav-btn ${currentView === 'gallery' ? 'active' : ''}`}
            onClick={() => setCurrentView('gallery')}
          >
            Generation Hub
          </button>
          <button
            className={`nav-btn ${currentView === 'director' ? 'active' : ''}`}
            onClick={() => setCurrentView('director')}
          >
            Director's Chair
          </button>
          <button
            className={`nav-btn ${currentView === 'storyboard' ? 'active' : ''}`}
            onClick={() => setCurrentView('storyboard')}
          >
            Neural Storyboard
          </button>
          <button
            className={`nav-btn ${currentView === 'brand' ? 'active' : ''}`}
            onClick={() => setCurrentView('brand')}
          >
            Brand Engine
          </button>
        </nav>
      </header>

      <main className="main-content">
        {currentView === 'upload' && (
          <UploadStage onGenerate={() => setCurrentView('gallery')} />
        )}

        {currentView === 'gallery' && (
          <AssetGallery onAddToStoryboard={handleAddToStoryboard} />
        )}

        {currentView === 'director' && (
          <DirectorChair />
        )}

        {currentView === 'storyboard' && (
          <NeuralStoryboard timelineSnippets={timelineSnippets} />
        )}

        {currentView === 'brand' && (
          <BrandEngine />
        )}
      </main>

      <AICoDirector currentView={currentView} />
    </div>
  )
}

export default App
