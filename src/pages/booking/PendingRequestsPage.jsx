import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { getUserById } from '../../data/users';
import EmptyState from '../../components/common/EmptyState';
import { Calendar, Clock, Monitor, MapPin, Check, X, Inbox } from 'lucide-react';

export default function PendingRequestsPage() {
  const { currentUser } = useAuth();
  const { sessions, updateSessionStatus } = useApp();

  const pending = sessions.filter(
    (s) => s.tutorId === currentUser.id && s.status === 'pending'
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Pending Requests</h1>
        <p className="text-gray-600">Review and respond to booking requests from students</p>
      </div>

      {pending.length === 0 ? (
        <EmptyState
          icon={Inbox}
          title="No pending requests"
          message="You don't have any booking requests waiting for your response."
        />
      ) : (
        <div className="space-y-4">
          {pending.map((session) => {
            const requester = getUserById(session.requesterId);
            return (
              <div key={session.id} className="card">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                      <span className="text-lg font-semibold text-indigo-600">{requester?.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{session.subject}</h3>
                      <p className="text-sm text-gray-500">from {requester?.name}</p>
                      <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-gray-500">
                        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {session.date}</span>
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {session.time}</span>
                        <span className="flex items-center gap-1">
                          {session.mode === 'Online' ? <Monitor className="h-3 w-3" /> : <MapPin className="h-3 w-3" />}
                          {session.mode}
                        </span>
                        <span className="text-gray-400">{session.duration} min</span>
                      </div>
                      {session.note && (
                        <p className="text-sm text-gray-600 mt-2 bg-gray-50 rounded-lg p-2 italic">"{session.note}"</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:flex-col">
                    <button
                      onClick={() => updateSessionStatus(session.id, 'confirmed')}
                      className="btn-success text-sm flex items-center gap-1"
                    >
                      <Check className="h-4 w-4" /> Accept
                    </button>
                    <button
                      onClick={() => updateSessionStatus(session.id, 'cancelled')}
                      className="btn-secondary text-sm text-red-600 border-red-200 hover:bg-red-50 flex items-center gap-1"
                    >
                      <X className="h-4 w-4" /> Decline
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
