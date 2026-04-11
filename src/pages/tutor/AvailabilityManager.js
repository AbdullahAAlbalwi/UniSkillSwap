// src/pages/tutor/AvailabilityManager.js
import React, { useState } from 'react';
import Navbar from '../../components/Navbar';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const TIMES = ['8:00 AM','9:00 AM','10:00 AM','11:00 AM','12:00 PM','1:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM','6:00 PM','7:00 PM','8:00 PM'];

const initialSelected = new Set(['Mon-2:00 PM', 'Mon-4:00 PM', 'Wed-2:00 PM', 'Wed-3:00 PM', 'Wed-5:00 PM', 'Fri-1:00 PM', 'Fri-3:00 PM']);

export default function AvailabilityManager() {
  const [selected, setSelected] = useState(initialSelected);
  const [saved, setSaved] = useState(false);

  const toggle = (day, time) => {
    const key = `${day}-${time}`;
    setSelected(prev => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const getSlotCount = (day) => TIMES.filter(t => selected.has(`${day}-${t}`)).length;

  return (
    <div>
      <Navbar />
      <div className="page-container fade-in">
        {saved && (
          <div style={{ position: 'fixed', top: 80, right: 20, background: '#d4edda', color: '#155724', borderRadius: 10, padding: '0.75rem 1.25rem', zIndex: 999, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontFamily: 'var(--font-main)', fontWeight: 600 }}>
            <i className="bi bi-check-circle me-2"></i>Availability saved!
          </div>
        )}

        <div className="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-3">
          <div>
            <h1 style={{ fontFamily: 'var(--font-main)', fontWeight: 800, fontSize: '2rem', marginBottom: '0.25rem' }}>Availability Manager</h1>
            <p style={{ color: 'var(--text-muted)', margin: 0 }}>Set your weekly availability for tutoring sessions</p>
          </div>
          <button className="btn-primary-custom d-flex align-items-center gap-2" onClick={handleSave}>
            <i className="bi bi-floppy"></i> Save Changes
          </button>
        </div>

        <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 8, padding: '0.75rem 1rem', marginBottom: '1.5rem' }}>
          <small style={{ color: '#1d4ed8' }}><strong>Instructions:</strong> Click on time slots to mark when you're available. Click again to remove availability. Students will be able to book sessions during your available times.</small>
        </div>

        <div className="card-custom mb-4" style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '4px', minWidth: 600 }}>
            <thead>
              <tr>
                <th style={{ fontFamily: 'var(--font-main)', fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-muted)', padding: '0.5rem', width: 80 }}>Time</th>
                {DAYS.map(d => (
                  <th key={d} style={{ fontFamily: 'var(--font-main)', fontWeight: 700, fontSize: '0.88rem', padding: '0.5rem', textAlign: 'center' }}>{d}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TIMES.map(time => (
                <tr key={time}>
                  <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)', padding: '2px 8px', fontWeight: 500, whiteSpace: 'nowrap' }}>{time}</td>
                  {DAYS.map(day => {
                    const key = `${day}-${time}`;
                    const isSelected = selected.has(key);
                    return (
                      <td key={day} style={{ padding: '2px' }}>
                        <div className={`avail-slot ${isSelected ? 'selected' : ''}`}
                          onClick={() => toggle(day, time)}
                          title={`${day} ${time}`} />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary */}
        <div className="card-custom">
          <h5 style={{ fontFamily: 'var(--font-main)', fontWeight: 700, marginBottom: '1rem' }}>Availability Summary</h5>
          <div className="row g-3">
            {DAYS.map(day => {
              const count = getSlotCount(day);
              return (
                <div key={day} className="col text-center">
                  <div style={{ fontFamily: 'var(--font-main)', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.25rem' }}>{day}</div>
                  <div style={{ fontFamily: 'var(--font-main)', fontWeight: 800, fontSize: '1.5rem', color: count > 0 ? 'var(--primary)' : 'var(--text-muted)' }}>{count}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>slots</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
