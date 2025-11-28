import { ROLE_LABELS, ROLES, SESSION_KEY } from '../constants/roles';

const defaultSession = {
  isAuthenticated: false,
  role: ROLES.OWNER,
  scope: null,
  user: {
    name: 'Platform Owner',
    email: 'owner@example.com',
  },
};

export const getStoredSession = () => {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (error) {
    console.warn('Failed to parse session from storage', error);
  }

  const legacyRole = localStorage.getItem('userRole');
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  if (legacyRole) {
    return {
      ...defaultSession,
      isAuthenticated,
      role: legacyRole,
      user: {
        name: localStorage.getItem('userName') || defaultSession.user.name,
        email: localStorage.getItem('userEmail') || defaultSession.user.email,
      },
    };
  }

  return defaultSession;
};

export const persistSession = (session) => {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  if (session?.user?.name) {
    localStorage.setItem('userName', session.user.name);
  }
  if (session?.user?.email) {
    localStorage.setItem('userEmail', session.user.email);
  }
  localStorage.setItem('userRole', session.role);
  localStorage.setItem('isAuthenticated', session.isAuthenticated ? 'true' : 'false');
};

// Alias for consistency
export const saveSession = persistSession;

export const clearSession = () => {
  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem('isAuthenticated');
  localStorage.removeItem('userRole');
  localStorage.removeItem('userName');
  localStorage.removeItem('userEmail');
};

export const getRoleLabel = (role) => ROLE_LABELS[role] || ROLE_LABELS[ROLES.USER];

