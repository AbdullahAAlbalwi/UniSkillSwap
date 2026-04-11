// src/pages/tutor/TutorDashboard.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { tutorPendingRequests, tutorUpcomingSessions, currentTutor } from '../../data/mockData';

export default function TutorDashboard() {
  const [pending, setPending] = useState(tutorPendingRequests);
  const [toast, setToast] = useState('');

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const handleAccept = (id) => {
    setPending(prev => prev.filter(r => r.id !== id));
    showToast('Booking accepted! Student has been notified.');
  };

  const handleDecline = (id) => {
    setPending(prev => prev.filter(r => r.id !== id));
    showToast('Booking declined.');
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

        <h1 style={{ fontFamily: 'var(--font-main)', fontWeight: 800, fontSize: '2rem', marginBottom: '0.25rem' }}>Tutor Dashboard</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Manage your tutoring sessions and requests</p>

        <div className="row g-4">
          {/* Left column */}
          <div className="col-lg-8">
            {/* Pending requests */}
            <div className="card-custom mb-4">
              <h5 style={{ fontFamily: 'var(--font-main)', fontWeight: 700, marginBottom: '1.25rem' }}>
                Pending Booking Requests ({pending.length})
              </h5>
              {pending.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                  <i className="bi bi-inbox" style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }}></i>
                  No pending requests
                </div>
              ) : (
                <div className="d-flex flex-column gap-3">
                  {pending.map(req => (
                    <div key={req.id} style={{ border: '1.5px solid var(--border)', borderRadius: 10, padding: '1rem' }}>
                      <div className="d-flex align-items-center gap-3 flex-wrap">
                        <div className="avatar" style={{ background: '#e0e0e0', color: '#555' }}>{req.initials}</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontFamily: 'var(--font-main)', fontWeight: 700 }}>{req.requester}</div>
                          <div style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '0.25rem' }}>{req.subject}</div>
                          <div className="d-flex align-items-center gap-2">
                            <i className="bi bi-calendar3" style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}></i>
                            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{req.date}</span>
                            <span className="tag" style={{ fontSize: '0.72rem' }}>{req.mode}</span>
                          </div>
                        </div>
                        <div className="d-flex gap-2">
                          <button style={{ padding: '0.45rem 1rem', background: '#28a745', color: 'white', border: 'none', borderRadius: 8, fontFamily: 'var(--font-main)', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
                            onClick={() => handleAccept(req.id)}>
                            <i className="bi bi-check-circle"></i> Accept
                          </button>
                          <button style={{ padding: '0.45rem 1rem', background: '#dc3545', color: 'white', border: 'none', borderRadius: 8, fontFamily: 'var(--font-main)', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
                            onClick={() => handleDecline(req.id)}>
                            <i className="bi bi-x-circle"></i> Decline
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Upcoming sessions */}
            <div className="card-custom">
              <h5 style={{ fontFamily: 'var(--font-main)', fontWeight: 700, marginBottom: '1.25rem' }}>Upcoming Sessions</h5>
              <div className="d-flex flex-column gap-3">
                {tutorUpcomingSessions.map(s => (
                  <div key={s.id} style={{ border: '1.5px solid var(--border)', borderRadius: 10, padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div className="avatar">{s.initials}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: 'var(--font-main)', fontWeight: 700 }}>{s.subject}</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>with {s.requester}</div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{s.date}</div>
                    </div>
                    <button className="btn-outline-custom" style={{ fontSize: '0.85rem' }}>View Details</button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="col-lg-4 d-flex flex-column gap-4">
            {/* Reputation */}
            <div className="card-custom">
              <div className="d-flex align-items-center gap-2 mb-3">
                <i className="bi bi-award" style={{ color: 'var(--primary)' }}></i>
                <h6 style={{ fontFamily: 'var(--font-main)', fontWeight: 700, margin: 0 }}>Your Reputation</h6>
              </div>
              <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                <div style={{ fontSize: '2.5rem', fontFamily: 'var(--font-main)', fontWeight: 800, color: 'var(--text-dark)' }}>
                  <span style={{ color: '#f5a623' }}>★</span> {currentTutor.rating}
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Average Rating</div>
              </div>
              {[
                { label: 'Total Sessions', value: currentTutor.totalSessions },
                { label: 'Total Reviews', value: currentTutor.totalReviews },
                { label: 'Hours Tutored', value: currentTutor.hoursTutored }
              ].map(s => (
                <div key={s.label} className="d-flex justify-content-between py-2" style={{ borderBottom: '1px solid var(--border)' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{s.label}</span>
                  <span style={{ fontFamily: 'var(--font-main)', fontWeight: 700 }}>{s.value}</span>
                </div>
              ))}
              <div className="mt-3">
                <div style={{ fontFamily: 'var(--font-main)', fontWeight: 600, fontSize: '0.88rem', marginBottom: '0.5rem' }}>Badges Earned</div>
                <div className="d-flex flex-wrap gap-2">
                  {currentTutor.badges.map(b => (
                    <span key={b} style={{ background: 'var(--primary-light)', color: 'var(--primary)', borderRadius: 20, padding: '0.2rem 0.65rem', fontSize: '0.78rem', fontWeight: 600 }}>{b}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick actions */}
            <div className="card-custom">
              <h6 style={{ fontFamily: 'var(--font-main)', fontWeight: 700, marginBottom: '0.75rem' }}>Quick Actions</h6>
              <div className="d-flex flex-column gap-2">
                <Link to="/availability" className="btn-primary-custom text-center" style={{ fontSize: '0.9rem' }}>Manage Availability</Link>
                <Link to="/my-offers" className="btn-outline-custom text-center" style={{ fontSize: '0.9rem' }}>Edit Offers</Link>
                <Link to="/tutor/1" className="btn-outline-custom text-center" style={{ fontSize: '0.9rem' }}>View Profile</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
