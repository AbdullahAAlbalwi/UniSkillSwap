// src/pages/admin/AdminReports.js
import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import { reports as initialReports } from '../../data/mockData';

export default function AdminReports() {
  const [reports, setReports] = useState(initialReports);
  const [activeTab, setActiveTab] = useState('all');
  const [toast, setToast] = useState('');

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const handleAction = (id, action) => {
    if (action === 'dismiss') {
      setReports(prev => prev.map(r => r.id === id ? { ...r, status: 'RESOLVED' } : r));
      showToast('Report dismissed.');
    } else if (action === 'resolve') {
      setReports(prev => prev.map(r => r.id === id ? { ...r, status: 'RESOLVED' } : r));
      showToast('Action taken and report resolved.');
    }
  };

  const filtered = reports.filter(r => {
    if (activeTab === 'pending') return r.status === 'PENDING';
    if (activeTab === 'resolved') return r.status === 'RESOLVED';
    return true;
  });

  const pending = reports.filter(r => r.status === 'PENDING');
  const resolved = reports.filter(r => r.status === 'RESOLVED');

  const severityClass = (s) => s === 'HIGH' ? 'badge-high' : s === 'MEDIUM' ? 'badge-medium' : 'badge-low';

  return (
    <div>
      <Navbar />
      <div className="page-container fade-in">
        {toast && (
          <div style={{ position: 'fixed', top: 80, right: 20, background: '#d4edda', color: '#155724', borderRadius: 10, padding: '0.75rem 1.25rem', zIndex: 999, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontFamily: 'var(--font-main)', fontWeight: 600 }}>
            <i className="bi bi-check-circle me-2"></i>{toast}
          </div>
        )}

        <h1 style={{ fontFamily: 'var(--font-main)', fontWeight: 800, fontSize: '2rem', marginBottom: '0.25rem' }}>Reports & Moderation</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Review and manage reported content and user behavior</p>

        {/* Tabs */}
        <div className="tab-nav mb-4">
          {[
            { key: 'all', label: `All Reports (${reports.length})` },
            { key: 'pending', label: `Pending (${pending.length})` },
            { key: 'resolved', label: `Resolved (${resolved.length})` }
          ].map(t => (
            <button key={t.key} className={`tab-btn ${activeTab === t.key ? 'active' : ''}`} onClick={() => setActiveTab(t.key)}>{t.label}</button>
          ))}
        </div>

        <div className="d-flex flex-column gap-3">
          {filtered.map(report => (
            <div key={report.id} className="card-custom">
              {/* Report header */}
              <div className="d-flex align-items-start justify-content-between flex-wrap gap-2 mb-3">
                <div>
                  <div className="d-flex align-items-center gap-2 flex-wrap mb-1">
                    <i className="bi bi-exclamation-triangle-fill" style={{ color: report.severity === 'HIGH' ? '#ef4444' : report.severity === 'MEDIUM' ? '#f59e0b' : '#10b981' }}></i>
                    <span style={{ fontFamily: 'var(--font-main)', fontWeight: 700, fontSize: '1rem' }}>{report.type}</span>
                    <span className={severityClass(report.severity)}>{report.severity}</span>
                    <span className={report.status === 'PENDING' ? 'badge-pending' : 'badge-resolved'}>{report.status}</span>
                  </div>
                  <div className="row g-2 mt-1">
                    <div className="col-auto">
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Reported User: <strong style={{ color: 'var(--text-dark)' }}>{report.reportedUser}</strong></span>
                    </div>
                    <div className="col-auto">
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Content Type: <strong style={{ color: 'var(--text-dark)' }}>{report.contentType}</strong></span>
                    </div>
                    <div className="col-auto">
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Reported By: <strong style={{ color: 'var(--text-dark)' }}>{report.reportedBy}</strong></span>
                    </div>
                    <div className="col-auto">
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Date: <strong style={{ color: 'var(--text-dark)' }}>{report.date}</strong></span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reason */}
              <div style={{ background: '#f9fafb', borderRadius: 8, padding: '0.75rem 1rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.88rem' }}><strong>Reason:</strong> {report.reason}</span>
              </div>

              {/* Actions */}
              <div className="d-flex gap-2 flex-wrap">
                <button style={{ padding: '0.45rem 1rem', background: 'white', border: '1.5px solid var(--border)', borderRadius: 8, fontFamily: 'var(--font-main)', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <i className="bi bi-eye"></i> View Details
                </button>
                {report.status === 'PENDING' && <>
                  <button style={{ padding: '0.45rem 1rem', background: '#10b981', color: 'white', border: 'none', borderRadius: 8, fontFamily: 'var(--font-main)', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
                    onClick={() => handleAction(report.id, 'resolve')}>
                    <i className="bi bi-check-circle"></i> Take Action
                  </button>
                  <button style={{ padding: '0.45rem 1rem', background: '#ef4444', color: 'white', border: 'none', borderRadius: 8, fontFamily: 'var(--font-main)', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
                    onClick={() => handleAction(report.id, 'dismiss')}>
                    <i className="bi bi-x-circle"></i> Dismiss
                  </button>
                  <button style={{ padding: '0.45rem 1rem', background: 'white', border: '1.5px solid var(--border)', borderRadius: 8, fontFamily: 'var(--font-main)', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <i className="bi bi-chat"></i> Contact Reporter
                  </button>
                </>}
                {report.status === 'RESOLVED' && (
                  <span style={{ color: '#10b981', fontFamily: 'var(--font-main)', fontWeight: 600, fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <i className="bi bi-check-circle-fill"></i> Resolved
                  </span>
                )}
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="card-custom text-center py-5">
              <i className="bi bi-shield-check" style={{ fontSize: '2.5rem', color: '#10b981' }}></i>
              <p style={{ color: 'var(--text-muted)', marginTop: '1rem', fontFamily: 'var(--font-main)', fontWeight: 600 }}>No reports in this category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
