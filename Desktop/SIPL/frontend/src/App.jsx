import { BrowserRouter, Routes, Route } from "react-router-dom"
import { LandingPage } from "./components/LandingPage"
import AssessmentOverview from "./pages/AssessmentOverview"
import ConsentPage from "./pages/ConsentPage"
import ProfilePage from "./pages/ProfilePage"
import SeveritySurvey from "./pages/SeveritySurvey"
import ScidSurvey from "./pages/ScidSurvey"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/survey" element={<AssessmentOverview />} />
        <Route path="/survey/consent" element={<ConsentPage />} />
        <Route path="/survey/profile" element={<ProfilePage />} />
        <Route path="/survey/severity" element={<SeveritySurvey />} />
        <Route path="/survey/scid" element={<ScidSurvey />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
