// src/pages/auth/ForgotPassword.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) setSent(true);
  };

  return (
    <div>
      <Navbar />
      <div className="auth-page">
        <div className="auth-card fade-in" style={{ maxWidth: 440 }}>
          {sent ? (
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 64, height: 64, background: 'var(--primary-light)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                <i className="bi bi-envelope-check" style={{ fontSize: '1.75rem', color: 'var(--primary)' }}></i>
              </div>
              <h3 style={{ fontFamily: 'var(--font-main)', fontWeight: 800, marginBottom: '0.5rem' }}>Check your email</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>We've sent a password reset link to <strong>{email}</strong>. The link expires in 30 minutes.</p>
              <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 600 }}>← Back to Login</Link>
            </div>
          ) : (
            <>
              <h2 style={{ fontFamily: 'var(--font-main)', fontWeight: 800, color: 'var(--primary)', marginBottom: '0.25rem' }}>Forgot Password?</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.75rem', fontSize: '0.95rem' }}>Enter your email address and we'll send you a link to reset your password.</p>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="form-label-custom">Email Address</label>
                  <div style={{ position: 'relative' }}>
                    <i className="bi bi-envelope" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}></i>
                    <input className="form-control-custom" type="email" placeholder="your.email@university.edu"
                      style={{ paddingLeft: '2.25rem' }} value={email} onChange={e => setEmail(e.target.value)} />
                  </div>
                </div>
                <button type="submit" className="btn-primary-custom w-100 py-3" style={{ fontSize: '1rem' }}>Send Reset Link</button>
              </form>
              <p style={{ textAlign: 'center', marginTop: '1.25rem' }}>
                <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 600 }}>← Back to Login</Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
