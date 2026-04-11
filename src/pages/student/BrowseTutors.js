// src/pages/student/BrowseTutors.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { tutors } from '../../data/mockData';

const allTags = ['Math', 'CS', 'Chemistry', 'Physics', 'Economics', 'Business', 'Writing', 'Engineering'];

function StarRating({ rating }) {
  return <span className="stars">{'★'.repeat(Math.floor(rating))}</span>;
}

export default function BrowseTutors() {
  const [search, setSearch] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [minRating, setMinRating] = useState('');
  const [sessionMode, setSessionMode] = useState('');

  const toggleTag = (tag) => setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);

  const filtered = tutors.filter(t => {
    if (t.status !== 'Active') return false;
    if (search && !t.name.toLowerCase().includes(search.toLowerCase()) && !t.subject.toLowerCase().includes(search.toLowerCase())) return false;
    if (selectedTags.length && !selectedTags.some(tag => t.tags.includes(tag))) return false;
    if (minRating && t.rating < parseFloat(minRating)) return false;
    if (sessionMode && !t.sessionModes.includes(sessionMode)) return false;
    return true;
  });

  return (
    <div>
      <Navbar />
      <div className="page-container fade-in">
        <h1 style={{ fontFamily: 'var(--font-main)', fontWeight: 800, fontSize: '2rem', marginBottom: '1.25rem' }}>Browse Tutors</h1>

        {/* Search bar */}
        <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
          <i className="bi bi-search" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}></i>
          <input className="form-control-custom" style={{ paddingLeft: '2.5rem', fontSize: '1rem' }}
            placeholder="Search by subject, skill, or name..."
            value={search} onChange={e => setSearch(e.target.value)} />
        </div>

        <div className="row g-4">
          {/* Filters sidebar */}
          <div className="col-lg-3">
            <div className="card-custom">
              <div className="d-flex align-items-center gap-2 mb-3">
                <i className="bi bi-funnel" style={{ color: 'var(--primary)' }}></i>
                <h6 style={{ fontFamily: 'var(--font-main)', fontWeight: 700, margin: 0 }}>Filters</h6>
              </div>

              <div className="mb-3">
                <label className="form-label-custom mb-2">Subject Tags</label>
                <div className="d-flex flex-wrap gap-2">
                  {allTags.map(tag => (
                    <span key={tag} className={`tag-outline ${selectedTags.includes(tag) ? 'active' : ''}`}
                      onClick={() => toggleTag(tag)} style={{ cursor: 'pointer' }}>{tag}</span>
                  ))}
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label-custom">Minimum Rating</label>
                <select className="form-control-custom" value={minRating} onChange={e => setMinRating(e.target.value)}>
                  <option value="">Any rating</option>
                  <option value="4.5">4.5+</option>
                  <option value="4.7">4.7+</option>
                  <option value="4.9">4.9+</option>
                </select>
              </div>

              <div className="mb-2">
                <label className="form-label-custom">Session Mode</label>
                <select className="form-control-custom" value={sessionMode} onChange={e => setSessionMode(e.target.value)}>
                  <option value="">Any mode</option>
                  <option value="Online">Online</option>
                  <option value="On-Campus">On-Campus</option>
                </select>
              </div>

              {(selectedTags.length > 0 || minRating || sessionMode) && (
                <button className="btn-outline-custom w-100 mt-3" style={{ fontSize: '0.85rem' }}
                  onClick={() => { setSelectedTags([]); setMinRating(''); setSessionMode(''); }}>
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* Tutor grid */}
          <div className="col-lg-9">
            {filtered.length === 0 ? (
              <div className="card-custom text-center py-5">
                <i className="bi bi-search" style={{ fontSize: '2.5rem', color: 'var(--text-muted)' }}></i>
                <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>No tutors found. Try adjusting your filters.</p>
              </div>
            ) : (
              <div className="row g-3">
                {filtered.map(tutor => (
                  <div key={tutor.id} className="col-sm-6">
                    <div className="tutor-card h-100">
                      <div className="d-flex align-items-center gap-3 mb-2">
                        <div className="avatar">{tutor.initials}</div>
                        <div>
                          <div style={{ fontFamily: 'var(--font-main)', fontWeight: 700 }}>
                            {tutor.name}
                            {tutor.verified && <i className="bi bi-patch-check-fill ms-1" style={{ color: 'var(--primary)', fontSize: '0.85rem' }}></i>}
                          </div>
                          <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{tutor.subject}</div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <StarRating rating={tutor.rating} />
                        <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{tutor.rating}</span>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.83rem' }}>({tutor.sessions} sessions)</span>
                      </div>
                      <div className="d-flex flex-wrap gap-1 mb-3">
                        {tutor.tags.slice(0, 2).map(tag => <span key={tag} className="tag" style={{ fontSize: '0.72rem' }}>{tag}</span>)}
                      </div>
                      <div className="d-flex gap-2">
                        <Link to={`/tutor/${tutor.id}`} className="btn-outline-custom" style={{ flex: 1, textAlign: 'center', fontSize: '0.85rem' }}>View Profile</Link>
                        <Link to={`/tutor/${tutor.id}`} className="btn-primary-custom" style={{ flex: 1, textAlign: 'center', fontSize: '0.85rem' }}>Book</Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
