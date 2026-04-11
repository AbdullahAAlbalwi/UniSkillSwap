import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import TimeSlotPicker from '../../components/common/TimeSlotPicker';
import { useApp } from '../../context/AppContext';
import { Clock, Save } from 'lucide-react';

export default function AvailabilityPage() {
  const { currentUser, updateProfile } = useAuth();
  const { addToast } = useApp();
  const [availability, setAvailability] = useState(currentUser.availability || {});
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateProfile({ availability });
    addToast('Availability updated successfully!');
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const totalSlots = Object.values(availability).reduce((sum, slots) => sum + slots.length, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Availability</h1>
          <p className="text-gray-600">Set when you're available for tutoring sessions</p>
        </div>
        <button onClick={handleSave} className="btn-primary flex items-center gap-2">
          <Save className="h-5 w-5" />
          {saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="h-5 w-5 text-indigo-600" />
          <span className="text-sm text-gray-600">
            Click on time slots to toggle availability. <strong>{totalSlots}</strong> slots selected.
          </span>
        </div>
        <TimeSlotPicker availability={availability} onChange={setAvailability} />
      </div>

      <div className="card bg-indigo-50 border-indigo-100">
        <h3 className="font-medium text-indigo-900 mb-2">Tips</h3>
        <ul className="text-sm text-indigo-700 space-y-1 list-disc list-inside">
          <li>Set realistic time slots that you can consistently maintain.</li>
          <li>Students will see your availability when booking sessions.</li>
          <li>You can update your availability at any time.</li>
        </ul>
      </div>
    </div>
  );
}
