import { useState } from 'react';
import { useParams, useNavigate, useSearchParams, Link } from 'react-router-dom';
import { getUserById } from '../../data/users';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { weekDays, timeSlots } from '../../data/tags';
import { ArrowLeft, Calendar, Clock, Monitor, MapPin, CheckCircle } from 'lucide-react';

export default function BookSessionPage() {
  const { tutorId } = useParams();
  const [searchParams] = useSearchParams();
  const offerId = searchParams.get('offer');
  const tutor = getUserById(Number(tutorId));
  const { currentUser } = useAuth();
  const { offers, bookSession } = useApp();
  const navigate = useNavigate();

  const [selectedDay, setSelectedDay] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [mode, setMode] = useState('Online');
  const [note, setNote] = useState('');
  const [booked, setBooked] = useState(false);

  if (!tutor) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-semibold text-gray-900">Tutor not found</h2>
        <Link to="/browse" className="text-indigo-600 mt-2 inline-block">Back to Browse</Link>
      </div>
    );
  }

  const selectedOffer = offerId ? offers.find((o) => o.id === Number(offerId)) : null;
  const availableSlots = selectedDay ? (tutor.availability[selectedDay] || []) : [];

  const getNextDate = (dayName) => {
    const dayMap = { sunday: 0, monday: 1, tuesday: 2, wednesday: 3, thursday: 4, friday: 5, saturday: 6 };
    const today = new Date();
    const target = dayMap[dayName];
    const diff = (target - today.getDay() + 7) % 7 || 7;
    const next = new Date(today);
    next.setDate(today.getDate() + diff);
    return next.toISOString().split('T')[0];
  };

  const handleBook = () => {
    if (!selectedDay || !selectedTime) return;
    bookSession({
      requesterId: currentUser.id,
      tutorId: tutor.id,
      offerId: selectedOffer?.id || null,
      subject: selectedOffer?.subject || `Session with ${tutor.name}`,
      date: getNextDate(selectedDay),
      time: selectedTime,
      duration: 60,
      mode,
      note,
    });
    setBooked(true);
  };

  if (booked) {
    return (
      <div className="max-w-lg mx-auto text-center py-20">
        <CheckCircle className="h-16 w-16 text-emerald-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Session Booked!</h2>
        <p className="text-gray-600 mb-6">
          Your session with <strong>{tutor.name}</strong> has been requested.
          You'll be notified once the tutor confirms.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link to="/my-sessions" className="btn-primary">View My Sessions</Link>
          <Link to="/browse" className="btn-secondary">Browse More Tutors</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link to={`/tutor/${tutor.id}`} className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900">
        <ArrowLeft className="h-4 w-4" /> Back to {tutor.name}'s Profile
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-gray-900">Book a Session</h1>
        <p className="text-gray-600">
          with {tutor.name}
          {selectedOffer && ` - ${selectedOffer.subject}`}
        </p>
      </div>

      <div className="card space-y-5">
        {/* Day Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Select a Day</label>
          <div className="flex flex-wrap gap-2">
            {weekDays.map((day) => {
              const slots = tutor.availability[day] || [];
              const available = slots.length > 0;
              return (
                <button
                  key={day}
                  type="button"
                  disabled={!available}
                  onClick={() => { setSelectedDay(day); setSelectedTime(''); }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                    selectedDay === day
                      ? 'bg-indigo-600 text-white'
                      : available
                        ? 'bg-gray-100 text-gray-700 hover:bg-indigo-50'
                        : 'bg-gray-50 text-gray-300 cursor-not-allowed'
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        {/* Time Slot Selection */}
        {selectedDay && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select a Time Slot</label>
            {availableSlots.length === 0 ? (
              <p className="text-sm text-gray-500">No slots available on this day.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {availableSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedTime(slot)}
                    className={`px-4 py-2 rounded-lg text-sm font-mono transition-colors ${
                      selectedTime === slot
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-indigo-50'
                    }`}
                  >
                    <Clock className="h-4 w-4 inline mr-1" />
                    {slot}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Mode */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Session Mode</label>
          <div className="flex gap-3">
            {['Online', 'On-Campus'].map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  mode === m ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-indigo-50'
                }`}
              >
                {m === 'Online' ? <Monitor className="h-4 w-4" /> : <MapPin className="h-4 w-4" />}
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Note */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Note (optional)</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
            className="input-field"
            placeholder="Any specific topics or questions for the session..."
          />
        </div>

        <button
          onClick={handleBook}
          disabled={!selectedDay || !selectedTime}
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          <Calendar className="h-5 w-5" /> Confirm Booking
        </button>
      </div>
    </div>
  );
}
