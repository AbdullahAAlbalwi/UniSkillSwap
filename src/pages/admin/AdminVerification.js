// src/pages/admin/AdminVerification.js
import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import { verificationQueue } from '../../data/mockData';

export default function AdminVerification() {
  const [queue, setQueue] = useState(verificationQueue);
  const [notes, setNotes] = useState({});
  const [toast, setToast] = useState('');

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const handleApprove = (id) => {
    setQueue(prev => prev.filter(q => q.id !== id));
    showToast('Tutor approved and Verified Mentor badge assigned!');
  };

  const handleReject = (id) => {
    setQueue(prev => prev.filter(q => q.id !== id));
    showToast('Application rejected. Tutor has been notified.');
  };

  const statsBar = [
    { label: 'Pending Reviews', value: queue.length, color: '#f59e0b' },
    { label: 'Approved This Month', value: 127, color: '#10b981' },
    { label: 'Rejected This Month', value: 8, color: '#ef4444' },
    { label: 'Total Verified Tutors', value: '1,024', color: 'var(--primary)' }
  ];

  return (
    <div>
      <Navbar />
      <div className="page-container fade-in">
        {toast && (
          <div style={{ position: 'fixed', top: 80, right: 20, background: '#d4edda', color: '#155724', borderRadius: 10, padding: '0.75rem 1.25rem', zIndex: 999, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontFamily: 'var(--font-main)', fontWeight: 600 }}>
            <i className="bi bi-check-circle me-2"></i>{toast}
          </div>
        )}

        <h1 style={{ fontFamily: 'var(--font-main)', fontWeight: 800, fontSize: '2rem', marginBottom: '1.5rem' }}>Tutor Verification Queue</h1>

        {/* Stats bar */}
        <div className="row g-3 mb-4">
          {statsBar.map((s, i) => (
            <div key={i} className="col-sm-6 col-lg-3">
              <div className="stat-card">
                <div style={{ fontFamily: 'var(--font-main)', fontWeight: 800, fontSize: '2rem', color: s.color }}>{s.value}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {queue.length === 0 ? (
          <div className="card-custom text-center py-5">
            <i className="bi bi-check-circle-fill" style={{ fontSize: '2.5rem', color: '#10b981' }}></i>
            <p style={{ color: 'var(--text-muted)', marginTop: '1rem', fontFamily: 'var(--font-main)', fontWeight: 600 }}>All verification requests have been processed!</p>
          </div>
        ) : (
          <div className="d-flex flex-column gap-4">
            {queue.map(applicant => (
              <div key={applicant.id} className="card-custom">
                {/* Header */}
                <div className="d-flex align-items-start justify-content-between flex-wrap gap-3 mb-3">
                  <div className="d-flex align-items-center gap-3">
                    <div className="avatar">{applicant.initials}</div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-main)', fontWeight: 700, fontSize: '1.05rem' }}>{applicant.name}</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>{applicant.email}</div>
                      <div style={{ fontSize: '0.85rem' }}>Applied to tutor: <strong>{applicant.subject}</strong></div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>Submitted: {applicant.submittedDate}</div>
                    </div>
                  </div>
                  <div className="d-flex gap-2">
                    <button style={{ padding: '0.5rem 1.25rem', background: '#10b981', color: 'white', border: 'none', borderRadius: 8, fontFamily: 'var(--font-main)', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
                      onClick={() => handleApprove(applicant.id)}>
                      <i className="bi bi-check-circle"></i> Approve
                    </button>
                    <button style={{ padding: '0.5rem 1.25rem', background: '#ef4444', color: 'white', border: 'none', borderRadius: 8, fontFamily: 'var(--font-main)', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
                      onClick={() => handleReject(applicant.id)}>
                      <i className="bi bi-x-circle"></i> Reject
                    </button>
                  </div>
                </div>

                {/* Details */}
                <div className="row g-3 mb-3">
                  <div className="col-md-4">
                    <div style={{ background: '#f9fafb', borderRadius: 8, padding: '1rem' }}>
                      <h6 style={{ fontFamily: 'var(--font-main)', fontWeight: 700, marginBottom: '0.75rem' }}>Academic Information</h6>
                      <div style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                        <span style={{ color: 'var(--text-muted)' }}>GPA</span>
                        <div style={{ fontFamily: 'var(--font-main)', fontWeight: 700, fontSize: '1.25rem' }}>{applicant.gpa}</div>
                      </div>
                      <div style={{ fontSize: '0.85rem' }}>
                        <span style={{ color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>Relevant Courses</span>
                        <div className="d-flex flex-wrap gap-1">
                          {applicant.courses.map(c => <span key={c} className="tag" style={{ fontSize: '0.72rem' }}>{c}</span>)}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div style={{ background: '#f9fafb', borderRadius: 8, padding: '1rem' }}>
                      <h6 style={{ fontFamily: 'var(--font-main)', fontWeight: 700, marginBottom: '0.75rem' }}>Submitted Credentials</h6>
                      {applicant.credentials.map(cred => (
                        <div key={cred} className="d-flex align-items-center justify-content-between py-2" style={{ borderBottom: '1px solid var(--border)' }}>
                          <div className="d-flex align-items-center gap-2">
                            <i className="bi bi-file-text" style={{ color: 'var(--primary)' }}></i>
                            <span style={{ fontSize: '0.9rem' }}>{cred}</span>
                          </div>
                          <button style={{ background: 'none', border: 'none', color: 'var(--primary)', fontFamily: 'var(--font-main)', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}>View Document</button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Admin notes */}
                <div>
                  <label className="form-label-custom">Admin Notes (Optional)</label>
                  <textarea className="form-control-custom" rows={2}
                    placeholder="Add any notes about this verification..."
                    value={notes[applicant.id] || ''}
                    onChange={e => setNotes(prev => ({ ...prev, [applicant.id]: e.target.value }))}
                    style={{ resize: 'none' }} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
