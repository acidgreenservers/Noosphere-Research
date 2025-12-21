import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import StarfieldLayout from './components/StarfieldLayout'
import Home from './pages/Home'
import DocumentationLanding from './pages/landings/DocumentationLanding'
import ClinesLandingPage from './pages/landings/ClinesLandingPage'
import FringeExplorationIndex from './pages/landings/FringeExplorationIndex'
import ResearchOverview from './pages/documentation/ResearchOverview'
import BiologicalConsciousness from './pages/papers/BiologicalConsciousness'
import ObserverEffect from './pages/papers/ObserverEffect'
import QCTOETheory from './pages/papers/QCTOETheory'
import HumanCoherenceAttenuationPractice from './pages/papers/HumanCoherenceAttenuationPractice'
import OBEQuantumConsciousness from './pages/papers/fringe/OBEQuantumConsciousness'
import UnifiedQuantumTheory from './pages/papers/fringe/UnifiedQuantumTheory'
import InformationalRealityFramework from './pages/papers/InformationalRealityFramework'
import SolvingReality from './pages/papers/SolvingReality'
import ParticipatoryConsciousnessSpectrum from './pages/papers/ParticipatoryConsciousnessSpectrum'

export default function App() {
    return (
        <Router basename="/the-lucid-engine">
            <StarfieldLayout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/pages/landings/documentation-landing.html" element={<DocumentationLanding />} />
                    <Route path="/pages/landings/clines-landing-page.html" element={<ClinesLandingPage />} />
                    <Route path="/pages/landings/fringe-exploration-index.html" element={<FringeExplorationIndex />} />
                    <Route path="/pages/documentation/research-overview.html" element={<ResearchOverview />} />
                    <Route path="/pages/papers/biological-consciousness.html" element={<BiologicalConsciousness />} />
                    <Route path="/pages/papers/observer-effect.html" element={<ObserverEffect />} />
                    <Route path="/pages/papers/qctoe-theory.html" element={<QCTOETheory />} />
                    <Route path="/pages/papers/human-coherence-attenuation-practice.html" element={<HumanCoherenceAttenuationPractice />} />
                    <Route path="/pages/papers/fringe/obe-quantum-consciousness.html" element={<OBEQuantumConsciousness />} />
                    <Route path="/pages/papers/fringe/unified-quantum-theory.html" element={<UnifiedQuantumTheory />} />
                    <Route path="/pages/papers/informational-reality-framework.html" element={<InformationalRealityFramework />} />
                    <Route path="/pages/papers/solving-reality.html" element={<SolvingReality />} />
                    <Route path="/pages/papers/participatory-consciousness-spectrum.html" element={<ParticipatoryConsciousnessSpectrum />} />
                    {/* Add other routes here to match the file structure paths for compatibility */}
                </Routes>
            </StarfieldLayout>
        </Router>
    )
}
