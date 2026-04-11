import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getTutors } from '../../data/users';
import { useApp } from '../../context/AppContext';
import { allTags, sessionModes } from '../../data/tags';
import SearchBar from '../../components/common/SearchBar';
import StarRating from '../../components/common/StarRating';
import EmptyState from '../../components/common/EmptyState';
import { Filter, MapPin, Monitor, Star, BadgeCheck, X, SlidersHorizontal } from 'lucide-react';

export default function BrowseTutorsPage() {
  const { offers } = useApp();
  const [search, setSearch] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [modeFilter, setModeFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const tutors = getTutors();

  const filtered = useMemo(() => {
    return tutors.filter((tutor) => {
      const matchSearch =
        !search ||
        tutor.name.toLowerCase().includes(search.toLowerCase()) ||
        tutor.skills.some((s) => s.toLowerCase().includes(search.toLowerCase())) ||
        tutor.courses.some((c) => c.toLowerCase().includes(search.toLowerCase()));

      const matchTags =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => tutor.skills.includes(tag));

      const matchRating = tutor.rating >= minRating;

      const tutorOffers = offers.filter((o) => o.tutorId === tutor.id && o.active);
      const matchMode =
        !modeFilter ||
        tutorOffers.some((o) => o.mode === modeFilter || o.mode === 'Both');

      return matchSearch && matchTags && matchRating && matchMode;
    });
  }, [tutors, search, selectedTags, minRating, modeFilter, offers]);

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearch('');
    setSelectedTags([]);
    setMinRating(0);
    setModeFilter('');
  };

  const hasFilters = search || selectedTags.length > 0 || minRating > 0 || modeFilter;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Browse Tutors</h1>
        <p className="text-gray-600">Find the right tutor for your needs</p>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <SearchBar value={search} onChange={setSearch} placeholder="Search by name, skill, or course..." />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`btn-secondary flex items-center gap-2 ${showFilters ? 'bg-indigo-50 border-indigo-300' : ''}`}
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
          {hasFilters && <span className="badge-primary text-[10px]">{selectedTags.length + (minRating > 0 ? 1 : 0) + (modeFilter ? 1 : 0)}</span>}
        </button>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="card space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-gray-900">Filters</h3>
            {hasFilters && (
              <button onClick={clearFilters} className="text-sm text-red-600 hover:text-red-500 flex items-center gap-1">
                <X className="h-4 w-4" /> Clear all
              </button>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Skill Tags</label>
            <div className="flex flex-wrap gap-2">
              {allTags.slice(0, 15).map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    selectedTags.includes(tag)
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Minimum Rating</label>
              <select value={minRating} onChange={(e) => setMinRating(Number(e.target.value))} className="input-field">
                <option value={0}>Any rating</option>
                <option value={3}>3+ stars</option>
                <option value={4}>4+ stars</option>
                <option value={4.5}>4.5+ stars</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Session Mode</label>
              <select value={modeFilter} onChange={(e) => setModeFilter(e.target.value)} className="input-field">
                <option value="">Any mode</option>
                {sessionModes.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      <p className="text-sm text-gray-500">{filtered.length} tutor{filtered.length !== 1 ? 's' : ''} found</p>

      {filtered.length === 0 ? (
        <EmptyState
          icon={Filter}
          title="No tutors found"
          message="Try adjusting your search or filters to find more tutors."
          action={hasFilters && <button onClick={clearFilters} className="btn-primary text-sm">Clear Filters</button>}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((tutor) => {
            const tutorOffers = offers.filter((o) => o.tutorId === tutor.id && o.active);
            return (
              <Link key={tutor.id} to={`/tutor/${tutor.id}`} className="card hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3 mb-3">
                  <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                    <span className="text-lg font-semibold text-indigo-600">{tutor.name.charAt(0)}</span>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900 truncate">{tutor.name}</h3>
                      {tutor.verified && <BadgeCheck className="h-4 w-4 text-indigo-600 shrink-0" />}
                    </div>
                    <div className="flex items-center gap-1">
                      <StarRating rating={Math.round(tutor.rating)} readonly size="sm" />
                      <span className="text-xs text-gray-500">{tutor.rating} ({tutor.reviewCount})</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2 mb-3">{tutor.bio}</p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {tutor.skills.slice(0, 4).map((skill) => (
                    <span key={skill} className="badge-primary text-[10px]">{skill}</span>
                  ))}
                  {tutor.skills.length > 4 && (
                    <span className="badge text-[10px] bg-gray-100 text-gray-500">+{tutor.skills.length - 4}</span>
                  )}
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
                  <span>{tutorOffers.length} offer{tutorOffers.length !== 1 ? 's' : ''}</span>
                  <span>{tutor.sessionsCompleted} sessions</span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
