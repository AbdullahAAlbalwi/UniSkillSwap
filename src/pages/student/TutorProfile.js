// src/pages/student/TutorProfile.js
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { tutors } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';

function StarRating({ rating, size = 'md' }) {
  const filled = Math.floor(rating);
  return (
    <span className="stars" style={{ fontSize: size === 'lg' ? '1.1rem' : '0.9rem' }}>
      {'★'.repeat(filled)}<span style={{ color: '#ddd' }}>{'★'.repeat(5 - filled)}</span>
    </span>
  );
}

function BookingModal({ tutor, onClose, onConfirm }) {
  const [mode, setMode] = useState('Online');
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [message, setMessage] = useState('');

  const days = Object.entries(tutor.availability);

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">
        <h4 style={{ fontFamily: 'var(--font-main)', fontWeight: 800, marginBottom: '1.25rem' }}>
          Book a Session with {tutor.name}
        </h4>

        <div className="mb-4">
          <label className="form-label-custom mb-2">Session Mode</label>
          <div className="d-flex gap-3">
            {['Online', 'On-Campus'].map(m => (
              <button key={m} type="button"
                style={{ flex: 1, padding: '0.85rem', border: `2px solid ${mode === m ? 'var(--primary)' : 'var(--border)'}`, borderRadius: 10, background: mode === m ? 'var(--primary)' : 'white', color: mode === m ? 'white' : 'var(--text-dark)', cursor: 'pointer', fontFamily: 'var(--font-main)', fontWeight: 600, transition: 'all 0.2s', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}
                onClick={() => setMode(m)}>
                <i className={`bi ${m === 'Online' ? 'bi-camera-video' : 'bi-geo-alt'}`}></i>
                {m}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="form-label-custom mb-2">Select Time Slot</label>
          {days.length === 0 ? <p style={{ color: 'var(--text-muted)' }}>No availability set.</p> : days.map(([day, slots]) => (
            <div key={day} className="mb-2">
              <div style={{ fontFamily: 'var(--font-main)', fontWeight: 600, fontSize: '0.88rem', marginBottom: '0.4rem', color: 'var(--text-muted)' }}>{day}</div>
              <div className="d-flex flex-wrap gap-2">
                {slots.map(slot => (
                  <button key={slot} type="button"
                    style={{ padding: '0.4rem 1rem', border: `1.5px solid ${selectedSlot === `${day}-${slot}` ? 'var(--primary)' : 'var(--border)'}`, borderRadius: 8, background: selectedSlot === `${day}-${slot}` ? 'var(--primary)' : 'white', color: selectedSlot === `${day}-${slot}` ? 'white' : 'var(--text-dark)', cursor: 'pointer', fontFamily: 'var(--font-main)', fontWeight: 500, fontSize: '0.88rem', transition: 'all 0.15s' }}
                    onClick={() => setSelectedSlot(`${day}-${slot}`)}>
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mb-4">
          <label className="form-label-custom">Message to Tutor (Optional)</label>
          <textarea className="form-control-custom" rows={3}
            placeholder="Let the tutor know what you'd like to work on..."
            value={message} onChange={e => setMessage(e.target.value)} style={{ resize: 'none' }} />
        </div>

        <div className="d-flex gap-3">
          <button className="btn-outline-custom" style={{ flex: 1 }} onClick={onClose}>Cancel</button>
          <button className="btn-primary-custom" style={{ flex: 1 }} onClick={() => onConfirm({ mode, slot: selectedSlot, message })}
            disabled={!selectedSlot}>Confirm Booking</button>
        </div>
      </div>
    </div>
  );
}

export default function TutorProfile() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [booked, setBooked] = useState(false);

  const tutor = tutors.find(t => t.id === parseInt(id));
  if (!tutor) return <div className="page-container"><p>Tutor not found.</p></div>;

  const handleConfirm = (data) => {
    setShowModal(false);
    setBooked(true);
  };

  const handleBook = () => {
    if (!user) { navigate('/login'); return; }
    setShowModal(true);
  };

  return (
    <div>
      <Navbar />
      <div className="page-container fade-in">
        {booked && (
          <div style={{ background: '#d4edda', color: '#155724', borderRadius: 10, padding: '0.85rem 1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: 10 }}>
            <i className="bi bi-check-circle-fill"></i>
            <span>Booking confirmed! The tutor will receive a notification.</span>
          </div>
        )}

        {/* Profile header */}
        <div className="card-custom mb-4">
          <div className="d-flex align-items-start gap-4 flex-wrap">
            <div className="avatar avatar-lg">{tutor.initials}</div>
            <div style={{ flex: 1 }}>
              <div className="d-flex align-items-center gap-2 flex-wrap">
                <h2 style={{ fontFamily: 'var(--font-main)', fontWeight: 800, marginBottom: 0 }}>{tutor.name}</h2>
                {tutor.verified && <i className="bi bi-patch-check-fill" style={{ color: 'var(--primary)', fontSize: '1.25rem' }}></i>}
              </div>
              <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{tutor.subject}</p>
              <div className="d-flex align-items-center gap-3 flex-wrap mb-2">
                <span><StarRating rating={tutor.rating} size="lg" /> <strong>{tutor.rating}</strong> ({tutor.reviews} reviews)</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>• {tutor.sessions} sessions completed</span>
                <span style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.88rem' }}>• {tutor.pricing}</span>
              </div>
              <div className="d-flex flex-wrap gap-2">
                {tutor.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
              </div>
            </div>
            <div className="d-flex gap-2">
              <button className="btn-primary-custom" onClick={handleBook}>
                <i className="bi bi-calendar-plus me-1"></i> Book Session
              </button>
              <Link to="/messages" className="btn-outline-custom">
                <i className="bi bi-chat me-1"></i> Message
              </Link>
            </div>
          </div>
        </div>

        <div className="row g-4">
          {/* Left column */}
          <div className="col-lg-8">
            {/* About */}
            <div className="card-custom mb-4">
              <h5 style={{ fontFamily: 'var(--font-main)', fontWeight: 700, marginBottom: '0.75rem' }}>About</h5>
              <p style={{ color: '#444', lineHeight: 1.7, margin: 0 }}>{tutor.bio}</p>
            </div>

            {/* Offers */}
            <div className="card-custom mb-4">
              <h5 style={{ fontFamily: 'var(--font-main)', fontWeight: 700, marginBottom: '1rem' }}>Available Tutoring Offers</h5>
              <div className="d-flex flex-column gap-2">
                {tutor.offers.filter(o => o.status === 'Active').map(offer => (
                  <div key={offer.id} style={{ border: '1.5px solid var(--border)', borderRadius: 10, padding: '0.85rem 1rem' }}>
                    <div style={{ fontFamily: 'var(--font-main)', fontWeight: 700, marginBottom: '0.25rem' }}>{offer.title}</div>
                    <div style={{ display: 'inline-block', background: 'var(--secondary)', border: '1px solid var(--border)', borderRadius: 6, padding: '0.15rem 0.6rem', fontSize: '0.78rem', fontWeight: 500 }}>{offer.level}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="card-custom">
              <h5 style={{ fontFamily: 'var(--font-main)', fontWeight: 700, marginBottom: '1rem' }}>Reviews ({tutor.reviewsList.length})</h5>
              {tutor.reviewsList.length === 0 ? <p style={{ color: 'var(--text-muted)' }}>No reviews yet.</p> :
                tutor.reviewsList.map(r => (
                  <div key={r.id} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1rem', marginBottom: '1rem' }}>
                    <div className="d-flex align-items-center justify-content-between mb-1">
                      <div className="d-flex align-items-center gap-2">
                        <div className="avatar-circle" style={{ width: 36, height: 36 }}>{r.initial}</div>
                        <div>
                          <div style={{ fontFamily: 'var(--font-main)', fontWeight: 600, fontSize: '0.92rem' }}>{r.name}</div>
                          <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{r.date}</div>
                        </div>
                      </div>
                      <StarRating rating={r.rating} />
                    </div>
                    <p style={{ color: '#444', fontSize: '0.92rem', margin: 0 }}>{r.comment}</p>
                  </div>
                ))
              }
            </div>
          </div>

          {/* Right column */}
          <div className="col-lg-4">
            {/* Availability */}
            <div className="card-custom mb-4">
              <div className="d-flex align-items-center gap-2 mb-3">
                <i className="bi bi-calendar3" style={{ color: 'var(--primary)' }}></i>
                <h6 style={{ fontFamily: 'var(--font-main)', fontWeight: 700, margin: 0 }}>Weekly Availability</h6>
              </div>
              {Object.entries(tutor.availability).map(([day, slots]) => (
                <div key={day} className="mb-2">
                  <div style={{ fontFamily: 'var(--font-main)', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.3rem' }}>{day}</div>
                  <div className="d-flex flex-wrap gap-1">
                    {slots.map(s => (
                      <span key={s} style={{ background: 'var(--primary)', color: 'white', borderRadius: 6, padding: '0.2rem 0.6rem', fontSize: '0.78rem', fontWeight: 600 }}>{s}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Session modes */}
            <div className="card-custom">
              <h6 style={{ fontFamily: 'var(--font-main)', fontWeight: 700, marginBottom: '0.75rem' }}>Session Modes</h6>
              {tutor.sessionModes.map(m => (
                <div key={m} className="d-flex align-items-center gap-2 mb-2">
                  <i className={`bi ${m === 'Online' ? 'bi-camera-video' : 'bi-geo-alt'}`} style={{ color: 'var(--primary)' }}></i>
                  <span style={{ fontSize: '0.9rem' }}>{m === 'Online' ? 'Online Sessions' : 'On-Campus Meetings'}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showModal && <BookingModal tutor={tutor} onClose={() => setShowModal(false)} onConfirm={handleConfirm} />}
    </div>
  );
}
