import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { getUserById } from '../../data/users';
import StarRating from '../../components/common/StarRating';
import {
  Calendar,
  Clock,
  Star,
  ArrowRight,
  BookOpen,
  MessageSquare,
  Users,
  TrendingUp,
  AlertCircle,
} from 'lucide-react';

export default function TutorDashboard() {
  const { currentUser } = useAuth();
  const { sessions, offers, reviews } = useApp();

  const mySessions = sessions.filter((s) => s.tutorId === currentUser.id);
  const pending = mySessions.filter((s) => s.status === 'pending');
  const upcoming = mySessions.filter((s) => s.status === 'confirmed' || s.status === 'pending');
  const completed = mySessions.filter((s) => s.status === 'completed');
  const myOffers = offers.filter((o) => o.tutorId === currentUser.id && o.active);
  const myReviews = reviews.filter((r) => r.tutorId === currentUser.id);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Tutor Dashboard
        </h1>
        <p className="text-gray-600">Welcome back, {currentUser.name.split(' ')[0]}. Here's your overview.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Pending Requests', value: pending.length, icon: AlertCircle, color: 'bg-amber-50 text-amber-600' },
          { label: 'Upcoming Sessions', value: upcoming.length, icon: Calendar, color: 'bg-indigo-50 text-indigo-600' },
          { label: 'Completed', value: completed.length, icon: TrendingUp, color: 'bg-emerald-50 text-emerald-600' },
          { label: 'Active Offers', value: myOffers.length, icon: BookOpen, color: 'bg-purple-50 text-purple-600' },
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

      {/* Pending Requests */}
      {pending.length > 0 && (
        <div className="card border-amber-200 bg-amber-50/50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-amber-600" /> Pending Requests
            </h2>
            <Link to="/pending-requests" className="text-sm text-indigo-600 hover:text-indigo-500 flex items-center gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {pending.slice(0, 3).map((session) => {
              const requester = getUserById(session.requesterId);
              return (
                <div key={session.id} className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      <span className="text-sm font-semibold text-indigo-600">{requester?.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{session.subject}</p>
                      <p className="text-xs text-gray-500">from {requester?.name} &middot; {session.date} at {session.time}</p>
                    </div>
                  </div>
                  <Link to="/pending-requests" className="btn-primary text-xs">Review</Link>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Upcoming Sessions */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Upcoming Sessions</h2>
          <Link to="/my-sessions" className="text-sm text-indigo-600 hover:text-indigo-500 flex items-center gap-1">
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        {upcoming.filter((s) => s.status === 'confirmed').length === 0 ? (
          <p className="text-sm text-gray-500 py-2">No confirmed upcoming sessions.</p>
        ) : (
          <div className="space-y-3">
            {upcoming.filter((s) => s.status === 'confirmed').slice(0, 3).map((session) => {
              const requester = getUserById(session.requesterId);
              return (
                <div key={session.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      <span className="text-sm font-semibold text-indigo-600">{requester?.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{session.subject}</p>
                      <p className="text-xs text-gray-500">with {requester?.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{session.date}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-1 justify-end"><Clock className="h-3 w-3" /> {session.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Rating Summary */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Reputation</h2>
        <div className="flex items-center gap-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-gray-900">{currentUser.rating}</p>
            <StarRating rating={Math.round(currentUser.rating)} readonly size="sm" />
            <p className="text-xs text-gray-500 mt-1">{currentUser.reviewCount} reviews</p>
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap gap-2">
              {currentUser.badges.map((badge) => (
                <span key={badge} className="badge bg-amber-50 text-amber-700">{badge}</span>
              ))}
              {currentUser.badges.length === 0 && (
                <p className="text-sm text-gray-500">Complete more sessions to earn badges!</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link to="/my-offers/new" className="card hover:shadow-md transition-shadow flex items-center gap-3">
          <BookOpen className="h-8 w-8 text-indigo-600" />
          <div>
            <p className="font-medium text-gray-900">New Offer</p>
            <p className="text-xs text-gray-500">Publish a tutoring offer</p>
          </div>
        </Link>
        <Link to="/availability" className="card hover:shadow-md transition-shadow flex items-center gap-3">
          <Clock className="h-8 w-8 text-amber-600" />
          <div>
            <p className="font-medium text-gray-900">Availability</p>
            <p className="text-xs text-gray-500">Update your time slots</p>
          </div>
        </Link>
        <Link to="/messages" className="card hover:shadow-md transition-shadow flex items-center gap-3">
          <MessageSquare className="h-8 w-8 text-purple-600" />
          <div>
            <p className="font-medium text-gray-900">Messages</p>
            <p className="text-xs text-gray-500">Chat with students</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
