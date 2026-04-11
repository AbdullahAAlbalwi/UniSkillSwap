import { useParams, Link } from 'react-router-dom';
import { getUserById } from '../../data/users';
import { useApp } from '../../context/AppContext';
import { getReviewsForTutor } from '../../data/reviews';
import StarRating from '../../components/common/StarRating';
import TimeSlotPicker from '../../components/common/TimeSlotPicker';
import {
  BadgeCheck,
  Calendar,
  MapPin,
  Monitor,
  Globe,
  Award,
  BookOpen,
  ArrowLeft,
} from 'lucide-react';

export default function TutorProfilePage() {
  const { id } = useParams();
  const tutor = getUserById(Number(id));
  const { offers } = useApp();
  const reviews = getReviewsForTutor(Number(id));
  const tutorOffers = offers.filter((o) => o.tutorId === Number(id) && o.active);

  if (!tutor) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-semibold text-gray-900">Tutor not found</h2>
        <Link to="/browse" className="text-indigo-600 mt-2 inline-block">Back to Browse</Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link to="/browse" className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900">
        <ArrowLeft className="h-4 w-4" /> Back to Browse
      </Link>

      {/* Profile Header */}
      <div className="card">
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <div className="h-20 w-20 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
            <span className="text-3xl font-bold text-indigo-600">{tutor.name.charAt(0)}</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl font-bold text-gray-900">{tutor.name}</h1>
              {tutor.verified && (
                <span className="badge-success flex items-center gap-1">
                  <BadgeCheck className="h-3 w-3" /> Verified Mentor
                </span>
              )}
            </div>
            <p className="text-gray-600 mt-1">{tutor.bio}</p>

            <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <StarRating rating={Math.round(tutor.rating)} readonly size="sm" />
                <span className="font-medium text-gray-900">{tutor.rating}</span>
                <span>({tutor.reviewCount} reviews)</span>
              </div>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" /> {tutor.sessionsCompleted} sessions
              </span>
              <span className="flex items-center gap-1">
                <Globe className="h-4 w-4" /> {tutor.languages.join(', ')}
              </span>
            </div>

            {/* Badges */}
            {tutor.badges.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {tutor.badges.map((badge) => (
                  <span key={badge} className="badge bg-amber-50 text-amber-700 flex items-center gap-1">
                    <Award className="h-3 w-3" /> {badge}
                  </span>
                ))}
              </div>
            )}

            {/* Skills */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {tutor.skills.map((skill) => (
                <span key={skill} className="badge-primary">{skill}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Offers */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              <BookOpen className="h-5 w-5 inline mr-2 text-indigo-600" />
              Available Offers
            </h2>
            {tutorOffers.length === 0 ? (
              <p className="text-sm text-gray-500">No active offers right now.</p>
            ) : (
              <div className="space-y-3">
                {tutorOffers.map((offer) => (
                  <div key={offer.id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">{offer.subject}</h3>
                        <p className="text-sm text-gray-600 mt-1">{offer.description}</p>
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          <span className="badge-primary text-[10px]">{offer.difficulty}</span>
                          <span className="badge text-[10px] bg-gray-100 text-gray-600 flex items-center gap-1">
                            {offer.mode === 'Online' ? <Monitor className="h-3 w-3" /> : <MapPin className="h-3 w-3" />}
                            {offer.mode}
                          </span>
                        </div>
                      </div>
                      <Link
                        to={`/book/${tutor.id}?offer=${offer.id}`}
                        className="btn-primary text-sm shrink-0"
                      >
                        Book
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Reviews */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Reviews ({reviews.length})</h2>
            {reviews.length === 0 ? (
              <p className="text-sm text-gray-500">No reviews yet.</p>
            ) : (
              <div className="space-y-4">
                {reviews.map((review) => {
                  const reviewer = getUserById(review.reviewerId);
                  return (
                    <div key={review.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                            <span className="text-xs font-semibold text-gray-600">{reviewer?.name.charAt(0)}</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{reviewer?.name}</p>
                            <p className="text-xs text-gray-500">{review.createdAt}</p>
                          </div>
                        </div>
                        <StarRating rating={review.rating} readonly size="sm" />
                      </div>
                      {review.comment && (
                        <p className="text-sm text-gray-600 mt-2">{review.comment}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar - Availability */}
        <div className="space-y-6">
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Availability</h2>
            <TimeSlotPicker availability={tutor.availability} readonly />
          </div>
          <Link to={`/book/${tutor.id}`} className="btn-primary w-full text-center block">
            Book a Session
          </Link>
        </div>
      </div>
    </div>
  );
}
