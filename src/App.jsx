import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import Layout from './components/layout/Layout';

import LandingPage from './pages/misc/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import NotFoundPage from './pages/misc/NotFoundPage';

import RequesterDashboard from './pages/dashboard/RequesterDashboard';
import TutorDashboard from './pages/dashboard/TutorDashboard';
import BrowseTutorsPage from './pages/listings/BrowseTutorsPage';
import TutorProfilePage from './pages/listings/TutorProfilePage';
import PostRequestPage from './pages/listings/PostRequestPage';
import MyRequestsPage from './pages/listings/MyRequestsPage';
import MyOffersPage from './pages/listings/MyOffersPage';
import NewOfferPage from './pages/listings/NewOfferPage';
import AvailabilityPage from './pages/listings/AvailabilityPage';
import BookSessionPage from './pages/booking/BookSessionPage';
import MySessionsPage from './pages/booking/MySessionsPage';
import PendingRequestsPage from './pages/booking/PendingRequestsPage';
import ReviewPage from './pages/booking/ReviewPage';
import ProfilePage from './pages/profile/ProfilePage';
import MessagesPage from './pages/messages/MessagesPage';

import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagementPage from './pages/admin/UserManagementPage';
import TutorVerificationPage from './pages/admin/TutorVerificationPage';
import ReportsPage from './pages/admin/ReportsPage';
import AnalyticsPage from './pages/admin/AnalyticsPage';

function ProtectedRoute({ children, allowedRoles }) {
  const { currentUser } = useAuth();
  if (!currentUser) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/dashboard" replace />;
  }
  return <Layout>{children}</Layout>;
}

function DashboardRedirect() {
  const { currentUser } = useAuth();
  if (!currentUser) return <Navigate to="/login" replace />;
  if (currentUser.role === 'admin') return <Navigate to="/admin" replace />;
  if (currentUser.role === 'tutor') return <Navigate to="/tutor-dashboard" replace />;
  return <RequesterDashboard />;
}

function PublicRoute({ children }) {
  const { currentUser } = useAuth();
  if (currentUser) return <Navigate to="/dashboard" replace />;
  return children;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<PublicRoute><LandingPage /></PublicRoute>} />
      <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
      <Route path="/forgot-password" element={<PublicRoute><ForgotPasswordPage /></PublicRoute>} />

      {/* Dashboard */}
      <Route path="/dashboard" element={<ProtectedRoute><DashboardRedirect /></ProtectedRoute>} />

      {/* Requester */}
      <Route path="/browse" element={<ProtectedRoute allowedRoles={['requester', 'tutor']}><BrowseTutorsPage /></ProtectedRoute>} />
      <Route path="/tutor/:id" element={<ProtectedRoute allowedRoles={['requester', 'tutor']}><TutorProfilePage /></ProtectedRoute>} />
      <Route path="/post-request" element={<ProtectedRoute allowedRoles={['requester']}><PostRequestPage /></ProtectedRoute>} />
      <Route path="/my-requests" element={<ProtectedRoute allowedRoles={['requester']}><MyRequestsPage /></ProtectedRoute>} />
      <Route path="/book/:tutorId" element={<ProtectedRoute allowedRoles={['requester']}><BookSessionPage /></ProtectedRoute>} />

      {/* Tutor */}
      <Route path="/tutor-dashboard" element={<ProtectedRoute allowedRoles={['tutor']}><TutorDashboard /></ProtectedRoute>} />
      <Route path="/my-offers" element={<ProtectedRoute allowedRoles={['tutor']}><MyOffersPage /></ProtectedRoute>} />
      <Route path="/my-offers/new" element={<ProtectedRoute allowedRoles={['tutor']}><NewOfferPage /></ProtectedRoute>} />
      <Route path="/availability" element={<ProtectedRoute allowedRoles={['tutor']}><AvailabilityPage /></ProtectedRoute>} />
      <Route path="/pending-requests" element={<ProtectedRoute allowedRoles={['tutor']}><PendingRequestsPage /></ProtectedRoute>} />

      {/* Shared */}
      <Route path="/my-sessions" element={<ProtectedRoute><MySessionsPage /></ProtectedRoute>} />
      <Route path="/review/:sessionId" element={<ProtectedRoute><ReviewPage /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      <Route path="/messages" element={<ProtectedRoute><MessagesPage /></ProtectedRoute>} />

      {/* Admin */}
      <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/users" element={<ProtectedRoute allowedRoles={['admin']}><UserManagementPage /></ProtectedRoute>} />
      <Route path="/admin/verify" element={<ProtectedRoute allowedRoles={['admin']}><TutorVerificationPage /></ProtectedRoute>} />
      <Route path="/admin/reports" element={<ProtectedRoute allowedRoles={['admin']}><ReportsPage /></ProtectedRoute>} />
      <Route path="/admin/analytics" element={<ProtectedRoute allowedRoles={['admin']}><AnalyticsPage /></ProtectedRoute>} />

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <AppRoutes />
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
