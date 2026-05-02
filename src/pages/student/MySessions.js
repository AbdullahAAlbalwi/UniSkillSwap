// src/pages/student/MySessions.js
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Navbar from '../../components/Navbar';
import { api } from '../../api/client';
import { useAuth } from '../../context/AuthContext';

function StarRating({ rating }) {
  const r = Math.round(rating || 0);
  return (
    <span className="stars">
      {'★'.repeat(r)}
      <span style={{ color: '#ddd' }}>{'★'.repeat(5 - r)}</span>
    </span>
  );
}

function RescheduleModal({ session, onClose }) {
  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-box" style={{ maxWidth: 400 }}>
        <h5 style={{ fontFamily: 'var(--font-main)', fontWeight: 800, marginBottom: '1rem' }}>Reschedule Session</h5>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.25rem', fontSize: '0.92rem' }}>
          Rescheduling is not available through the API yet. Please message your tutor to agree on a new time.
        </p>
        <button className="btn-primary-custom w-100" type="button" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
}

function CancelModal({ session, onClose, onConfirm }) {
  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-box" style={{ maxWidth: 400 }}>
        <h5 style={{ fontFamily: 'var(--font-main)', fontWeight: 800, marginBottom: '0.75rem' }}>Cancel Session</h5>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.92rem' }}>
          Are you sure you want to cancel <strong>{session.subject}</strong> with {session.peerName}?
        </p>
        <div className="d-flex gap-3">
          <button className="btn-outline-custom" style={{ flex: 1 }} type="button" onClick={onClose}>
            Keep Session
          </button>
          <button
            style={{
              flex: 1,
              padding: '0.5rem 1rem',
              background: 'var(--danger)',
              color: 'white',
              border: 'none',
              borderRadius: 8,
              fontFamily: 'var(--font-main)',
              fontWeight: 600,
              cursor: 'pointer',
            }}
            type="button"
            onClick={onConfirm}
          >
            Yes, Cancel
          </button>
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
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-box" style={{ maxWidth: 420 }}>
        <h5 style={{ fontFamily: 'var(--font-main)', fontWeight: 800, marginBottom: '0.5rem' }}>Rate Your Session</h5>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.92rem' }}>How was your session with {session.peerName}?</p>
        <div className="d-flex gap-2 mb-3 justify-content-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              style={{
                fontSize: '2rem',
                cursor: 'pointer',
                color: star <= (hover || rating) ? '#f5a623' : '#ddd',
                transition: 'color 0.1s',
              }}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
            >
              ★
            </span>
          ))}
        </div>
        <label className="form-label-custom">Comment (Optional)</label>
        <textarea
          className="form-control-custom mb-4"
          rows={3}
          placeholder="Share your experience..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          style={{ resize: 'none' }}
        />
        <div className="d-flex gap-3">
          <button className="btn-outline-custom" style={{ flex: 1 }} type="button" onClick={onClose}>
            Skip
          </button>
          <button className="btn-primary-custom" style={{ flex: 1 }} type="button" disabled={!rating} onClick={() => onSubmit({ rating, comment })}>
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
}

function mapSession(s, myId) {
  const mineRequester = s.requesterId === myId;
  const peer = mineRequester ? s.tutorSummary : s.requesterSummary;
  const peerName = peer?.name || 'User';
  const initials = peer?.initials || '?';
  return {
    id: s.id,
    subject: s.subject,
    peerName,
    initials,
    dateLabel: `${s.date} · ${s.time}`,
    mode: s.mode,
    status: s.status,
    raw: s,
    isRequester: mineRequester,
  };
}

export default function MySessions() {
  const { user } = useAuth();
  const myId = user?.id;
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [tab, setTab] = useState('upcoming');
  const [rescheduleSession, setRescheduleSession] = useState(null);
  const [cancelSession, setCancelSession] = useState(null);
  const [reviewSession, setReviewSession] = useState(null);
  const [toast, setToast] = useState('');

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const load = useCallback(async () => {
    if (!myId) return;
    setLoading(true);
    setLoadError('');
    try {
      const data = await api('/sessions/mine', { auth: true });
      setSessions((data.sessions || []).map((s) => mapSession(s, myId)));
    } catch (e) {
      setLoadError(e.body?.error || e.message || 'Failed to load sessions');
    } finally {
      setLoading(false);
    }
  }, [myId]);

  useEffect(() => {
    load();
  }, [load]);

  const upcoming = useMemo(() => sessions.filter((s) => s.status === 'pending' || s.status === 'confirmed'), [sessions]);
  const past = useMemo(() => sessions.filter((s) => s.status === 'completed'), [sessions]);
  const cancelled = useMemo(() => sessions.filter((s) => s.status === 'cancelled'), [sessions]);

  const handleCancel = async () => {
    if (!cancelSession) return;
    try {
      await api(`/sessions/${cancelSession.id}/status`, {
        method: 'PATCH',
        auth: true,
        body: { status: 'cancelled' },
      });
      setCancelSession(null);
      showToast('Session cancelled.');
      await load();
    } catch (e) {
      showToast(e.body?.error || e.message || 'Could not cancel');
    }
  };

  const handleReview = async ({ rating, comment }) => {
    if (!reviewSession) return;
    try {
      await api('/reviews', {
        method: 'POST',
        auth: true,
        body: { sessionId: reviewSession.id, rating, comment: comment || '' },
      });
      setReviewSession(null);
      showToast('Review submitted! Thank you.');
      await load();
    } catch (e) {
      showToast(e.body?.error || e.message || 'Review failed');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="page-container fade-in">
        {toast && (
          <div
            style={{
              position: 'fixed',
              top: 80,
              right: 20,
              background: '#d4edda',
              color: '#155724',
              borderRadius: 10,
              padding: '0.75rem 1.25rem',
              zIndex: 999,
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              fontFamily: 'var(--font-main)',
              fontWeight: 600,
            }}
          >
            <i className="bi bi-check-circle me-2" />
            {toast}
          </div>
        )}

        <h1 style={{ fontFamily: 'var(--font-main)', fontWeight: 800, fontSize: '2rem', marginBottom: '1.5rem' }}>My Sessions</h1>

        {loadError && <div className="alert alert-danger">{loadError}</div>}

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status" />
          </div>
        ) : (
          <>
            <div className="tab-nav mb-4">
              {[
                { key: 'upcoming', label: `Upcoming (${upcoming.length})` },
                { key: 'past', label: `Past (${past.length})` },
                { key: 'cancelled', label: `Cancelled (${cancelled.length})` },
              ].map((t) => (
                <button key={t.key} type="button" className={`tab-btn ${tab === t.key ? 'active' : ''}`} onClick={() => setTab(t.key)}>
                  {t.label}
                </button>
              ))}
            </div>

            {tab === 'upcoming' && (
              <div className="d-flex flex-column gap-3">
                {upcoming.length === 0 ? (
                  <div className="card-custom text-center py-5">
                    <i className="bi bi-calendar-x" style={{ fontSize: '2.5rem', color: 'var(--text-muted)' }} />
                    <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>No upcoming sessions.</p>
                  </div>
                ) : (
                  upcoming.map((s) => (
                    <div key={s.id} className="card-custom d-flex align-items-center gap-3 flex-wrap">
                      <div className="avatar">{s.initials}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: 'var(--font-main)', fontWeight: 700, fontSize: '1.05rem' }}>{s.subject}</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>with {s.peerName}</div>
                        <div className="d-flex align-items-center gap-2 mt-1">
                          <i className="bi bi-calendar3" style={{ color: 'var(--primary)', fontSize: '0.85rem' }} />
                          <span style={{ fontSize: '0.85rem' }}>{s.dateLabel}</span>
                          <span className="tag" style={{ fontSize: '0.72rem' }}>
                            {s.mode}
                          </span>
                          <span className="tag" style={{ fontSize: '0.72rem' }}>
                            {s.status}
                          </span>
                        </div>
                      </div>
                      <div className="d-flex gap-2">
                        <button className="btn-outline-custom" style={{ fontSize: '0.85rem' }} type="button" onClick={() => setRescheduleSession(s)}>
                          Reschedule
                        </button>
                        <button
                          style={{
                            padding: '0.4rem 1rem',
                            background: 'transparent',
                            color: 'var(--danger)',
                            border: '2px solid var(--danger)',
                            borderRadius: 8,
                            fontFamily: 'var(--font-main)',
                            fontWeight: 600,
                            fontSize: '0.85rem',
                            cursor: 'pointer',
                          }}
                          type="button"
                          onClick={() => setCancelSession(s)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {tab === 'past' && (
              <div className="d-flex flex-column gap-3">
                {past.length === 0 ? (
                  <div className="card-custom text-center py-5 text-muted">No completed sessions yet.</div>
                ) : (
                  past.map((s) => (
                    <div key={s.id} className="card-custom d-flex align-items-center gap-3 flex-wrap">
                      <div className="avatar">{s.initials}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: 'var(--font-main)', fontWeight: 700, fontSize: '1.05rem' }}>{s.subject}</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>with {s.peerName}</div>
                        <div className="d-flex align-items-center gap-2 mt-1">
                          <i className="bi bi-calendar3" style={{ color: 'var(--primary)', fontSize: '0.85rem' }} />
                          <span style={{ fontSize: '0.85rem' }}>{s.dateLabel}</span>
                        </div>
                      </div>
                      {s.isRequester ? (
                        <button className="btn-outline-custom" style={{ fontSize: '0.85rem' }} type="button" onClick={() => setReviewSession(s)}>
                          <i className="bi bi-star me-1" /> Review
                        </button>
                      ) : null}
                    </div>
                  ))
                )}
              </div>
            )}

            {tab === 'cancelled' && (
              <div className="d-flex flex-column gap-3">
                {cancelled.length === 0 ? (
                  <div className="card-custom text-center py-5 text-muted">No cancelled sessions.</div>
                ) : (
                  cancelled.map((s) => (
                    <div key={s.id} className="card-custom d-flex align-items-center gap-3 flex-wrap" style={{ opacity: 0.7 }}>
                      <div className="avatar" style={{ background: '#999' }}>
                        {s.initials}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: 'var(--font-main)', fontWeight: 700, fontSize: '1.05rem' }}>{s.subject}</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>with {s.peerName}</div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{s.dateLabel}</div>
                      </div>
                      <span className="badge-suspended">Cancelled</span>
                    </div>
                  ))
                )}
              </div>
            )}
          </>
        )}
      </div>

      {rescheduleSession && <RescheduleModal session={rescheduleSession} onClose={() => setRescheduleSession(null)} />}
      {cancelSession && <CancelModal session={cancelSession} onClose={() => setCancelSession(null)} onConfirm={handleCancel} />}
      {reviewSession && <ReviewModal session={reviewSession} onClose={() => setReviewSession(null)} onSubmit={handleReview} />}
    </div>
  );
}
