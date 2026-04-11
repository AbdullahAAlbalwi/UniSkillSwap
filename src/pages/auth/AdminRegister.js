// src/pages/auth/AdminRegister.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/Navbar';

export default function AdminRegister() {
  const [form, setForm] = useState({ name: '', email: '', dept: '', code: '', password: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      login(form.email, form.password, 'admin');
      navigate('/admin/dashboard');
    }, 800);
  };

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div>
      <Navbar />
      <div className="auth-page">
        <div className="auth-card fade-in" style={{ maxWidth: 440 }}>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <div className="nav-avatar" style={{ width: 60, height: 60, margin: '0 auto 1rem', fontSize: '1.5rem' }}>A</div>
            <h2 style={{ fontFamily: 'var(--font-main)', fontWeight: 800, color: 'var(--primary)', marginBottom: '0.25rem' }}>Admin Registration</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Create an admin account</p>
          </div>

          <form onSubmit={handleSubmit}>
            {[
              { k: 'name', label: 'Full Name', placeholder: 'John Doe', type: 'text' },
              { k: 'email', label: 'Admin Email', placeholder: 'admin@uniskillswap.com', type: 'email' },
              { k: 'dept', label: 'Department', placeholder: 'e.g. IT, Academic Affairs', type: 'text' },
            ].map(f => (
              <div className="mb-3" key={f.k}>
                <label className="form-label-custom">{f.label}</label>
                <input className="form-control-custom" type={f.type} placeholder={f.placeholder}
                  value={form[f.k]} onChange={e => set(f.k, e.target.value)} />
              </div>
            ))}
            <div className="mb-3">
              <label className="form-label-custom">Admin Access Code</label>
              <input className="form-control-custom" placeholder="Enter admin access code"
                value={form.code} onChange={e => set('code', e.target.value)} />
              <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: 4 }}>Contact your system administrator for the access code</div>
            </div>
            <div className="mb-3">
              <label className="form-label-custom">Password</label>
              <input className="form-control-custom" type="password" placeholder="••••••••"
                value={form.password} onChange={e => set('password', e.target.value)} />
            </div>
            <div className="mb-4">
              <label className="form-label-custom">Confirm Password</label>
              <input className="form-control-custom" type="password" placeholder="••••••••"
                value={form.confirm} onChange={e => set('confirm', e.target.value)} />
            </div>

            <button type="submit" className="btn-primary-custom w-100 py-3" style={{ fontSize: '1rem' }} disabled={loading}>
              {loading ? <span className="spinner-border spinner-border-sm me-2" /> : null}
              Create Admin Account
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Already have an admin account? <Link to="/admin/login" style={{ color: 'var(--primary)', fontWeight: 600 }}>Log in</Link>
          </p>
          <p style={{ textAlign: 'center', fontSize: '0.9rem' }}>
            <Link to="/signup" style={{ color: 'var(--primary)' }}>← Sign up as a regular user instead</Link>
          </p>
          <div style={{ background: '#fff8e1', border: '1px solid #ffe082', borderRadius: 8, padding: '0.75rem 1rem', marginTop: '1.25rem' }}>
            <small style={{ color: '#856404' }}><strong>Note:</strong> Admin registration requires a valid access code. Contact your system administrator if you need assistance.</small>
          </div>
        </div>
      </div>
    </div>
  );
}
