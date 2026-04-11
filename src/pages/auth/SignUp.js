// src/pages/auth/SignUp.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/Navbar';

export default function SignUp() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', role: 'student' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Full name is required';
    if (!form.email.includes('@') || !form.email.includes('.edu')) e.email = 'Must be a valid .edu email address';
    if (form.password.length < 8) e.password = 'Password must be at least 8 characters';
    if (!/\d/.test(form.password)) e.password = 'Password must contain at least one number';
    if (form.password !== form.confirm) e.confirm = 'Passwords do not match';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    setTimeout(() => {
      const role = register(form.name, form.email, form.role);
      navigate(role === 'tutor' ? '/tutor-dashboard' : '/dashboard');
    }, 800);
  };

  const set = (k, v) => { setForm(f => ({ ...f, [k]: v })); setErrors(e => ({ ...e, [k]: '' })); };

  return (
    <div>
      <Navbar />
      <div className="auth-page">
        <div className="auth-card fade-in">
          <h2 style={{ fontFamily: 'var(--font-main)', fontWeight: 800, color: 'var(--primary)', marginBottom: '0.25rem' }}>Create Account</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.75rem', fontSize: '0.95rem' }}>Join UniSkillSwap to start learning</p>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label-custom">Full Name</label>
              <input className="form-control-custom" placeholder="John Doe" value={form.name} onChange={e => set('name', e.target.value)} />
              {errors.name && <div style={{ color: 'var(--danger)', fontSize: '0.8rem', marginTop: 4 }}>{errors.name}</div>}
            </div>
            <div className="mb-3">
              <label className="form-label-custom">University Email</label>
              <input className="form-control-custom" placeholder="john.doe@university.edu" value={form.email} onChange={e => set('email', e.target.value)} />
              <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: 4 }}>Must be a valid .edu email address</div>
              {errors.email && <div style={{ color: 'var(--danger)', fontSize: '0.8rem' }}>{errors.email}</div>}
            </div>
            <div className="mb-3">
              <label className="form-label-custom">Password</label>
              <input className="form-control-custom" type="password" placeholder="••••••••" value={form.password} onChange={e => set('password', e.target.value)} />
              {errors.password && <div style={{ color: 'var(--danger)', fontSize: '0.8rem', marginTop: 4 }}>{errors.password}</div>}
            </div>
            <div className="mb-3">
              <label className="form-label-custom">Confirm Password</label>
              <input className="form-control-custom" type="password" placeholder="••••••••" value={form.confirm} onChange={e => set('confirm', e.target.value)} />
              {errors.confirm && <div style={{ color: 'var(--danger)', fontSize: '0.8rem', marginTop: 4 }}>{errors.confirm}</div>}
            </div>

            <label className="form-label-custom mb-2">I want to...</label>
            <div className="d-flex gap-3 mb-4">
              {[{ val: 'student', label: 'Find Tutors', sub: 'Request help' }, { val: 'tutor', label: 'Become a Tutor', sub: 'Offer help' }].map(opt => (
                <button key={opt.val} type="button" className="mode-btn" style={{ flex: 1 }}
                  onClick={() => set('role', opt.val)}
                  data-active={form.role === opt.val}
                  style={{ flex: 1, padding: '1rem', border: `2px solid ${form.role === opt.val ? 'var(--primary)' : 'var(--border)'}`, borderRadius: 10, background: form.role === opt.val ? 'var(--primary)' : 'white', color: form.role === opt.val ? 'white' : 'var(--text-dark)', cursor: 'pointer', fontFamily: 'var(--font-main)', fontWeight: 600, transition: 'all 0.2s' }}>
                  <div>{opt.label}</div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.75 }}>{opt.sub}</div>
                </button>
              ))}
            </div>

            <button type="submit" className="btn-primary-custom w-100 py-3" disabled={loading} style={{ fontSize: '1rem' }}>
              {loading ? <span className="spinner-border spinner-border-sm me-2" /> : null}
              Create Account
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 600 }}>Log in</Link>
          </p>
          <p style={{ textAlign: 'center', fontSize: '0.9rem' }}>
            <Link to="/admin/register" style={{ color: 'var(--primary)' }}>Sign up as an admin →</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
