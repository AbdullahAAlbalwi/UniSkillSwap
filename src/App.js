import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Auth pages
import LandingPage from './pages/LandingPage';
import SignUp from './pages/auth/SignUp';
import Login from './pages/auth/Login';
import ForgotPassword from './pages/auth/ForgotPassword';
import AdminLogin from './pages/auth/AdminLogin';
import AdminRegister from './pages/auth/AdminRegister';

// Student pages
import StudentDashboard from './pages/student/StudentDashboard';
import BrowseTutors from './pages/student/BrowseTutors';
import TutorProfile from './pages/student/TutorProfile';
import PostRequest from './pages/student/PostRequest';
import MySessions from './pages/student/MySessions';
import Messages from './pages/student/Messages';

// Tutor pages
import TutorDashboard from './pages/tutor/TutorDashboard';
import MyOffers from './pages/tutor/MyOffers';
import CreateOffer from './pages/tutor/CreateOffer';
import AvailabilityManager from './pages/tutor/AvailabilityManager';

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminVerification from './pages/admin/AdminVerification';
import AdminReports from './pages/admin/AdminReports';

function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/" />;
  return children;
}

function AppRoutes() {
  const { user } = useAuth();
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/register" element={<AdminRegister />} />

      {/* Student routes */}
      <Route path="/dashboard" element={<ProtectedRoute allowedRoles={['student']}><StudentDashboard /></ProtectedRoute>} />
      <Route path="/browse" element={<BrowseTutors />} />
      <Route path="/tutor/:id" element={<TutorProfile />} />
      <Route path="/post-request" element={<ProtectedRoute allowedRoles={['student']}><PostRequest /></ProtectedRoute>} />
      <Route path="/sessions" element={<ProtectedRoute allowedRoles={['student']}><MySessions /></ProtectedRoute>} />
      <Route path="/messages" element={<ProtectedRoute allowedRoles={['student', 'tutor']}><Messages /></ProtectedRoute>} />

      {/* Tutor routes */}
      <Route path="/tutor-dashboard" element={<ProtectedRoute allowedRoles={['tutor']}><TutorDashboard /></ProtectedRoute>} />
      <Route path="/my-offers" element={<ProtectedRoute allowedRoles={['tutor']}><MyOffers /></ProtectedRoute>} />
      <Route path="/create-offer" element={<ProtectedRoute allowedRoles={['tutor']}><CreateOffer /></ProtectedRoute>} />
      <Route path="/availability" element={<ProtectedRoute allowedRoles={['tutor']}><AvailabilityManager /></ProtectedRoute>} />

      {/* Admin routes */}
      <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/users" element={<ProtectedRoute allowedRoles={['admin']}><AdminUsers /></ProtectedRoute>} />
      <Route path="/admin/verification" element={<ProtectedRoute allowedRoles={['admin']}><AdminVerification /></ProtectedRoute>} />
      <Route path="/admin/reports" element={<ProtectedRoute allowedRoles={['admin']}><AdminReports /></ProtectedRoute>} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
