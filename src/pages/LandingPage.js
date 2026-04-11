// src/pages/LandingPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const features = [
  { icon: 'bi-book', title: 'Diverse Skills', desc: 'Access tutors across all subjects and skill levels' },
  { icon: 'bi-people', title: 'Peer Learning', desc: "Learn from fellow students who understand your challenges" },
  { icon: 'bi-calendar-check', title: 'Flexible Scheduling', desc: 'Book sessions that fit your busy university schedule' },
  { icon: 'bi-patch-check', title: 'Verified Tutors', desc: 'All tutors are verified university students' }
];

export default function LandingPage() {
  return (
    <div>
      <Navbar />
      {/* Hero */}
      <div className="hero-section">
        <div className="page-container w-100">
          <div className="row align-items-center">
            <div className="col-lg-6 fade-in">
              <h1 style={{ fontFamily: 'var(--font-main)', fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.15, marginBottom: '1.5rem' }}>
                Exchange Skills.<br />Learn Together.<br />
                <span style={{ color: '#a78bfa' }}>Grow Faster.</span>
              </h1>
              <p style={{ fontSize: '1.15rem', color: 'rgba(255,255,255,0.75)', marginBottom: '2rem', maxWidth: 480 }}>
                Connect with fellow students for peer-to-peer tutoring and skill exchange at your university.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <Link to="/signup" className="btn-primary-custom" style={{ fontSize: '1rem', padding: '0.75rem 2rem' }}>Get Started</Link>
                <Link to="/browse" className="btn-outline-custom" style={{ fontSize: '1rem', padding: '0.75rem 2rem', color: 'white', borderColor: 'white' }}>Browse Tutors</Link>
              </div>
            </div>
            <div className="col-lg-6 d-none d-lg-flex justify-content-center">
              <div style={{ position: 'relative', width: 400, height: 400 }}>
                {/* Decorative circles */}
                <div style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', background: 'rgba(91,79,207,0.3)', top: 50, left: 50 }}></div>
                <div style={{ position: 'absolute', width: 200, height: 200, borderRadius: '50%', background: 'rgba(167,139,250,0.2)', top: 100, left: 100 }}></div>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="bi bi-mortarboard-fill" style={{ fontSize: '6rem', color: 'rgba(255,255,255,0.9)' }}></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="page-container">
        <h2 style={{ fontFamily: 'var(--font-main)', fontWeight: 800, fontSize: '2rem', textAlign: 'center', margin: '3rem 0 2rem' }}>
          Why Choose UniSkillSwap?
        </h2>
        <div className="row g-4 mb-5">
          {features.map((f, i) => (
            <div key={i} className="col-sm-6 col-lg-3">
              <div className="card-custom h-100 text-center fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                <div style={{ width: 56, height: 56, background: 'var(--primary-light)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                  <i className={`bi ${f.icon}`} style={{ fontSize: '1.5rem', color: 'var(--primary)' }}></i>
                </div>
                <h5 style={{ fontFamily: 'var(--font-main)', fontWeight: 700, marginBottom: '0.5rem' }}>{f.title}</h5>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', margin: 0 }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ background: 'var(--nav-bg)', borderRadius: 20, padding: '3rem 2rem', textAlign: 'center', marginBottom: '3rem', color: 'white' }}>
          <h3 style={{ fontFamily: 'var(--font-main)', fontWeight: 800, fontSize: '1.75rem', marginBottom: '0.75rem' }}>Ready to start learning?</h3>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '1.5rem' }}>Join thousands of students already exchanging skills on UniSkillSwap</p>
          <Link to="/signup" className="btn-primary-custom" style={{ fontSize: '1rem', padding: '0.75rem 2.5rem' }}>Sign Up Now</Link>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ background: 'var(--nav-bg)', color: 'rgba(255,255,255,0.6)', textAlign: 'center', padding: '1.5rem', fontSize: '0.875rem' }}>
        © 2026 UniSkillSwap — Campus Skill Exchange & Micro-Tutoring
      </footer>
    </div>
  );
}
