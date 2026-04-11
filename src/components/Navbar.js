// src/components/Navbar.js
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ variant = 'student' }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/'); };

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav className="navbar-custom d-flex align-items-center justify-content-between" style={{ position: 'sticky', top: 0, zIndex: 100 }}>
      <Link to="/" className="navbar-brand-custom text-decoration-none">
        <div className="brand-icon"><i className="bi bi-mortarboard-fill"></i></div>
        UniSkillSwap
      </Link>

      {/* Desktop Nav */}
      <div className="d-none d-md-flex align-items-center gap-1">
        {!user && <>
          <Link to="/browse" className={`nav-link-custom ${isActive('/browse')}`}>Browse Tutors</Link>
          <Link to="/login" className="btn-outline-custom ms-2" style={{ color: 'white', borderColor: 'white' }}>Log In</Link>
          <Link to="/signup" className="btn-primary-custom ms-2">Sign Up</Link>
        </>}

        {user?.role === 'student' && <>
          <Link to="/browse" className={`nav-link-custom ${isActive('/browse')}`}>Browse Tutors</Link>
          <Link to="/dashboard" className={`nav-link-custom ${isActive('/dashboard')}`}>Dashboard</Link>
          <Link to="/messages" className={`nav-link-custom ${isActive('/messages')}`}>Messages</Link>
          <Link to="/sessions" className={`nav-link-custom ${isActive('/sessions')}`}>My Sessions</Link>
          <div className="nav-avatar ms-2" onClick={handleLogout} title="Logout">{user.initials}</div>
        </>}

        {user?.role === 'tutor' && <>
          <Link to="/browse" className={`nav-link-custom ${isActive('/browse')}`}>Browse Tutors</Link>
          <Link to="/tutor-dashboard" className={`nav-link-custom ${isActive('/tutor-dashboard')}`}>Dashboard</Link>
          <Link to="/messages" className={`nav-link-custom ${isActive('/messages')}`}>Messages</Link>
          <Link to="/sessions" className={`nav-link-custom ${isActive('/sessions')}`}>My Sessions</Link>
          <div className="nav-avatar ms-2" onClick={handleLogout} title="Logout">{user.initials}</div>
        </>}

        {user?.role === 'admin' && <>
          <Link to="/admin/dashboard" className={`nav-link-custom ${isActive('/admin/dashboard')}`}>Dashboard</Link>
          <Link to="/admin/users" className={`nav-link-custom ${isActive('/admin/users')}`}>Users</Link>
          <Link to="/admin/verification" className={`nav-link-custom ${isActive('/admin/verification')}`}>Verification</Link>
          <Link to="/admin/reports" className={`nav-link-custom ${isActive('/admin/reports')}`}>Reports</Link>
          <div className="nav-avatar ms-2" onClick={handleLogout} title="Logout">A</div>
        </>}
      </div>

      {/* Mobile hamburger */}
      <button className="d-md-none btn btn-link text-white p-0" onClick={() => setMenuOpen(!menuOpen)}>
        <i className={`bi ${menuOpen ? 'bi-x-lg' : 'bi-list'}`} style={{ fontSize: '1.5rem' }}></i>
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: '#1e2140', padding: '1rem', zIndex: 200 }}>
          {!user && <>
            <Link to="/browse" className="d-block nav-link-custom py-2" onClick={() => setMenuOpen(false)}>Browse Tutors</Link>
            <Link to="/login" className="d-block nav-link-custom py-2" onClick={() => setMenuOpen(false)}>Log In</Link>
            <Link to="/signup" className="d-block nav-link-custom py-2" onClick={() => setMenuOpen(false)}>Sign Up</Link>
          </>}
          {user?.role === 'student' && <>
            <Link to="/dashboard" className="d-block nav-link-custom py-2" onClick={() => setMenuOpen(false)}>Dashboard</Link>
            <Link to="/browse" className="d-block nav-link-custom py-2" onClick={() => setMenuOpen(false)}>Browse Tutors</Link>
            <Link to="/messages" className="d-block nav-link-custom py-2" onClick={() => setMenuOpen(false)}>Messages</Link>
            <Link to="/sessions" className="d-block nav-link-custom py-2" onClick={() => setMenuOpen(false)}>My Sessions</Link>
            <button className="btn btn-link nav-link-custom py-2 d-block" onClick={handleLogout}>Logout</button>
          </>}
          {user?.role === 'tutor' && <>
            <Link to="/tutor-dashboard" className="d-block nav-link-custom py-2" onClick={() => setMenuOpen(false)}>Dashboard</Link>
            <Link to="/browse" className="d-block nav-link-custom py-2" onClick={() => setMenuOpen(false)}>Browse Tutors</Link>
            <Link to="/messages" className="d-block nav-link-custom py-2" onClick={() => setMenuOpen(false)}>Messages</Link>
            <button className="btn btn-link nav-link-custom py-2 d-block" onClick={handleLogout}>Logout</button>
          </>}
          {user?.role === 'admin' && <>
            <Link to="/admin/dashboard" className="d-block nav-link-custom py-2" onClick={() => setMenuOpen(false)}>Dashboard</Link>
            <Link to="/admin/users" className="d-block nav-link-custom py-2" onClick={() => setMenuOpen(false)}>Users</Link>
            <Link to="/admin/verification" className="d-block nav-link-custom py-2" onClick={() => setMenuOpen(false)}>Verification</Link>
            <Link to="/admin/reports" className="d-block nav-link-custom py-2" onClick={() => setMenuOpen(false)}>Reports</Link>
            <button className="btn btn-link nav-link-custom py-2 d-block" onClick={handleLogout}>Logout</button>
          </>}
        </div>
      )}
    </nav>
  );
}
