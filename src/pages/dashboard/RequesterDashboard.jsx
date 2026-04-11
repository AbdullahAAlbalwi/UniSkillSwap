import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { getUserById, getTutors } from '../../data/users';
import {
  Calendar,
  Clock,
  Star,
  ArrowRight,
  BookOpen,
  MessageSquare,
  Search,
  TrendingUp,
} from 'lucide-react';
import StarRating from '../../components/common/StarRating';

export default function RequesterDashboard() {
  const { currentUser } = useAuth();
  const { sessions, requests } = useApp();

  const upcoming = sessions.filter(
    (s) => s.requesterId === currentUser.id && (s.status === 'confirmed' || s.status === 'pending')
  );
  const openRequests = requests.filter(
    (r) => r.requesterId === currentUser.id && r.status === 'open'
  );
  const tutors = getTutors();
  const recommended = tutors
    .filter((t) => t.verified)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {currentUser.name.split(' ')[0]}!
        </h1>
        <p className="text-gray-600">Here's what's happening with your learning sessions.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Upcoming Sessions', value: upcoming.length, icon: Calendar, color: 'bg-indigo-50 text-indigo-600' },
          { label: 'Open Requests', value: openRequests.length, icon: BookOpen, color: 'bg-amber-50 text-amber-600' },
          { label: 'Completed', value: sessions.filter((s) => s.requesterId === currentUser.id && s.status === 'completed').length, icon: TrendingUp, color: 'bg-emerald-50 text-emerald-600' },
          { label: 'Messages', value: '3 new', icon: MessageSquare, color: 'bg-purple-50 text-purple-600' },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="card flex items-center gap-4">
              <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Upcoming Sessions */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Upcoming Sessions</h2>
          <Link to="/my-sessions" className="text-sm text-indigo-600 hover:text-indigo-500 flex items-center gap-1">
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        {upcoming.length === 0 ? (
          <p className="text-sm text-gray-500 py-4">No upcoming sessions. <Link to="/browse" className="text-indigo-600">Browse tutors</Link> to book one.</p>
        ) : (
          <div className="space-y-3">
            {upcoming.slice(0, 3).map((session) => {
              const tutor = getUserById(session.tutorId);
              return (
                <div key={session.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      <span className="text-sm font-semibold text-indigo-600">{tutor?.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{session.subject}</p>
                      <p className="text-xs text-gray-500">with {tutor?.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{session.date}</p>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="h-3 w-3" /> {session.time}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Recommended Tutors */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Recommended for You</h2>
          <Link to="/browse" className="text-sm text-indigo-600 hover:text-indigo-500 flex items-center gap-1">
            See All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {recommended.map((tutor) => (
            <Link
              key={tutor.id}
              to={`/tutor/${tutor.id}`}
              className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-indigo-200 hover:bg-indigo-50/50 transition-colors"
            >
              <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                <span className="text-lg font-semibold text-indigo-600">{tutor.name.charAt(0)}</span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-gray-900 truncate">{tutor.name}</p>
                  {tutor.verified && <span className="badge-success text-[10px]">Verified</span>}
                </div>
                <p className="text-xs text-gray-500 truncate">{tutor.skills.slice(0, 3).join(', ')}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <StarRating rating={Math.round(tutor.rating)} readonly size="sm" />
                  <span className="text-xs text-gray-500">({tutor.reviewCount})</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link to="/browse" className="card hover:shadow-md transition-shadow flex items-center gap-3">
          <Search className="h-8 w-8 text-indigo-600" />
          <div>
            <p className="font-medium text-gray-900">Browse Tutors</p>
            <p className="text-xs text-gray-500">Find the perfect match</p>
          </div>
        </Link>
        <Link to="/post-request" className="card hover:shadow-md transition-shadow flex items-center gap-3">
          <BookOpen className="h-8 w-8 text-amber-600" />
          <div>
            <p className="font-medium text-gray-900">Post a Request</p>
            <p className="text-xs text-gray-500">Describe what you need</p>
          </div>
        </Link>
        <Link to="/messages" className="card hover:shadow-md transition-shadow flex items-center gap-3">
          <MessageSquare className="h-8 w-8 text-purple-600" />
          <div>
            <p className="font-medium text-gray-900">Messages</p>
            <p className="text-xs text-gray-500">Chat with your tutors</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
