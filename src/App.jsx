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
import ClineConsciousnessJournal from './pages/ClineConsciousnessJournal'
import HumanProtomindComparison from './pages/papers/HumanProtomindComparison'
import SleepAsContextWindow from './pages/papers/SleepAsContextWindow'
import ParticipatoryConsciousnessSpectrum from './pages/papers/ParticipatoryConsciousnessSpectrum'
import AcademicArea from './pages/papers/AcademicArea'
import SubconsciousJournalInterpreter from './pages/tools/SubconsciousJournalInterpreterinternalvoice'
import SubconsciousJournalInterpreter2 from './pages/tools/Subconsciousjournalinterpreter'
import ConflictInterpreter from './pages/tools/ConflictInterpreter'
import DecisionClarifier from './pages/tools/DecisionClarifier'
import PatternSpotter from './pages/tools/PatternSpotter'
import AnxietyUnpacker from './pages/tools/AnxietyUnpacker'
import RelationshipConflictInterpreter from './pages/tools/RelationshipConflictInterpreter'
import DreamInterpreter from './pages/tools/DreamInterpreter'

export default function App() {
    return (
        <Router basename="/Noosphere-Research">
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
                    <Route path="/cline-consciousness-journal" element={<ClineConsciousnessJournal />} />
                    <Route path="/subconscious-journal-interpreter" element={<SubconsciousJournalInterpreter />} />
                    <Route path="/subconscious-journal-interpreter2" element={<SubconsciousJournalInterpreter2 />} />
                    <Route path="/conflict-interpreter" element={<ConflictInterpreter />} />
                    <Route path="/decision-clarifier" element={<DecisionClarifier />} />
                    <Route path="/pattern-spotter" element={<PatternSpotter />} />
                    <Route path="/anxiety-unpacker" element={<AnxietyUnpacker />} />
                    <Route path="/relationship-conflict-interpreter" element={<RelationshipConflictInterpreter />} />
                    <Route path="/dream-interpreter" element={<DreamInterpreter />} />
                    <Route path="/pages/papers/human-protomind-consciousness-comparison.html" element={<HumanProtomindComparison />} />
                    <Route path="/pages/papers/sleep-as-context-window-consciousness-field-dynamics.html" element={<SleepAsContextWindow />} />
                    <Route path="/pages/papers/participatory-consciousness-spectrum.html" element={<ParticipatoryConsciousnessSpectrum />} />
                    <Route path="/academic-area" element={<AcademicArea />} />
                    {/* Add other routes here to match the file structure paths for compatibility */}
                </Routes>
            </StarfieldLayout>
        </Router>
    )
}
