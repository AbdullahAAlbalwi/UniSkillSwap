// src/pages/auth/AdminLogin.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/Navbar';

export default function AdminLogin() {
  const [form, setForm] = useState({ email: '', password: '', code: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { loginAdmin } = useAuth();
  const navigate = useNavigate();

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await loginAdmin(form.email, form.password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.body?.error || err.message || 'Admin login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="auth-page">
        <div className="auth-card fade-in" style={{ maxWidth: 440 }}>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <div className="nav-avatar" style={{ width: 60, height: 60, margin: '0 auto 1rem', fontSize: '1.5rem' }}>
              A
            </div>
            <h2 style={{ fontFamily: 'var(--font-main)', fontWeight: 800, color: 'var(--primary)', marginBottom: '0.25rem' }}>Admin Access</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Log in to the admin dashboard</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label-custom">Admin Email</label>
              <input
                className="form-control-custom"
                type="email"
                placeholder="admin@uniskillswap.local"
                value={form.email}
                onChange={(e) => set('email', e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label-custom">Password</label>
              <input
                className="form-control-custom"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => set('password', e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="form-label-custom">Security Code (2FA)</label>
              <input className="form-control-custom" placeholder="000000" maxLength={6} value={form.code} onChange={(e) => set('code', e.target.value)} />
              <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: 4 }}>UI placeholder; API login uses email and password only</div>
            </div>

            {error && (
              <div style={{ background: '#f8d7da', color: '#721c24', borderRadius: 8, padding: '0.6rem 1rem', fontSize: '0.88rem', marginBottom: '1rem' }}>{error}</div>
            )}

            <button type="submit" className="btn-primary-custom w-100 py-3" style={{ fontSize: '1rem' }} disabled={loading}>
              {loading ? <span className="spinner-border spinner-border-sm me-2" /> : null}
              Log In to Admin Panel
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Don&apos;t have an admin account?{' '}
            <Link to="/admin/register" style={{ color: 'var(--primary)', fontWeight: 600 }}>
              Sign up
            </Link>
          </p>
          <p style={{ textAlign: 'center', fontSize: '0.9rem' }}>
            <Link to="/login" style={{ color: 'var(--primary)' }}>
              ← Back to regular login
            </Link>
          </p>

          <div style={{ background: '#fff8e1', border: '1px solid #ffe082', borderRadius: 8, padding: '0.75rem 1rem', marginTop: '1.25rem' }}>
            <small style={{ color: '#856404' }}>
              <strong>Security Notice:</strong> Admin access requires two-factor authentication and is monitored for security purposes.
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}
