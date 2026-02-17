import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Practice from './pages/Practice';
import Assessments from './pages/Assessments';
import Resources from './pages/Resources';
import Profile from './pages/Profile';
import Results from './pages/Results';
import Tests from './pages/Tests';
import MockAssessment from './pages/MockAssessment';
import Ship from './pages/Ship';
import Proof from './pages/Proof';
import BuilderLayout from './layouts/BuilderLayout';
import RBStep from './pages/RBStep';
import RBProof from './pages/RBProof';

// Unified Platform Entry & New Models
import UnifiedLanding from './pages/UnifiedLanding';
import NotificationLayout from './layouts/NotificationLayout';
import NotificationDashboard from './pages/notification-tracker/Dashboard';
import NotificationLanding from './pages/notification-tracker/Landing';
import NotificationSettings from './pages/notification-tracker/Settings';
import NotificationSaved from './pages/notification-tracker/Saved';
import NotificationDigest from './pages/notification-tracker/Digest';
import NotificationProof from './pages/notification-tracker/Proof';

// Project 3: AI Resume Builder Implementation Pages
import ResumeBuilder from './pages/ResumeBuilder';
import ResumePreview from './pages/ResumePreview';

function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Core Unified Entry */}
        <Route path="/" element={<UnifiedLanding />} />


        {/* Platform Experience (Command Center) */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/assessments" element={<Assessments />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/results/:id" element={<Results />} />
          <Route path="/assessment/:id" element={<MockAssessment />} />

          {/* Integrated MODEL 1: Job tracker */}
          <Route path="/jt/dashboard" element={<NotificationDashboard />} />
          <Route path="/jt/settings" element={<NotificationSettings />} />
          <Route path="/jt/saved" element={<NotificationSaved />} />
          <Route path="/jt/digest" element={<NotificationDigest />} />
          <Route path="/jt/proof" element={<NotificationProof />} />

          {/* Project Finalization Track (Model 2: Placement Readiness) */}
          <Route path="/prp/07-test" element={<Tests />} />
          <Route path="/prp/08-ship" element={<Ship />} />
          <Route path="/prp/proof" element={<Proof />} />
        </Route>

        {/* MODEL 3: AI Resume Builder (Build Track) */}
        <Route path="/resume-engine" element={<ResumeBuilder />} />
        <Route path="/preview" element={<ResumePreview />} />

        {/* Build Track Milestones (Rail) */}
        <Route element={<BuilderLayout />}>
          <Route path="/rb/:stepId" element={<RBStep />} />
          <Route path="/rb/proof" element={<RBProof />} />
          <Route path="/rb" element={<Navigate to="/rb/01-problem" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
