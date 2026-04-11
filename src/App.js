import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div style={{ textAlign: 'center', paddingTop: '4rem', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#5B4FCF' }}>UniSkillSwap</h1>
          <p style={{ color: '#6c757d', marginTop: '0.5rem' }}>Campus Skill Exchange &amp; Micro-Tutoring Platform</p>
          <p style={{ color: '#6c757d' }}>Pages coming soon...</p>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
