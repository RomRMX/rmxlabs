import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import MobThreshPreview from './pages/MobThreshPreview';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/mobthresh-preview" element={<MobThreshPreview />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
