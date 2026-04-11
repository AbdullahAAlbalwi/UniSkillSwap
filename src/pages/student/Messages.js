// src/pages/student/Messages.js
import React, { useState, useRef, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import { messages as initialMessages } from '../../data/mockData';

export default function Messages() {
  const [convos, setConvos] = useState(initialMessages);
  const [selected, setSelected] = useState(initialMessages[0]);
  const [newMsg, setNewMsg] = useState('');
  const [search, setSearch] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [selected]);

  const sendMessage = () => {
    if (!newMsg.trim()) return;
    const msg = { from: 'me', text: newMsg.trim(), time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    const updated = convos.map(c => c.id === selected.id ? { ...c, chat: [...c.chat, msg], lastMessage: msg.text, time: msg.time, unread: 0 } : c);
    setConvos(updated);
    setSelected(updated.find(c => c.id === selected.id));
    setNewMsg('');
  };

  const selectConvo = (c) => {
    const updated = convos.map(cv => cv.id === c.id ? { ...cv, unread: 0 } : cv);
    setConvos(updated);
    setSelected(updated.find(cv => cv.id === c.id));
  };

  const filtered = convos.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <Navbar />
      <div className="page-container fade-in">
        <h1 style={{ fontFamily: 'var(--font-main)', fontWeight: 800, fontSize: '2rem', marginBottom: '1.5rem' }}>Messages</h1>

        <div style={{ display: 'flex', gap: 0, background: 'white', borderRadius: 16, border: '1.5px solid var(--border)', overflow: 'hidden', height: '70vh', minHeight: 500 }}>
          {/* Conversations list */}
          <div style={{ width: 300, borderRight: '1.5px solid var(--border)', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
            <div style={{ padding: '1rem' }}>
              <div style={{ position: 'relative' }}>
                <i className="bi bi-search" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: '0.85rem' }}></i>
                <input className="form-control-custom" style={{ paddingLeft: '2rem', fontSize: '0.88rem', padding: '0.5rem 0.75rem 0.5rem 2rem' }}
                  placeholder="Search conversations..."
                  value={search} onChange={e => setSearch(e.target.value)} />
              </div>
            </div>
            <div style={{ flex: 1, overflowY: 'auto' }}>
              {filtered.map(c => (
                <div key={c.id} onClick={() => selectConvo(c)}
                  style={{ padding: '0.85rem 1rem', cursor: 'pointer', background: selected?.id === c.id ? 'var(--primary)' : 'transparent', transition: 'background 0.15s', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div className="avatar-circle" style={{ background: selected?.id === c.id ? 'rgba(255,255,255,0.3)' : 'var(--primary)', color: 'white', width: 42, height: 42, flexShrink: 0 }}>{c.initials}</div>
                  <div style={{ flex: 1, overflow: 'hidden' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontFamily: 'var(--font-main)', fontWeight: 700, fontSize: '0.92rem', color: selected?.id === c.id ? 'white' : 'var(--text-dark)' }}>{c.name}</span>
                      <span style={{ fontSize: '0.75rem', color: selected?.id === c.id ? 'rgba(255,255,255,0.8)' : 'var(--text-muted)' }}>{c.time}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.82rem', color: selected?.id === c.id ? 'rgba(255,255,255,0.8)' : 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 140 }}>{c.lastMessage}</span>
                      {c.unread > 0 && <span style={{ background: selected?.id === c.id ? 'white' : 'var(--primary)', color: selected?.id === c.id ? 'var(--primary)' : 'white', borderRadius: '50%', width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem', fontWeight: 700, flexShrink: 0 }}>{c.unread}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat area */}
          {selected ? (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              {/* Chat header */}
              <div style={{ padding: '1rem 1.25rem', borderBottom: '1.5px solid var(--border)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div className="avatar-circle">{selected.initials}</div>
                <div>
                  <div style={{ fontFamily: 'var(--font-main)', fontWeight: 700 }}>{selected.name}</div>
                  <div style={{ fontSize: '0.78rem', color: '#28a745', fontWeight: 600 }}>● Active now</div>
                </div>
              </div>

              {/* Messages */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {selected.chat.map((msg, i) => (
                  <div key={i}>
                    {msg.from === 'them' && (
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>{selected.name}</div>
                    )}
                    <div style={{ display: 'flex', justifyContent: msg.from === 'me' ? 'flex-end' : 'flex-start' }}>
                      <div className={msg.from === 'me' ? 'chat-bubble-me' : 'chat-bubble-them'}>{msg.text}</div>
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textAlign: msg.from === 'me' ? 'right' : 'left', marginTop: '0.2rem' }}>{msg.time}</div>
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>

              {/* Input */}
              <div style={{ padding: '1rem 1.25rem', borderTop: '1.5px solid var(--border)', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.2rem', padding: '0.25rem' }}>
                  <i className="bi bi-paperclip"></i>
                </button>
                <input className="form-control-custom" style={{ flex: 1 }} placeholder="Type a message..."
                  value={newMsg} onChange={e => setNewMsg(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendMessage()} />
                <button className="btn-primary-custom d-flex align-items-center gap-1" style={{ whiteSpace: 'nowrap' }} onClick={sendMessage}>
                  <i className="bi bi-send-fill"></i> Send
                </button>
              </div>
            </div>
          ) : (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
              Select a conversation to start messaging
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
