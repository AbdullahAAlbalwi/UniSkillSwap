// src/pages/tutor/MyOffers.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { tutors } from '../../data/mockData';

export default function MyOffers() {
  const [offers, setOffers] = useState(tutors[0].offers);
  const [toast, setToast] = useState('');

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this offer?')) {
      setOffers(prev => prev.filter(o => o.id !== id));
      showToast('Offer deleted.');
    }
  };

  const toggleStatus = (id) => {
    setOffers(prev => prev.map(o => o.id === id ? { ...o, status: o.status === 'Active' ? 'Draft' : 'Active' } : o));
    showToast('Offer status updated.');
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

        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
          <div>
            <h1 style={{ fontFamily: 'var(--font-main)', fontWeight: 800, fontSize: '2rem', marginBottom: '0.25rem' }}>My Offers</h1>
            <p style={{ color: 'var(--text-muted)', margin: 0 }}>Manage your tutoring service offerings</p>
          </div>
          <Link to="/create-offer" className="btn-primary-custom d-flex align-items-center gap-2">
            <i className="bi bi-plus-lg"></i> New Offer
          </Link>
        </div>

        <div className="d-flex flex-column gap-3">
          {offers.map(offer => (
            <div key={offer.id} className="card-custom">
              <div className="d-flex align-items-start justify-content-between flex-wrap gap-3">
                <div style={{ flex: 1 }}>
                  <div className="d-flex align-items-center gap-2 flex-wrap mb-1">
                    <h5 style={{ fontFamily: 'var(--font-main)', fontWeight: 700, margin: 0 }}>{offer.title}</h5>
                    <span className={offer.status === 'Active' ? 'badge-active' : 'badge-draft'}>{offer.status}</span>
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '0.75rem' }}>{offer.description}</p>
                  <div className="d-flex flex-wrap gap-2">
                    <span style={{ background: '#f0f2f5', border: '1px solid var(--border)', borderRadius: 6, padding: '0.2rem 0.6rem', fontSize: '0.78rem', fontWeight: 500 }}>{offer.level}</span>
                    {offer.tags.map(t => <span key={t} className="tag" style={{ fontSize: '0.72rem' }}>{t}</span>)}
                  </div>
                </div>
                <div className="d-flex gap-2">
                  <button className="btn-outline-custom d-flex align-items-center gap-1" style={{ fontSize: '0.85rem' }} onClick={() => toggleStatus(offer.id)}>
                    <i className="bi bi-pencil"></i> Edit
                  </button>
                  <button style={{ padding: '0.4rem 1rem', background: 'transparent', color: 'var(--danger)', border: '2px solid var(--danger)', borderRadius: 8, fontFamily: 'var(--font-main)', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
                    onClick={() => handleDelete(offer.id)}>
                    <i className="bi bi-trash"></i> Delete
                  </button>
                </div>
              </div>
              <div style={{ borderTop: '1px solid var(--border)', marginTop: '1rem', paddingTop: '0.75rem', display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Sessions: <strong style={{ color: 'var(--text-dark)' }}>{offer.sessions}</strong></span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Requests: <strong style={{ color: offer.pendingRequests > 0 ? 'var(--primary)' : 'var(--text-dark)' }}>{offer.pendingRequests} pending</strong></span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Last updated: Feb 25, 2026</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
