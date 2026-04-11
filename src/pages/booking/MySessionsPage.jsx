import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { getUserById } from '../../data/users';
import Modal from '../../components/common/Modal';
import EmptyState from '../../components/common/EmptyState';
import {
  Calendar,
  Clock,
  Monitor,
  MapPin,
  CheckCircle,
  XCircle,
  AlertCircle,
  Star,
  MessageSquare,
} from 'lucide-react';

const statusConfig = {
  pending: { class: 'badge-warning', icon: Clock, label: 'Pending' },
  confirmed: { class: 'badge-success', icon: CheckCircle, label: 'Confirmed' },
  completed: { class: 'badge bg-gray-100 text-gray-600', icon: CheckCircle, label: 'Completed' },
  cancelled: { class: 'badge-danger', icon: XCircle, label: 'Cancelled' },
};

export default function MySessionsPage() {
  const { currentUser } = useAuth();
  const { sessions, updateSessionStatus } = useApp();
  const [cancelModal, setCancelModal] = useState(null);
  const [tab, setTab] = useState('upcoming');

  const mySessions = sessions.filter(
    (s) => s.requesterId === currentUser.id || s.tutorId === currentUser.id
  );
  const upcoming = mySessions.filter((s) => s.status === 'confirmed' || s.status === 'pending');
  const past = mySessions.filter((s) => s.status === 'completed' || s.status === 'cancelled');
  const displayed = tab === 'upcoming' ? upcoming : past;

  const handleCancel = (sessionId) => {
    updateSessionStatus(sessionId, 'cancelled');
    setCancelModal(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Sessions</h1>
        <p className="text-gray-600">Manage your tutoring sessions</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-lg p-1 w-fit">
        {[
          { key: 'upcoming', label: `Upcoming (${upcoming.length})` },
          { key: 'past', label: `Past (${past.length})` },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              tab === t.key ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {displayed.length === 0 ? (
        <EmptyState
          icon={Calendar}
          title={tab === 'upcoming' ? 'No upcoming sessions' : 'No past sessions'}
          message={tab === 'upcoming' ? 'Book a session to get started with learning.' : 'Completed sessions will appear here.'}
          action={tab === 'upcoming' && <Link to="/browse" className="btn-primary text-sm">Browse Tutors</Link>}
        />
      ) : (
        <div className="space-y-4">
          {displayed.map((session) => {
            const other = getUserById(
              session.tutorId === currentUser.id ? session.requesterId : session.tutorId
            );
            const status = statusConfig[session.status];
            const StatusIcon = status.icon;
            return (
              <div key={session.id} className="card">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                      <span className="text-lg font-semibold text-indigo-600">{other?.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{session.subject}</h3>
                      <p className="text-sm text-gray-500">
                        with {other?.name} &middot; {session.tutorId === currentUser.id ? 'You are tutoring' : 'You are learning'}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-gray-500">
                        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {session.date}</span>
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {session.time}</span>
                        <span className="flex items-center gap-1">
                          {session.mode === 'Online' ? <Monitor className="h-3 w-3" /> : <MapPin className="h-3 w-3" />}
                          {session.mode}
                        </span>
                        <span className={status.class}>
                          <StatusIcon className="h-3 w-3 mr-1 inline" /> {status.label}
                        </span>
                      </div>
                      {session.note && (
                        <p className="text-sm text-gray-600 mt-2 italic">"{session.note}"</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:flex-col">
                    {session.status === 'completed' && session.requesterId === currentUser.id && (
                      <Link to={`/review/${session.id}`} className="btn-primary text-sm flex items-center gap-1 whitespace-nowrap">
                        <Star className="h-4 w-4" /> Review
                      </Link>
                    )}
                    {(session.status === 'confirmed' || session.status === 'pending') && (
                      <button
                        onClick={() => setCancelModal(session.id)}
                        className="btn-secondary text-sm text-red-600 border-red-200 hover:bg-red-50 whitespace-nowrap"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Modal open={!!cancelModal} onClose={() => setCancelModal(null)} title="Cancel Session">
        <p className="text-sm text-gray-600 mb-4">Are you sure you want to cancel this session? The other party will be notified.</p>
        <div className="flex justify-end gap-3">
          <button onClick={() => setCancelModal(null)} className="btn-secondary">Keep Session</button>
          <button onClick={() => handleCancel(cancelModal)} className="btn-danger">Yes, Cancel</button>
        </div>
      </Modal>
    </div>
  );
}
