import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import EmptyState from '../../components/common/EmptyState';
import { BookOpen, PlusCircle, Clock, CheckCircle, AlertCircle, Monitor, MapPin } from 'lucide-react';

const statusStyles = {
  open: 'badge-warning',
  matched: 'badge-success',
  closed: 'badge text-gray-600 bg-gray-100',
};

const statusIcons = {
  open: Clock,
  matched: CheckCircle,
  closed: AlertCircle,
};

export default function MyRequestsPage() {
  const { currentUser } = useAuth();
  const { requests } = useApp();
  const myRequests = requests.filter((r) => r.requesterId === currentUser.id);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Requests</h1>
          <p className="text-gray-600">Track your help requests</p>
        </div>
        <Link to="/post-request" className="btn-primary flex items-center gap-2">
          <PlusCircle className="h-5 w-5" /> New Request
        </Link>
      </div>

      {myRequests.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title="No requests yet"
          message="Post a help request to find the right tutor for your needs."
          action={
            <Link to="/post-request" className="btn-primary text-sm">Post a Request</Link>
          }
        />
      ) : (
        <div className="space-y-4">
          {myRequests.map((req) => {
            const StatusIcon = statusIcons[req.status] || Clock;
            return (
              <div key={req.id} className="card">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-gray-900">{req.subject}</h3>
                      <span className={statusStyles[req.status]}>
                        <StatusIcon className="h-3 w-3 mr-1 inline" />
                        {req.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{req.description}</p>
                    <div className="flex flex-wrap items-center gap-2 mt-3">
                      {req.tags.map((tag) => (
                        <span key={tag} className="badge-primary text-[10px]">{tag}</span>
                      ))}
                      <span className="badge text-[10px] bg-gray-100 text-gray-600">{req.difficulty}</span>
                      <span className="badge text-[10px] bg-gray-100 text-gray-600 flex items-center gap-1">
                        {req.mode === 'Online' ? <Monitor className="h-3 w-3" /> : <MapPin className="h-3 w-3" />}
                        {req.mode}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 shrink-0">{req.createdAt}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
