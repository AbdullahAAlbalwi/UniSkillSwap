// src/pages/admin/AdminUsers.js
import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import { allAdminUsers } from '../../data/mockData';

export default function AdminUsers() {
  const [users, setUsers] = useState(allAdminUsers);
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState('');

  const showToast = (msg, type = 'success') => { setToast({ msg, type }); setTimeout(() => setToast(''), 3000); };

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const toggleSuspend = (id) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' } : u));
    const user = users.find(u => u.id === id);
    showToast(user.status === 'Active' ? 'User suspended.' : 'User reactivated.');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      setUsers(prev => prev.filter(u => u.id !== id));
      showToast('User deleted.');
    }
  };

  const roleColor = (role) => {
    if (role === 'Tutor') return { background: 'var(--primary-light)', color: 'var(--primary)' };
    if (role === 'Requester') return { background: '#d1fae5', color: '#065f46' };
    return { background: '#fef3c7', color: '#92400e' };
  };

  return (
    <div>
      <Navbar />
      <div className="page-container fade-in">
        {toast && (
          <div style={{ position: 'fixed', top: 80, right: 20, background: '#d4edda', color: '#155724', borderRadius: 10, padding: '0.75rem 1.25rem', zIndex: 999, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontFamily: 'var(--font-main)', fontWeight: 600 }}>
            <i className="bi bi-check-circle me-2"></i>{toast.msg}
          </div>
        )}

        <h1 style={{ fontFamily: 'var(--font-main)', fontWeight: 800, fontSize: '2rem', marginBottom: '1.5rem' }}>User Management</h1>

        {/* Search */}
        <div className="card-custom mb-4">
          <div className="row g-3 align-items-center">
            <div className="col-md-8">
              <div style={{ position: 'relative' }}>
                <i className="bi bi-search" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}></i>
                <input className="form-control-custom" style={{ paddingLeft: '2.25rem' }}
                  placeholder="Search by name or email..."
                  value={search} onChange={e => setSearch(e.target.value)} />
              </div>
            </div>
            <div className="col-md-4 d-flex gap-2">
              <select className="form-control-custom">
                <option>All Roles</option>
                <option>Tutor</option>
                <option>Requester</option>
                <option>Both</option>
              </select>
              <button className="btn-outline-custom d-flex align-items-center gap-1" style={{ whiteSpace: 'nowrap', fontSize: '0.85rem' }}>
                <i className="bi bi-funnel"></i> Filters
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="card-custom" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border)', background: '#f9fafb' }}>
                  {['Name', 'Email', 'Role', 'Status', 'Join Date', 'Sessions', 'Actions'].map(h => (
                    <th key={h} style={{ padding: '1rem', fontFamily: 'var(--font-main)', fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'left', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((u, i) => (
                  <tr key={u.id} style={{ borderBottom: '1px solid var(--border)', background: i % 2 === 0 ? 'white' : '#fafafa' }}>
                    <td style={{ padding: '1rem' }}>
                      <div className="d-flex align-items-center gap-2">
                        <div className="avatar-circle" style={{ width: 36, height: 36, fontSize: '0.78rem', flexShrink: 0 }}>{u.initials}</div>
                        <span style={{ fontFamily: 'var(--font-main)', fontWeight: 600, fontSize: '0.92rem' }}>{u.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: '1rem', color: 'var(--text-muted)', fontSize: '0.88rem' }}>{u.email}</td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{ ...roleColor(u.role), borderRadius: 20, padding: '0.2rem 0.7rem', fontSize: '0.78rem', fontWeight: 600 }}>{u.role}</span>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <span className={u.status === 'Active' ? 'badge-active' : 'badge-suspended'}>{u.status}</span>
                    </td>
                    <td style={{ padding: '1rem', color: 'var(--text-muted)', fontSize: '0.85rem', whiteSpace: 'nowrap' }}>{u.joinDate}</td>
                    <td style={{ padding: '1rem', fontFamily: 'var(--font-main)', fontWeight: 600, textAlign: 'center' }}>{u.sessions}</td>
                    <td style={{ padding: '1rem' }}>
                      <div className="d-flex gap-2">
                        <button style={{ background: 'none', border: 'none', color: 'var(--primary)', fontFamily: 'var(--font-main)', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', padding: '0.25rem 0.5rem' }}>View</button>
                        <button style={{ background: 'none', border: 'none', color: '#f59e0b', fontFamily: 'var(--font-main)', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', padding: '0.25rem 0.5rem' }}
                          onClick={() => toggleSuspend(u.id)}>
                          {u.status === 'Active' ? 'Suspend' : 'Reactivate'}
                        </button>
                        <button style={{ background: 'none', border: 'none', color: 'var(--danger)', fontFamily: 'var(--font-main)', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', padding: '0.25rem 0.5rem' }}
                          onClick={() => handleDelete(u.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div style={{ padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Showing 1-{filtered.length} of 2,847 users</span>
            <div className="d-flex gap-1">
              {['Previous', '1', '2', '3', 'Next'].map(p => (
                <button key={p} style={{ padding: '0.35rem 0.75rem', border: '1.5px solid var(--border)', borderRadius: 6, background: p === '1' ? 'var(--primary)' : 'white', color: p === '1' ? 'white' : 'var(--text-dark)', fontFamily: 'var(--font-main)', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}>{p}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
