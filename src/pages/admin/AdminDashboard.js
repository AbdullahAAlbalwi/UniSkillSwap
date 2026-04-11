// src/pages/admin/AdminDashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { adminStats, adminRecentActivity } from '../../data/mockData';

const statCards = [
  { icon: 'bi-people', label: 'Total Users', value: adminStats.totalUsers.toLocaleString(), sub: '+12% this month', color: '#3b82f6' },
  { icon: 'bi-calendar-check', label: 'Active Sessions', value: adminStats.activeSessions, sub: 'Currently ongoing', color: '#10b981' },
  { icon: 'bi-person-plus', label: 'New Sign-ups', value: adminStats.newSignups, sub: 'This week', color: '#8b5cf6' },
  { icon: 'bi-star', label: 'Average Rating', value: adminStats.avgRating, sub: 'Across all tutors', color: '#f59e0b' }
];

export default function AdminDashboard() {
  return (
    <div>
      <Navbar />
      <div className="page-container fade-in">
        <h1 style={{ fontFamily: 'var(--font-main)', fontWeight: 800, fontSize: '2rem', marginBottom: '1.75rem' }}>Admin Dashboard</h1>

        {/* Stat cards */}
        <div className="row g-4 mb-4">
          {statCards.map((s, i) => (
            <div key={i} className="col-sm-6 col-lg-3">
              <div className="stat-card">
                <i className={`bi ${s.icon}`} style={{ fontSize: '1.75rem', color: s.color, marginBottom: '0.5rem', display: 'block' }}></i>
                <div className="stat-value">{s.value}</div>
                <div style={{ fontFamily: 'var(--font-main)', fontWeight: 600, marginTop: '0.2rem' }}>{s.label}</div>
                <div className="stat-label" style={{ fontSize: '0.82rem', marginTop: '0.2rem' }}>{s.sub}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="row g-4">
          {/* Recent activity */}
          <div className="col-lg-7">
            <div className="card-custom">
              <h5 style={{ fontFamily: 'var(--font-main)', fontWeight: 700, marginBottom: '1.25rem' }}>Recent Activity</h5>
              <div className="d-flex flex-column gap-3">
                {adminRecentActivity.map(a => (
                  <div key={a.id} className="d-flex align-items-center gap-3" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '0.85rem' }}>
                    <div className="avatar-circle">{a.name.charAt(0)}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: 'var(--font-main)', fontWeight: 600, fontSize: '0.92rem' }}>{a.name}</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{a.action}</div>
                    </div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>{a.time}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right panel */}
          <div className="col-lg-5 d-flex flex-column gap-4">
            {/* User breakdown */}
            <div className="card-custom">
              <h5 style={{ fontFamily: 'var(--font-main)', fontWeight: 700, marginBottom: '1rem' }}>User Breakdown</h5>
              {[
                { label: 'Requesters', value: adminStats.requesters.toLocaleString() },
                { label: 'Tutors', value: adminStats.tutorsCount.toLocaleString() },
                { label: 'Both Roles', value: adminStats.bothRoles.toLocaleString() }
              ].map(r => (
                <div key={r.label} className="d-flex justify-content-between py-2" style={{ borderBottom: '1px solid var(--border)' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{r.label}</span>
                  <span style={{ fontFamily: 'var(--font-main)', fontWeight: 700 }}>{r.value}</span>
                </div>
              ))}
            </div>

            {/* Pending actions */}
            <div className="card-custom">
              <h5 style={{ fontFamily: 'var(--font-main)', fontWeight: 700, marginBottom: '1rem' }}>Pending Actions</h5>
              {[
                { label: 'Verifications', value: adminStats.pendingVerifications, link: '/admin/verification', color: 'var(--primary)' },
                { label: 'Reports', value: adminStats.pendingReports, link: '/admin/reports', color: '#dc3545' },
                { label: 'Appeals', value: adminStats.pendingAppeals, link: '/admin/users', color: '#f59e0b' }
              ].map(a => (
                <div key={a.label} className="d-flex justify-content-between align-items-center py-2" style={{ borderBottom: '1px solid var(--border)' }}>
                  <Link to={a.link} style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textDecoration: 'none' }}>{a.label}</Link>
                  <span style={{ background: a.color, color: 'white', borderRadius: 20, padding: '0.15rem 0.65rem', fontFamily: 'var(--font-main)', fontWeight: 700, fontSize: '0.82rem' }}>{a.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
