// src/pages/student/MySessions.js
import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import { upcomingSessions, pastSessions, cancelledSessions } from '../../data/mockData';

function StarRating({ rating }) {
  return <span className="stars">{'★'.repeat(rating)}<span style={{ color: '#ddd' }}>{'★'.repeat(5 - rating)}</span></span>;
}

function RescheduleModal({ session, onClose, onConfirm }) {
  const [newDate, setNewDate] = useState('');
  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box" style={{ maxWidth: 400 }}>
        <h5 style={{ fontFamily: 'var(--font-main)', fontWeight: 800, marginBottom: '1rem' }}>Reschedule Session</h5>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.25rem', fontSize: '0.92rem' }}>
          Rescheduling: <strong>{session.subject}</strong> with {session.tutor}
        </p>
        <label className="form-label-custom">New Date & Time</label>
        <input className="form-control-custom mb-4" type="datetime-local" value={newDate} onChange={e => setNewDate(e.target.value)} />
        <div className="d-flex gap-3">
          <button className="btn-outline-custom" style={{ flex: 1 }} onClick={onClose}>Cancel</button>
          <button className="btn-primary-custom" style={{ flex: 1 }} onClick={() => onConfirm(newDate)} disabled={!newDate}>Confirm</button>
        </div>
      </div>
    </div>
  );
}

function CancelModal({ session, onClose, onConfirm }) {
  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box" style={{ maxWidth: 400 }}>
        <h5 style={{ fontFamily: 'var(--font-main)', fontWeight: 800, marginBottom: '0.75rem' }}>Cancel Session</h5>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.92rem' }}>
          Are you sure you want to cancel <strong>{session.subject}</strong> with {session.tutor}? The tutor will be notified.
        </p>
        <div className="d-flex gap-3">
          <button className="btn-outline-custom" style={{ flex: 1 }} onClick={onClose}>Keep Session</button>
          <button style={{ flex: 1, padding: '0.5rem 1rem', background: 'var(--danger)', color: 'white', border: 'none', borderRadius: 8, fontFamily: 'var(--font-main)', fontWeight: 600, cursor: 'pointer' }} onClick={onConfirm}>Yes, Cancel</button>
        </div>
      </div>
    </div>
  );
}

function ReviewModal({ session, onClose, onSubmit }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box" style={{ maxWidth: 420 }}>
        <h5 style={{ fontFamily: 'var(--font-main)', fontWeight: 800, marginBottom: '0.5rem' }}>Rate Your Session</h5>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.92rem' }}>How was your session with {session.tutor}?</p>
        <div className="d-flex gap-2 mb-3 justify-content-center">
          {[1, 2, 3, 4, 5].map(star => (
            <span key={star} style={{ fontSize: '2rem', cursor: 'pointer', color: star <= (hover || rating) ? '#f5a623' : '#ddd', transition: 'color 0.1s' }}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}>★</span>
          ))}
        </div>
        <label className="form-label-custom">Comment (Optional)</label>
        <textarea className="form-control-custom mb-4" rows={3} placeholder="Share your experience..."
          value={comment} onChange={e => setComment(e.target.value)} style={{ resize: 'none' }} />
        <div className="d-flex gap-3">
          <button className="btn-outline-custom" style={{ flex: 1 }} onClick={onClose}>Skip</button>
          <button className="btn-primary-custom" style={{ flex: 1 }} disabled={!rating} onClick={() => onSubmit({ rating, comment })}>Submit Review</button>
        </div>
      </div>
    </div>
  );
}

export default function MySessions() {
  const [tab, setTab] = useState('upcoming');
  const [upcoming, setUpcoming] = useState(upcomingSessions);
  const [rescheduleSession, setRescheduleSession] = useState(null);
  const [cancelSession, setCancelSession] = useState(null);
  const [reviewSession, setReviewSession] = useState(null);
  const [toast, setToast] = useState('');

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const handleReschedule = (newDate) => {
    setUpcoming(prev => prev.map(s => s.id === rescheduleSession.id ? { ...s, date: new Date(newDate).toLocaleString() } : s));
    setRescheduleSession(null);
    showToast('Session rescheduled successfully!');
  };

  const handleCancel = () => {
    setUpcoming(prev => prev.filter(s => s.id !== cancelSession.id));
    setCancelSession(null);
    showToast('Session cancelled.');
  };

  const handleReview = (data) => {
    setReviewSession(null);
    showToast('Review submitted! Thank you.');
  };

  return (
    <div>
      <Navbar />
      <div className="page-container fade-in">
        {toast && (
          <div style={{ position: 'fixed', top: 80, right: 20, background: '#d4edda', color: '#155724', borderRadius: 10, padding: '0.75rem 1.25rem', zIndex: 999, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontFamily: 'var(--font-main)', fontWeight: 600 }}>
            <i className="bi bi-check-circle me-2"></i>{toast}
          </div>
        )}

        <h1 style={{ fontFamily: 'var(--font-main)', fontWeight: 800, fontSize: '2rem', marginBottom: '1.5rem' }}>My Sessions</h1>

        <div className="tab-nav mb-4">
          {[
            { key: 'upcoming', label: `Upcoming (${upcoming.length})` },
            { key: 'past', label: `Past (${pastSessions.length})` },
            { key: 'cancelled', label: `Cancelled (${cancelledSessions.length})` }
          ].map(t => (
            <button key={t.key} className={`tab-btn ${tab === t.key ? 'active' : ''}`} onClick={() => setTab(t.key)}>{t.label}</button>
          ))}
        </div>

        {tab === 'upcoming' && (
          <div className="d-flex flex-column gap-3">
            {upcoming.length === 0 ? (
              <div className="card-custom text-center py-5">
                <i className="bi bi-calendar-x" style={{ fontSize: '2.5rem', color: 'var(--text-muted)' }}></i>
                <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>No upcoming sessions.</p>
              </div>
            ) : upcoming.map(s => (
              <div key={s.id} className="card-custom d-flex align-items-center gap-3 flex-wrap">
                <div className="avatar">{s.initials}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'var(--font-main)', fontWeight: 700, fontSize: '1.05rem' }}>{s.subject}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>with {s.tutor}</div>
                  <div className="d-flex align-items-center gap-2 mt-1">
                    <i className="bi bi-calendar3" style={{ color: 'var(--primary)', fontSize: '0.85rem' }}></i>
                    <span style={{ fontSize: '0.85rem' }}>{s.date}</span>
                    <span className="tag" style={{ fontSize: '0.72rem' }}>{s.mode}</span>
                  </div>
                </div>
                <div className="d-flex gap-2">
                  <button className="btn-outline-custom" style={{ fontSize: '0.85rem' }} onClick={() => setRescheduleSession(s)}>Reschedule</button>
                  <button style={{ padding: '0.4rem 1rem', background: 'transparent', color: 'var(--danger)', border: '2px solid var(--danger)', borderRadius: 8, fontFamily: 'var(--font-main)', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }} onClick={() => setCancelSession(s)}>Cancel</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'past' && (
          <div className="d-flex flex-column gap-3">
            {pastSessions.map(s => (
              <div key={s.id} className="card-custom d-flex align-items-center gap-3 flex-wrap">
                <div className="avatar">{s.initials}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'var(--font-main)', fontWeight: 700, fontSize: '1.05rem' }}>{s.subject}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>with {s.tutor}</div>
                  <div className="d-flex align-items-center gap-2 mt-1">
                    <i className="bi bi-calendar3" style={{ color: 'var(--primary)', fontSize: '0.85rem' }}></i>
                    <span style={{ fontSize: '0.85rem' }}>{s.date}</span>
                    <StarRating rating={s.rating} />
                  </div>
                </div>
                <button className="btn-outline-custom" style={{ fontSize: '0.85rem' }} onClick={() => setReviewSession(s)}>
                  <i className="bi bi-star me-1"></i> Review
                </button>
              </div>
            ))}
          </div>
        )}

        {tab === 'cancelled' && (
          <div className="d-flex flex-column gap-3">
            {cancelledSessions.map(s => (
              <div key={s.id} className="card-custom d-flex align-items-center gap-3 flex-wrap" style={{ opacity: 0.7 }}>
                <div className="avatar" style={{ background: '#999' }}>{s.initials}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'var(--font-main)', fontWeight: 700, fontSize: '1.05rem' }}>{s.subject}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>with {s.tutor}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{s.date}</div>
                </div>
                <span className="badge-suspended">Cancelled</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {rescheduleSession && <RescheduleModal session={rescheduleSession} onClose={() => setRescheduleSession(null)} onConfirm={handleReschedule} />}
      {cancelSession && <CancelModal session={cancelSession} onClose={() => setCancelSession(null)} onConfirm={handleCancel} />}
      {reviewSession && <ReviewModal session={reviewSession} onClose={() => setReviewSession(null)} onSubmit={handleReview} />}
    </div>
  );
}
