// src/pages/student/StudentDashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { tutors, upcomingSessions, currentStudent } from '../../data/mockData';

function StarRating({ rating }) {
  return <span className="stars">{'★'.repeat(Math.floor(rating))}<span style={{ color: '#ccc' }}>{'★'.repeat(5 - Math.floor(rating))}</span></span>;
}

export default function StudentDashboard() {
  const recommended = tutors.filter(t => t.status === 'Active').slice(0, 3);

  return (
    <div>
      <Navbar />
      <div className="page-container fade-in">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
          <div>
            <h1 style={{ fontFamily: 'var(--font-main)', fontWeight: 800, fontSize: '2rem', marginBottom: '0.25rem' }}>Dashboard</h1>
            <p style={{ color: 'var(--text-muted)', margin: 0 }}>Welcome back, Student!</p>
          </div>
          <Link to="/post-request" className="btn-primary-custom d-flex align-items-center gap-2" style={{ fontSize: '0.95rem' }}>
            <i className="bi bi-plus-lg"></i> Post a Request
          </Link>
        </div>

        <div className="row g-4">
          {/* Recommended tutors */}
          <div className="col-lg-8">
            <div className="card-custom">
              <h5 style={{ fontFamily: 'var(--font-main)', fontWeight: 700, marginBottom: '1.25rem' }}>Recommended for You</h5>
              <div className="d-flex flex-column gap-3">
                {recommended.map(tutor => (
                  <div key={tutor.id} className="d-flex align-items-center gap-3 p-3" style={{ border: '1.5px solid var(--border)', borderRadius: 10 }}>
                    <div className="avatar">{tutor.initials}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: 'var(--font-main)', fontWeight: 700 }}>{tutor.name}</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '0.4rem' }}>{tutor.subject}</div>
                      <div className="d-flex align-items-center gap-2 flex-wrap">
                        <span><StarRating rating={tutor.rating} /> <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{tutor.rating}</span></span>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>• {tutor.sessions} sessions</span>
                      </div>
                      <div className="d-flex gap-2 mt-1 flex-wrap">
                        {tutor.tags.slice(0, 2).map(tag => <span key={tag} className="tag" style={{ fontSize: '0.72rem' }}>{tag}</span>)}
                      </div>
                    </div>
                    <Link to={`/tutor/${tutor.id}`} className="btn-outline-custom" style={{ whiteSpace: 'nowrap', fontSize: '0.85rem' }}>View Profile</Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right panel */}
          <div className="col-lg-4 d-flex flex-column gap-4">
            {/* Upcoming sessions */}
            <div className="card-custom">
              <div className="d-flex align-items-center gap-2 mb-3">
                <i className="bi bi-calendar3" style={{ color: 'var(--primary)' }}></i>
                <h5 style={{ fontFamily: 'var(--font-main)', fontWeight: 700, margin: 0 }}>Upcoming Sessions</h5>
              </div>
              {upcomingSessions.map(s => (
                <div key={s.id} className="session-item">
                  <div style={{ fontFamily: 'var(--font-main)', fontWeight: 600, fontSize: '0.95rem' }}>{s.subject}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.83rem' }}>{s.tutor}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.83rem' }}>{s.date}</div>
                </div>
              ))}
              <Link to="/sessions" style={{ color: 'var(--primary)', fontSize: '0.88rem', fontWeight: 600 }}>View All Sessions →</Link>
            </div>

            {/* Stats */}
            <div className="card-custom">
              <h5 style={{ fontFamily: 'var(--font-main)', fontWeight: 700, marginBottom: '1rem' }}>Your Stats</h5>
              {[
                { label: 'Total Sessions', value: currentStudent.totalSessions },
                { label: 'Hours Learned', value: currentStudent.hoursLearned },
                { label: 'Active Requests', value: currentStudent.activeRequests }
              ].map(s => (
                <div key={s.label} className="d-flex justify-content-between py-2" style={{ borderBottom: '1px solid var(--border)' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{s.label}</span>
                  <span style={{ fontFamily: 'var(--font-main)', fontWeight: 700 }}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
