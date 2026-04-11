// src/data/mockData.js

export const tutors = [
  {
    id: 1, name: "Sarah Chen", initials: "SC", email: "sarah.chen@university.edu",
    subject: "Calculus II & Advanced Mathematics", rating: 4.8, sessions: 45,
    reviews: 45, hoursTutored: 67.5, pricing: "Free (Skill Exchange)",
    tags: ["Math", "Calculus", "Engineering", "Linear Algebra"],
    verified: true, role: "Tutor", status: "Active", joinDate: "Jan 15, 2026",
    bio: "Junior mathematics major with a passion for helping students understand complex calculus concepts. I've been tutoring for 2 years and specialize in Calc I-III, Linear Algebra, and Differential Equations.",
    availability: {
      Monday: ["2:00 PM", "4:00 PM"],
      Wednesday: ["2:00 PM", "3:00 PM", "5:00 PM"],
      Friday: ["1:00 PM", "3:00 PM"]
    },
    sessionModes: ["Online", "On-Campus"],
    offers: [
      { id: 1, title: "Calculus II - Derivatives & Integrals", level: "Intermediate", description: "Comprehensive tutoring for Calc II covering differentiation, integration, and applications.", tags: ["Math", "Calculus"], status: "Active", sessions: 12, pendingRequests: 3 },
      { id: 2, title: "Linear Algebra Fundamentals", level: "Beginner", description: "Learn vectors, matrices, linear transformations, and eigenvalues.", tags: ["Math", "Linear Algebra"], status: "Active", sessions: 12, pendingRequests: 3 },
      { id: 3, title: "Differential Equations", level: "Advanced", description: "Advanced DE topics including first and second-order equations, Laplace transforms.", tags: ["Math", "Engineering"], status: "Draft", sessions: 0, pendingRequests: 0 }
    ],
    reviewsList: [
      { id: 1, name: "John D.", initial: "J", date: "Feb 28, 2026", rating: 5, comment: "Excellent tutor! Really helped me understand integration techniques." },
      { id: 2, name: "Maria S.", initial: "M", date: "Feb 25, 2026", rating: 5, comment: "Very patient and explains concepts clearly. Highly recommend!" },
      { id: 3, name: "Alex K.", initial: "A", date: "Feb 20, 2026", rating: 4, comment: "Great session, helped me prepare for my exam." }
    ],
    badges: ["Top Rated", "Consistent", "Verified"]
  },
  {
    id: 2, name: "Marcus Johnson", initials: "MJ", email: "m.johnson@university.edu",
    subject: "Python Programming", rating: 4.9, sessions: 62,
    reviews: 58, hoursTutored: 93.0, pricing: "Free (Skill Exchange)",
    tags: ["CS", "Web Dev", "Python"],
    verified: true, role: "Tutor", status: "Active", joinDate: "Dec 20, 2025",
    bio: "Senior CS student specializing in Python and web development. I love breaking down complex programming concepts into simple, digestible lessons.",
    availability: {
      Tuesday: ["10:00 AM", "2:00 PM"],
      Thursday: ["3:00 PM", "5:00 PM"],
      Saturday: ["10:00 AM", "12:00 PM"]
    },
    sessionModes: ["Online"],
    offers: [
      { id: 4, title: "Python Programming Fundamentals", level: "Beginner", description: "Learn Python from scratch - variables, loops, functions, and OOP.", tags: ["CS", "Python"], status: "Active", sessions: 30, pendingRequests: 5 },
      { id: 5, title: "Web Development with Flask", level: "Intermediate", description: "Build web apps using Python Flask framework.", tags: ["CS", "Web Dev"], status: "Active", sessions: 20, pendingRequests: 2 }
    ],
    reviewsList: [
      { id: 4, name: "Lisa W.", initial: "L", date: "Mar 1, 2026", rating: 5, comment: "Marcus is an amazing tutor. Explains everything so clearly!" },
      { id: 5, name: "Tom R.", initial: "T", date: "Feb 22, 2026", rating: 5, comment: "Best Python tutor on campus!" }
    ],
    badges: ["Top Rated", "Verified", "50 Sessions"]
  },
  {
    id: 3, name: "Emily Rodriguez", initials: "ER", email: "emily.r@university.edu",
    subject: "Organic Chemistry", rating: 4.7, sessions: 38,
    reviews: 35, hoursTutored: 57.0, pricing: "Free (Skill Exchange)",
    tags: ["Chemistry", "PreMed"],
    verified: false, role: "Both", status: "Active", joinDate: "Jan 8, 2026",
    bio: "Pre-med junior with strong background in chemistry. I make complex organic reactions approachable and understandable.",
    availability: {
      Monday: ["1:00 PM", "3:00 PM"],
      Wednesday: ["4:00 PM"],
      Friday: ["2:00 PM", "4:00 PM"]
    },
    sessionModes: ["Online", "On-Campus"],
    offers: [
      { id: 6, title: "Organic Chemistry I", level: "Intermediate", description: "Master reaction mechanisms, stereochemistry, and functional groups.", tags: ["Chemistry", "PreMed"], status: "Active", sessions: 20, pendingRequests: 1 }
    ],
    reviewsList: [],
    badges: ["Consistent"]
  },
  {
    id: 4, name: "Lisa Wang", initials: "LW", email: "lisa.w@university.edu",
    subject: "Data Structures & Algorithms", rating: 4.9, sessions: 71,
    reviews: 68, hoursTutored: 106.5, pricing: "Free (Skill Exchange)",
    tags: ["CS", "Algorithms"],
    verified: true, role: "Requester", status: "Active", joinDate: "Feb 18, 2026",
    bio: "CS grad student with expertise in algorithms and competitive programming.",
    availability: {
      Monday: ["6:00 PM", "7:00 PM"],
      Thursday: ["6:00 PM", "8:00 PM"]
    },
    sessionModes: ["Online"],
    offers: [
      { id: 7, title: "Data Structures", level: "Intermediate", description: "Arrays, linked lists, trees, graphs and their implementations.", tags: ["CS", "Algorithms"], status: "Active", sessions: 35, pendingRequests: 4 }
    ],
    reviewsList: [],
    badges: ["Top Rated", "Verified", "50 Sessions"]
  },
  {
    id: 5, name: "David Kim", initials: "DK", email: "d.kim@university.edu",
    subject: "Economics 101", rating: 4.6, sessions: 29,
    reviews: 25, hoursTutored: 43.5, pricing: "Free (Skill Exchange)",
    tags: ["Economics", "Business"],
    verified: false, role: "Tutor", status: "Suspended", joinDate: "Nov 12, 2025",
    bio: "Economics major focusing on micro and macroeconomics.",
    availability: {},
    sessionModes: ["On-Campus"],
    offers: [],
    reviewsList: [],
    badges: []
  },
  {
    id: 6, name: "Alex Martinez", initials: "AM", email: "alex.m@university.edu",
    subject: "Spanish Literature", rating: 4.5, sessions: 22,
    reviews: 20, hoursTutored: 33.0, pricing: "Free (Skill Exchange)",
    tags: ["Spanish", "Writing"],
    verified: false, role: "Tutor", status: "Active", joinDate: "Feb 1, 2026",
    bio: "Spanish literature enthusiast helping students with reading comprehension and writing.",
    availability: {
      Tuesday: ["2:00 PM", "4:00 PM"],
      Friday: ["3:00 PM"]
    },
    sessionModes: ["Online", "On-Campus"],
    offers: [
      { id: 8, title: "Spanish Literature Analysis", level: "Intermediate", description: "Deep dive into Spanish literary works and writing techniques.", tags: ["Spanish", "Writing"], status: "Active", sessions: 10, pendingRequests: 0 }
    ],
    reviewsList: [],
    badges: []
  }
];

export const currentStudent = {
  id: 10, name: "Student User", initials: "U", email: "student@university.edu",
  role: "Requester", totalSessions: 12, hoursLearned: 18.5, activeRequests: 2
};

export const currentTutor = {
  id: 11, name: "Tutor User", initials: "U", email: "tutor@university.edu",
  role: "Tutor", rating: 4.8, totalSessions: 45, totalReviews: 38, hoursTutored: 67.5,
  badges: ["Top Rated", "Consistent", "Verified"]
};

export const upcomingSessions = [
  { id: 1, subject: "Calculus II", tutor: "Sarah Chen", initials: "SC", date: "Mar 3, 2026 at 2:00 PM", mode: "Online" },
  { id: 2, subject: "Python Programming", tutor: "Marcus Johnson", initials: "MJ", date: "Mar 5, 2026 at 4:30 PM", mode: "On-Campus" }
];

export const pastSessions = [
  { id: 3, subject: "Linear Algebra", tutor: "Sarah Chen", initials: "SC", date: "Feb 20, 2026 at 2:00 PM", mode: "Online", rating: 5 },
  { id: 4, subject: "Python Basics", tutor: "Marcus Johnson", initials: "MJ", date: "Feb 15, 2026 at 3:00 PM", mode: "Online", rating: 5 },
  { id: 5, subject: "Organic Chemistry", tutor: "Emily Rodriguez", initials: "ER", date: "Feb 10, 2026 at 1:00 PM", mode: "On-Campus", rating: 4 }
];

export const cancelledSessions = [
  { id: 6, subject: "Data Structures", tutor: "Lisa Wang", initials: "LW", date: "Feb 5, 2026 at 4:00 PM", mode: "Online" }
];

export const tutorPendingRequests = [
  { id: 1, requester: "John Doe", initials: "JD", subject: "Calculus II - Integration", date: "Mar 3, 2026 at 2:00 PM", mode: "Online" },
  { id: 2, requester: "Maria Santos", initials: "MS", subject: "Linear Algebra", date: "Mar 4, 2026 at 3:30 PM", mode: "On-Campus" },
  { id: 3, requester: "Alex Kim", initials: "AK", subject: "Differential Equations", date: "Mar 5, 2026 at 1:00 PM", mode: "Online" }
];

export const tutorUpcomingSessions = [
  { id: 1, subject: "Calculus II", requester: "Emily Chen", initials: "EC", date: "Mar 2, 2026 at 4:00 PM" },
  { id: 2, subject: "Linear Algebra", requester: "David Wilson", initials: "DW", date: "Mar 3, 2026 at 10:00 AM" }
];

export const messages = [
  {
    id: 1, name: "Sarah Chen", initials: "SC", lastMessage: "Thanks for the session!", time: "2:30 PM", unread: 0,
    chat: [
      { from: "them", text: "Hi! I'm looking forward to our session on Calculus.", time: "2:15 PM" },
      { from: "me", text: "Great! I've prepared some materials for you. We'll focus on integration techniques.", time: "2:18 PM" },
      { from: "them", text: "Perfect! Should I bring anything specific?", time: "2:20 PM" },
      { from: "me", text: "Just your textbook and any homework problems you're stuck on.", time: "2:25 PM" },
      { from: "them", text: "Thanks for the session! Really helped me understand the concepts.", time: "2:30 PM" }
    ]
  },
  {
    id: 2, name: "Marcus Johnson", initials: "MJ", lastMessage: "Can we reschedule to 4pm?", time: "1:15 PM", unread: 2,
    chat: [
      { from: "them", text: "Hey, can we reschedule to 4pm?", time: "1:15 PM" }
    ]
  },
  {
    id: 3, name: "Emily Rodriguez", initials: "ER", lastMessage: "Got it, see you tomorrow", time: "Yesterday", unread: 0,
    chat: [
      { from: "me", text: "See you tomorrow for the chemistry session!", time: "Yesterday" },
      { from: "them", text: "Got it, see you tomorrow", time: "Yesterday" }
    ]
  },
  {
    id: 4, name: "David Kim", initials: "DK", lastMessage: "What chapters should I review?", time: "Yesterday", unread: 1,
    chat: [
      { from: "them", text: "What chapters should I review for our session?", time: "Yesterday" }
    ]
  }
];

export const adminStats = {
  totalUsers: 2847, activeSessions: 156, newSignups: 89, avgRating: 4.7,
  requesters: 1823, tutorsCount: 1024, bothRoles: 427,
  pendingVerifications: 12, pendingReports: 3, pendingAppeals: 5
};

export const adminRecentActivity = [
  { id: 1, name: "John Doe", action: "Signed up as Requester", time: "5 minutes ago" },
  { id: 2, name: "Sarah Chen", action: "Completed session with Emily R.", time: "12 minutes ago" },
  { id: 3, name: "Marcus Johnson", action: "Submitted tutor verification", time: "1 hour ago" },
  { id: 4, name: "Admin", action: "Report filed for user behavior", time: "2 hours ago" }
];

export const verificationQueue = [
  {
    id: 1, name: "Alex Martinez", initials: "AM", email: "alex.m@university.edu",
    subject: "Spanish Literature", submittedDate: "Feb 28, 2026", gpa: 3.8,
    courses: ["SPAN 301", "SPAN 402", "LIT 350"],
    credentials: ["Student ID Verification", "Course Transcript", "Reference Letter"]
  },
  {
    id: 2, name: "Jordan Lee", initials: "JL", email: "j.lee@university.edu",
    subject: "Computer Science", submittedDate: "Feb 27, 2026", gpa: 3.9,
    courses: ["CS 201", "CS 301", "CS 450"],
    credentials: ["Student ID Verification", "Portfolio Link", "GitHub Profile"]
  },
  {
    id: 3, name: "Taylor Brown", initials: "TB", email: "taylor.b@university.edu",
    subject: "Organic Chemistry", submittedDate: "Feb 26, 2026", gpa: 3.7,
    courses: ["CHEM 302", "CHEM 401", "CHEM 404"],
    credentials: ["Student ID Verification", "Lab Experience", "TA Recommendation"]
  }
];

export const reports = [
  { id: 1, type: "Inappropriate Content", severity: "HIGH", status: "PENDING", reportedUser: "Alex Martinez", contentType: "Session Review", reason: "Contains offensive language and inappropriate comments", reportedBy: "John Doe", date: "Mar 1, 2026" },
  { id: 2, type: "Spam", severity: "MEDIUM", status: "PENDING", reportedUser: "Mike Johnson", contentType: "Help Request", reason: "Posting duplicate requests multiple times", reportedBy: "Sarah Chen", date: "Feb 29, 2026" },
  { id: 3, type: "Harassment", severity: "HIGH", status: "PENDING", reportedUser: "David Kim", contentType: "Private Message", reason: "Unwanted repeated messages after being asked to stop", reportedBy: "Emily Rodriguez", date: "Feb 28, 2026" },
  { id: 4, type: "Fake Profile", severity: "LOW", status: "RESOLVED", reportedUser: "Lisa Wang", contentType: "Tutor Profile", reason: "Profile appears to be using stolen credentials", reportedBy: "Marcus Johnson", date: "Feb 27, 2026" },
  { id: 5, type: "No Show", severity: "MEDIUM", status: "RESOLVED", reportedUser: "Chris Lee", contentType: "Session", reason: "Tutor did not show up for scheduled session", reportedBy: "Alex Kim", date: "Feb 26, 2026" }
];

export const allAdminUsers = [
  { id: 1, name: "Sarah Chen", initials: "SC", email: "sarah.chen@university.edu", role: "Tutor", status: "Active", joinDate: "Jan 15, 2026", sessions: 45 },
  { id: 2, name: "John Doe", initials: "JD", email: "john.doe@university.edu", role: "Requester", status: "Active", joinDate: "Feb 3, 2026", sessions: 12 },
  { id: 3, name: "Marcus Johnson", initials: "MJ", email: "m.johnson@university.edu", role: "Tutor", status: "Active", joinDate: "Dec 20, 2025", sessions: 62 },
  { id: 4, name: "Emily Rodriguez", initials: "ER", email: "emily.r@university.edu", role: "Both", status: "Active", joinDate: "Jan 8, 2026", sessions: 38 },
  { id: 5, name: "David Kim", initials: "DK", email: "d.kim@university.edu", role: "Tutor", status: "Suspended", joinDate: "Nov 12, 2025", sessions: 29 },
  { id: 6, name: "Lisa Wang", initials: "LW", email: "lisa.w@university.edu", role: "Requester", status: "Active", joinDate: "Feb 18, 2026", sessions: 8 }
];
