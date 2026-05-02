// src/pages/student/BrowseTutors.js
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { api } from '../../api/client';
import { adaptTutorListItem } from '../../utils/tutorAdapter';

const allTags = ['Math', 'CS', 'Chemistry', 'Physics', 'Economics', 'Business', 'Writing', 'Engineering'];

function StarRating({ rating }) {
  return <span className="stars">{'★'.repeat(Math.floor(rating))}</span>;
}

export default function BrowseTutors() {
  const [search, setSearch] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [minRating, setMinRating] = useState('');
  const [sessionMode, setSessionMode] = useState('');
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError('');
      try {
        const params = new URLSearchParams();
        if (search.trim()) params.set('search', search.trim());
        if (minRating) params.set('minRating', minRating);
        if (sessionMode) params.set('mode', sessionMode);
        const q = params.toString();
        const data = await api(`/tutors${q ? `?${q}` : ''}`);
        const list = (data.tutors || []).map(adaptTutorListItem);
        if (!cancelled) setTutors(list);
      } catch (e) {
        if (!cancelled) setError(e.body?.error || e.message || 'Failed to load tutors');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [search, minRating, sessionMode]);

  const toggleTag = (tag) => setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));

  const filtered = useMemo(() => {
    if (!selectedTags.length) return tutors;
    return tutors.filter((t) => selectedTags.some((tag) => t.tags.includes(tag)));
  }, [tutors, selectedTags]);

  return (
    <div>
      <Navbar />
      <div className="page-container fade-in">
        <h1 style={{ fontFamily: 'var(--font-main)', fontWeight: 800, fontSize: '2rem', marginBottom: '1.25rem' }}>Browse Tutors</h1>

        {error && (
          <div className="card-custom mb-3" style={{ borderColor: '#f5c6cb', background: '#f8d7da', color: '#721c24' }}>
            {error}
          </div>
        )}

        <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
          <i className="bi bi-search" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            className="form-control-custom"
            style={{ paddingLeft: '2.5rem', fontSize: '1rem' }}
            placeholder="Search by subject, skill, or name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="row g-4">
          <div className="col-lg-3">
            <div className="card-custom">
              <div className="d-flex align-items-center gap-2 mb-3">
                <i className="bi bi-funnel" style={{ color: 'var(--primary)' }} />
                <h6 style={{ fontFamily: 'var(--font-main)', fontWeight: 700, margin: 0 }}>Filters</h6>
              </div>

              <div className="mb-3">
                <label className="form-label-custom mb-2">Subject Tags</label>
                <div className="d-flex flex-wrap gap-2">
                  {allTags.map((tag) => (
                    <span
                      key={tag}
                      className={`tag-outline ${selectedTags.includes(tag) ? 'active' : ''}`}
                      onClick={() => toggleTag(tag)}
                      style={{ cursor: 'pointer' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label-custom">Minimum Rating</label>
                <select className="form-control-custom" value={minRating} onChange={(e) => setMinRating(e.target.value)}>
                  <option value="">Any rating</option>
                  <option value="4">4+</option>
                  <option value="4.5">4.5+</option>
                  <option value="4.7">4.7+</option>
                  <option value="4.9">4.9+</option>
                </select>
              </div>

              <div className="mb-2">
                <label className="form-label-custom">Session Mode</label>
                <select className="form-control-custom" value={sessionMode} onChange={(e) => setSessionMode(e.target.value)}>
                  <option value="">Any mode</option>
                  <option value="Online">Online</option>
                  <option value="On-Campus">On-Campus</option>
                </select>
              </div>

              {(selectedTags.length > 0 || minRating || sessionMode) && (
                <button
                  className="btn-outline-custom w-100 mt-3"
                  style={{ fontSize: '0.85rem' }}
                  type="button"
                  onClick={() => {
                    setSelectedTags([]);
                    setMinRating('');
                    setSessionMode('');
                  }}
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          <div className="col-lg-9">
            {loading ? (
              <div className="card-custom text-center py-5">
                <div className="spinner-border text-primary" role="status" />
                <p className="mt-3 text-muted mb-0">Loading tutors…</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="card-custom text-center py-5">
                <i className="bi bi-search" style={{ fontSize: '2.5rem', color: 'var(--text-muted)' }} />
                <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>No tutors found. Try adjusting your filters or run server seed.</p>
              </div>
            ) : (
              <div className="row g-3">
                {filtered.map((tutor) => (
                  <div key={tutor.id} className="col-sm-6">
                    <div className="tutor-card h-100">
                      <div className="d-flex align-items-center gap-3 mb-2">
                        <div className="avatar">{tutor.initials}</div>
                        <div>
                          <div style={{ fontFamily: 'var(--font-main)', fontWeight: 700 }}>
                            {tutor.name}
                            {tutor.verified && <i className="bi bi-patch-check-fill ms-1" style={{ color: 'var(--primary)', fontSize: '0.85rem' }} />}
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
                        {tutor.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="tag" style={{ fontSize: '0.72rem' }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="d-flex gap-2">
                        <Link to={`/tutor/${tutor.id}`} className="btn-outline-custom" style={{ flex: 1, textAlign: 'center', fontSize: '0.85rem' }}>
                          View Profile
                        </Link>
                        <Link to={`/tutor/${tutor.id}`} className="btn-primary-custom" style={{ flex: 1, textAlign: 'center', fontSize: '0.85rem' }}>
                          Book
                        </Link>
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
