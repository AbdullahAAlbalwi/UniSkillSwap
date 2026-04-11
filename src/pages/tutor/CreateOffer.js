// src/pages/tutor/CreateOffer.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';

const TAGS = ['Math', 'CS', 'Chemistry', 'Physics', 'Economics', 'Engineering', 'Writing', 'Python', 'Calculus', 'Statistics'];
const LEVELS = ['Beginner', 'Intermediate', 'Advanced'];
const MODES = ['Online', 'On-Campus', 'Both'];
const DURATIONS = ['30 minutes', '1 hour', '1.5 hours', '2 hours'];

export default function CreateOffer() {
  const [form, setForm] = useState({ title: '', description: '', tagInput: '', tags: [], level: '', mode: '', duration: '', status: 'Active' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const set = (k, v) => { setForm(f => ({ ...f, [k]: v })); setErrors(e => ({ ...e, [k]: '' })); };

  const addTag = () => {
    const t = form.tagInput.trim();
    if (t && !form.tags.includes(t)) { set('tags', [...form.tags, t]); set('tagInput', ''); }
  };

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = 'Offer title is required';
    if (!form.description.trim()) e.description = 'Description is required';
    if (!form.level) e.level = 'Select a difficulty level';
    if (!form.mode) e.mode = 'Select a session mode';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    setTimeout(() => { navigate('/my-offers'); }, 800);
  };

  return (
    <div>
      <Navbar />
      <div className="page-container fade-in" style={{ maxWidth: 700, margin: '0 auto' }}>
        <Link to="/my-offers" style={{ color: 'var(--primary)', fontSize: '0.9rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 4, marginBottom: '1.25rem' }}>
          <i className="bi bi-arrow-left"></i> Back to My Offers
        </Link>

        <div className="card-custom">
          <h2 style={{ fontFamily: 'var(--font-main)', fontWeight: 800, marginBottom: '0.25rem' }}>Create New Offer</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Define a new tutoring service you'd like to offer</p>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label-custom">Offer Title <span style={{ color: 'var(--danger)' }}>*</span></label>
              <input className="form-control-custom" placeholder="e.g., Calculus II - Derivatives & Integrals"
                value={form.title} onChange={e => set('title', e.target.value)} />
              <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: 4 }}>Create a clear, descriptive title for your tutoring offer</div>
              {errors.title && <div style={{ color: 'var(--danger)', fontSize: '0.8rem' }}>{errors.title}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label-custom">Description <span style={{ color: 'var(--danger)' }}>*</span></label>
              <textarea className="form-control-custom" rows={4}
                placeholder="Describe what you'll cover in this tutoring session, your approach, and what students can expect to learn..."
                value={form.description} onChange={e => set('description', e.target.value)}
                style={{ resize: 'vertical' }} />
              {errors.description && <div style={{ color: 'var(--danger)', fontSize: '0.8rem', marginTop: 4 }}>{errors.description}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label-custom">Subject Tags</label>
              <div className="d-flex gap-2">
                <input className="form-control-custom" placeholder="Add a tag (e.g., Math, Calculus, Engineering)"
                  value={form.tagInput} onChange={e => set('tagInput', e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  list="offer-tags" />
                <datalist id="offer-tags">{TAGS.map(t => <option key={t} value={t} />)}</datalist>
                <button type="button" className="btn-primary-custom" style={{ whiteSpace: 'nowrap' }} onClick={addTag}>
                  <i className="bi bi-plus-lg"></i>
                </button>
              </div>
              {form.tags.length > 0 && (
                <div className="d-flex flex-wrap gap-2 mt-2">
                  {form.tags.map(tag => (
                    <span key={tag} className="tag d-flex align-items-center gap-1">
                      {tag} <i className="bi bi-x" style={{ cursor: 'pointer' }} onClick={() => set('tags', form.tags.filter(t => t !== tag))}></i>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="row g-3 mb-3">
              <div className="col-sm-6">
                <label className="form-label-custom">Difficulty Level <span style={{ color: 'var(--danger)' }}>*</span></label>
                <select className="form-control-custom" value={form.level} onChange={e => set('level', e.target.value)}>
                  <option value="">Select level</option>
                  {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
                {errors.level && <div style={{ color: 'var(--danger)', fontSize: '0.8rem', marginTop: 4 }}>{errors.level}</div>}
              </div>
              <div className="col-sm-6">
                <label className="form-label-custom">Session Mode <span style={{ color: 'var(--danger)' }}>*</span></label>
                <select className="form-control-custom" value={form.mode} onChange={e => set('mode', e.target.value)}>
                  <option value="">Select mode</option>
                  {MODES.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
                {errors.mode && <div style={{ color: 'var(--danger)', fontSize: '0.8rem', marginTop: 4 }}>{errors.mode}</div>}
              </div>
              <div className="col-sm-6">
                <label className="form-label-custom">Typical Session Duration</label>
                <select className="form-control-custom" value={form.duration} onChange={e => set('duration', e.target.value)}>
                  <option value="">Select duration</option>
                  {DURATIONS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div className="col-sm-6">
                <label className="form-label-custom">Status</label>
                <select className="form-control-custom" value={form.status} onChange={e => set('status', e.target.value)}>
                  <option value="Active">Active (Published)</option>
                  <option value="Draft">Draft (Hidden)</option>
                </select>
              </div>
            </div>

            <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 8, padding: '0.75rem 1rem', marginBottom: '1.5rem' }}>
              <small style={{ color: '#1d4ed8' }}><strong>Tip:</strong> Be specific about what you'll teach and your teaching style. Students appreciate clear expectations and detailed descriptions.</small>
            </div>

            <div className="d-flex gap-3">
              <button type="submit" className="btn-primary-custom" style={{ flex: 1 }} disabled={loading}>
                {loading ? <span className="spinner-border spinner-border-sm me-2" /> : null}
                Create Offer
              </button>
              <Link to="/my-offers" className="btn-outline-custom text-center" style={{ flex: 1 }}>Cancel</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
