// src/pages/auth/Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/Navbar';

function postLoginPath(role) {
  if (role === 'tutor') return '/tutor-dashboard';
  if (role === 'both') return '/dashboard';
  return '/dashboard';
}

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const u = await login(email, password);
      if (u.role === 'admin') {
        navigate('/admin/dashboard');
        return;
      }
      navigate(postLoginPath(u.role));
    } catch (err) {
      setError(err.body?.error || err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="auth-page">
        <div className="auth-card fade-in">
          <h2 style={{ fontFamily: 'var(--font-main)', fontWeight: 800, color: 'var(--primary)', marginBottom: '0.25rem' }}>Welcome Back</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.75rem', fontSize: '0.95rem' }}>Log in to your UniSkillSwap account</p>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label-custom">Email Address</label>
              <input
                className="form-control-custom"
                type="email"
                placeholder="john.doe@university.edu"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
              />
            </div>
            <div className="mb-3">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <label className="form-label-custom mb-0">Password</label>
                <Link to="/forgot-password" style={{ color: 'var(--primary)', fontSize: '0.85rem', fontWeight: 600 }}>
                  Forgot Password?
                </Link>
              </div>
              <input
                className="form-control-custom"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
              />
            </div>

            {error && (
              <div
                style={{
                  background: '#f8d7da',
                  color: '#721c24',
                  borderRadius: 8,
                  padding: '0.6rem 1rem',
                  fontSize: '0.88rem',
                  marginBottom: '1rem',
                }}
              >
                {error}
              </div>
            )}

            <button type="submit" className="btn-primary-custom w-100 py-3 mt-1" style={{ fontSize: '1rem' }} disabled={loading}>
              {loading ? <span className="spinner-border spinner-border-sm me-2" /> : null}
              Log In
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Don&apos;t have an account?{' '}
            <Link to="/signup" style={{ color: 'var(--primary)', fontWeight: 600 }}>
              Sign up
            </Link>
          </p>

          <div style={{ textAlign: 'center', marginTop: '0.75rem', borderTop: '1px solid var(--border)', paddingTop: '0.75rem' }}>
            <Link to="/admin/login" style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Admin login →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
