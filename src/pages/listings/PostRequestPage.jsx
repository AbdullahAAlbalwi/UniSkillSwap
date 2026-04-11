import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { difficultyLevels, sessionModes } from '../../data/tags';
import TagSelector from '../../components/common/TagSelector';
import { Send } from 'lucide-react';

export default function PostRequestPage() {
  const { currentUser } = useAuth();
  const { addRequest } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    subject: '',
    description: '',
    tags: [],
    difficulty: 'Beginner',
    mode: 'Online',
    preferredTimes: '',
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.subject.trim()) errs.subject = 'Subject is required.';
    if (!form.description.trim()) errs.description = 'Description is required.';
    if (form.tags.length === 0) errs.tags = 'Select at least one tag.';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    addRequest({
      requesterId: currentUser.id,
      subject: form.subject,
      description: form.description,
      tags: form.tags,
      difficulty: form.difficulty,
      mode: form.mode,
      preferredTimes: form.preferredTimes.split(',').map((t) => t.trim()).filter(Boolean),
    });
    navigate('/my-requests');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Post a Help Request</h1>
        <p className="text-gray-600">Describe what you need help with and find the right tutor.</p>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subject / Course *</label>
            <input
              type="text"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className={`input-field ${errors.subject ? 'border-red-300' : ''}`}
              placeholder="e.g., Need help with React hooks"
            />
            {errors.subject && <p className="text-red-600 text-xs mt-1">{errors.subject}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={4}
              className={`input-field ${errors.description ? 'border-red-300' : ''}`}
              placeholder="Describe what you need help with, specific topics, and any context..."
            />
            {errors.description && <p className="text-red-600 text-xs mt-1">{errors.description}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Skill Tags *</label>
            <TagSelector selected={form.tags} onChange={(tags) => setForm({ ...form, tags })} />
            {errors.tags && <p className="text-red-600 text-xs mt-1">{errors.tags}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty Level</label>
              <select
                value={form.difficulty}
                onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
                className="input-field"
              >
                {difficultyLevels.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Session Mode</label>
              <select
                value={form.mode}
                onChange={(e) => setForm({ ...form, mode: e.target.value })}
                className="input-field"
              >
                {sessionModes.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Time Slots</label>
            <input
              type="text"
              value={form.preferredTimes}
              onChange={(e) => setForm({ ...form, preferredTimes: e.target.value })}
              className="input-field"
              placeholder="e.g., Sunday 10:00, Tuesday 14:00"
            />
            <p className="text-xs text-gray-500 mt-1">Comma-separated list of preferred times</p>
          </div>

          <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
            <Send className="h-5 w-5" /> Post Request
          </button>
        </form>
      </div>
    </div>
  );
}
