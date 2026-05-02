const WEEKDAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

function capitalizeDay(key) {
  if (!key) return key;
  const lower = String(key).toLowerCase();
  return lower.charAt(0).toUpperCase() + lower.slice(1);
}

/** Browse grid card — aligns API tutor list item with BrowseTutors expectations */
export function adaptTutorListItem(t) {
  return {
    id: t.id,
    name: t.name,
    initials: t.initials || (t.name && t.name.charAt(0).toUpperCase()) || '?',
    subject: t.subject || '',
    rating: typeof t.rating === 'number' ? t.rating : 0,
    sessions: typeof t.sessionsCompleted === 'number' ? t.sessionsCompleted : 0,
    tags: Array.isArray(t.skills) ? t.skills : [],
    verified: !!t.verified,
    status: t.status === 'active' ? 'Active' : 'Inactive',
    sessionModes: Array.isArray(t.sessionModes) ? t.sessionModes : [],
  };
}

/** Tutor profile page — merges GET /tutors/:id payload with UI shape */
export function adaptTutorDetail({ tutor, offers, reviewsList }) {
  const rawAvail = tutor.availability || {};
  const availability = {};
  for (const day of WEEKDAYS) {
    const slots = rawAvail[day];
    if (Array.isArray(slots) && slots.length) {
      availability[capitalizeDay(day)] = slots;
    }
  }
  const offerRows = (offers || []).map((o) => ({
    id: o.id,
    title: o.title,
    level: o.level || '',
    description: o.description || '',
    tags: o.tags || [],
    status: o.status === 'archived' ? 'Draft' : 'Active',
  }));
  return {
    id: tutor.id,
    name: tutor.name,
    initials: tutor.initials || '',
    subject: tutor.subject || '',
    rating: typeof tutor.rating === 'number' ? tutor.rating : 0,
    reviews: typeof tutor.reviewCount === 'number' ? tutor.reviewCount : 0,
    sessions: typeof tutor.sessionsCompleted === 'number' ? tutor.sessionsCompleted : 0,
    pricing: tutor.pricing || 'Free (Skill Exchange)',
    tags: Array.isArray(tutor.skills) ? tutor.skills : [],
    verified: !!tutor.verified,
    bio: tutor.bio || '',
    availability,
    sessionModes: Array.isArray(tutor.sessionModes) ? tutor.sessionModes : [],
    offers: offerRows,
    reviewsList: (reviewsList || []).map((r) => ({
      id: r.id,
      name: r.name || 'User',
      initial: r.initial || (r.name && r.name.charAt(0)) || 'U',
      date: r.date ? new Date(r.date).toLocaleDateString() : '',
      rating: r.rating,
      comment: r.comment || '',
    })),
  };
}

/** Next YYYY-MM-DD for a weekday name (e.g. "Monday") for session booking */
export function nextDateForWeekdayName(displayDay) {
  const names = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const want = names.indexOf(String(displayDay).toLowerCase());
  if (want < 0) {
    const d = new Date();
    return d.toISOString().slice(0, 10);
  }
  const d = new Date();
  let add = (want - d.getDay() + 7) % 7;
  if (add === 0) add = 7;
  d.setDate(d.getDate() + add);
  return d.toISOString().slice(0, 10);
}
