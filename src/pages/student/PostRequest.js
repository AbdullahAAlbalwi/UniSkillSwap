// src/pages/student/PostRequest.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';

const TAGS = ['Python', 'Calculus', 'Derivatives', 'Integration', 'Linear Algebra', 'Chemistry', 'Physics', 'Economics', 'Writing', 'Data Structures', 'JavaScript', 'Statistics'];
const LEVELS = ['Beginner', 'Intermediate', 'Advanced'];

export default function PostRequest() {
  const [form, setForm] = useState({ subject: '', description: '', mode: 'Online', level: '', tagInput: '', tags: [] });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const set = (k, v) => { setForm(f => ({ ...f, [k]: v })); setErrors(e => ({ ...e, [k]: '' })); };

  const addTag = () => {
    const t = form.tagInput.trim();
    if (t && !form.tags.includes(t)) {
      set('tags', [...form.tags, t]);
      set('tagInput', '');
    }
  };

  const removeTag = (tag) => set('tags', form.tags.filter(t => t !== tag));

  const validate = () => {
    const e = {};
    if (!form.subject.trim()) e.subject = 'Subject is required';
    if (!form.description.trim()) e.description = 'Description is required';
    if (!form.level) e.level = 'Please select a difficulty level';
    return e;
  };

  const handlePost = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSaving(true);
    setTimeout(() => { setSaving(false); setSubmitted(true); }, 900);
  };

  const handleDraft = () => {
    setSaving(true);
    setTimeout(() => { setSaving(false); navigate('/dashboard'); }, 700);
  };

  if (submitted) return (
    <div>
      <Navbar />
      <div className="page-container fade-in" style={{ maxWidth: 600, margin: '3rem auto' }}>
        <div className="card-custom text-center py-5">
          <div style={{ width: 72, height: 72, background: 'var(--primary-light)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
            <i className="bi bi-check-circle-fill" style={{ fontSize: '2rem', color: 'var(--primary)' }}></i>
          </div>
          <h3 style={{ fontFamily: 'var(--font-main)', fontWeight: 800, marginBottom: '0.5rem' }}>Request Posted!</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Your help request has been published. Tutors will be notified.</p>
          <div className="d-flex gap-3 justify-content-center">
            <button className="btn-primary-custom" onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
            <button className="btn-outline-custom" onClick={() => { setSubmitted(false); setForm({ subject: '', description: '', mode: 'Online', level: '', tagInput: '', tags: [] }); }}>Post Another</button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <Navbar />
      <div className="page-container fade-in" style={{ maxWidth: 700, margin: '0 auto' }}>
        <div className="card-custom">
          <h2 style={{ fontFamily: 'var(--font-main)', fontWeight: 800, marginBottom: '0.25rem' }}>Post a Help Request</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Describe what you need help with and connect with tutors</p>

          <form onSubmit={handlePost}>
            <div className="mb-3">
              <label className="form-label-custom">Subject / Course</label>
              <input className="form-control-custom" placeholder="e.g., Calculus II, Python Programming"
                value={form.subject} onChange={e => set('subject', e.target.value)} />
              {errors.subject && <div style={{ color: 'var(--danger)', fontSize: '0.8rem', marginTop: 4 }}>{errors.subject}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label-custom">Description</label>
              <textarea className="form-control-custom" rows={4}
                placeholder="Describe what topics you need help with and any specific concepts you're struggling with..."
                value={form.description} onChange={e => set('description', e.target.value)}
                style={{ resize: 'vertical' }} />
              {errors.description && <div style={{ color: 'var(--danger)', fontSize: '0.8rem', marginTop: 4 }}>{errors.description}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label-custom">Skill Tags</label>
              <div className="d-flex gap-2">
                <input className="form-control-custom" placeholder="Add a tag (e.g., Derivatives, Integration)"
                  value={form.tagInput} onChange={e => set('tagInput', e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  list="tag-suggestions" />
                <datalist id="tag-suggestions">{TAGS.map(t => <option key={t} value={t} />)}</datalist>
                <button type="button" className="btn-primary-custom" style={{ whiteSpace: 'nowrap' }} onClick={addTag}>Add</button>
              </div>
              {form.tags.length > 0 && (
                <div className="d-flex flex-wrap gap-2 mt-2">
                  {form.tags.map(tag => (
                    <span key={tag} className="tag d-flex align-items-center gap-1">
                      {tag}
                      <i className="bi bi-x" style={{ cursor: 'pointer' }} onClick={() => removeTag(tag)}></i>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label-custom">Difficulty Level</label>
              <div className="d-flex gap-2 flex-wrap">
                {LEVELS.map(lvl => (
                  <button key={lvl} type="button"
                    style={{ padding: '0.5rem 1.25rem', border: `2px solid ${form.level === lvl ? 'var(--primary)' : 'var(--border)'}`, borderRadius: 8, background: form.level === lvl ? 'var(--primary)' : 'white', color: form.level === lvl ? 'white' : 'var(--text-dark)', cursor: 'pointer', fontFamily: 'var(--font-main)', fontWeight: 600, fontSize: '0.88rem', transition: 'all 0.2s' }}
                    onClick={() => set('level', lvl)}>{lvl}</button>
                ))}
              </div>
              {errors.level && <div style={{ color: 'var(--danger)', fontSize: '0.8rem', marginTop: 4 }}>{errors.level}</div>}
            </div>

            <div className="mb-4">
              <label className="form-label-custom">Session Mode</label>
              <div className="d-flex gap-3">
                {[{ val: 'Online', icon: 'bi-camera-video', sub: 'Via video call' }, { val: 'On-Campus', icon: 'bi-geo-alt', sub: 'In-person meeting' }].map(m => (
                  <button key={m.val} type="button"
                    style={{ flex: 1, padding: '1rem', border: `2px solid ${form.mode === m.val ? 'var(--primary)' : 'var(--border)'}`, borderRadius: 10, background: form.mode === m.val ? 'var(--primary)' : 'white', color: form.mode === m.val ? 'white' : 'var(--text-dark)', cursor: 'pointer', fontFamily: 'var(--font-main)', fontWeight: 700, transition: 'all 0.2s' }}
                    onClick={() => set('mode', m.val)}>
                    <div><i className={`bi ${m.icon} me-1`}></i>{m.val}</div>
                    <div style={{ fontSize: '0.78rem', opacity: 0.8, marginTop: 2 }}>{m.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label-custom">Preferred Time Slots</label>
              <div style={{ border: '1.5px dashed var(--border)', borderRadius: 10, padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                <i className="bi bi-calendar3" style={{ fontSize: '1.5rem', marginBottom: '0.5rem', display: 'block' }}></i>
                <div style={{ fontWeight: 500 }}>Calendar picker would go here</div>
                <div style={{ fontSize: '0.85rem', marginTop: 4 }}>Click to select your preferred dates and times</div>
              </div>
            </div>

            <div className="d-flex gap-3">
              <button type="button" className="btn-outline-custom" style={{ flex: 1 }} onClick={handleDraft} disabled={saving}>Save as Draft</button>
              <button type="submit" className="btn-primary-custom" style={{ flex: 1 }} disabled={saving}>
                {saving ? <span className="spinner-border spinner-border-sm me-2" /> : null}
                Post Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
