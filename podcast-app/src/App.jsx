import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import PodcastDetailPage from './pages/PodcastDetailPage';
import EpisodeDetailPage from './pages/EpisodeDetailPage';
import './App.css'

function App() {
 return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/podcast/:podcastId" element={<PodcastDetailPage />} />
        <Route path="/podcast/:podcastId/episode/:episodeId" element={<EpisodeDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App
