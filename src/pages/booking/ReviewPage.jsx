import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { getUserById } from '../../data/users';
import StarRating from '../../components/common/StarRating';
import { ArrowLeft, Send, CheckCircle } from 'lucide-react';

export default function ReviewPage() {
  const { sessionId } = useParams();
  const { currentUser } = useAuth();
  const { sessions, addReview } = useApp();
  const navigate = useNavigate();

  const session = sessions.find((s) => s.id === Number(sessionId));
  const tutor = session ? getUserById(session.tutorId) : null;

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!session || !tutor) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-semibold text-gray-900">Session not found</h2>
        <Link to="/my-sessions" className="text-indigo-600 mt-2 inline-block">Back to Sessions</Link>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (rating === 0) {
      setError('Please select a rating.');
      return;
    }

    addReview({
      sessionId: session.id,
      reviewerId: currentUser.id,
      tutorId: session.tutorId,
      rating,
      comment,
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto text-center py-20">
        <CheckCircle className="h-16 w-16 text-emerald-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Review Submitted!</h2>
        <p className="text-gray-600 mb-6">
          Thank you for reviewing your session with {tutor.name}.
        </p>
        <Link to="/my-sessions" className="btn-primary">Back to Sessions</Link>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <Link to="/my-sessions" className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900">
        <ArrowLeft className="h-4 w-4" /> Back to Sessions
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-gray-900">Rate & Review</h1>
        <p className="text-gray-600">How was your session with {tutor.name}?</p>
      </div>

      <div className="card">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
          <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
            <span className="text-lg font-semibold text-indigo-600">{tutor.name.charAt(0)}</span>
          </div>
          <div>
            <p className="font-medium text-gray-900">{tutor.name}</p>
            <p className="text-sm text-gray-500">{session.subject} &middot; {session.date}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Rating *</label>
            <StarRating rating={rating} onChange={setRating} size="lg" />
            <p className="text-xs text-gray-500 mt-1">
              {rating === 0 && 'Click a star to rate'}
              {rating === 1 && 'Poor'}
              {rating === 2 && 'Below Average'}
              {rating === 3 && 'Good'}
              {rating === 4 && 'Very Good'}
              {rating === 5 && 'Excellent'}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Comment (optional)</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              className="input-field"
              placeholder="Share your experience..."
            />
          </div>

          <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
            <Send className="h-5 w-5" /> Submit Review
          </button>
        </form>
      </div>
    </div>
  );
}
