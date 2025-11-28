export const ROLES = {
  OWNER: 'owner',
  PLATFORM_SUBADMIN: 'platform_subadmin',
  UNIVERSITY_ADMIN: 'university_admin',
  UNIVERSITY_SUBADMIN: 'university_subadmin',
  USER: 'user',
};

export const ROLE_LABELS = {
  [ROLES.OWNER]: 'Owner',
  [ROLES.PLATFORM_SUBADMIN]: 'Platform Subadmin',
  [ROLES.UNIVERSITY_ADMIN]: 'University Admin',
  [ROLES.UNIVERSITY_SUBADMIN]: 'University Subadmin',
  [ROLES.USER]: 'User',
};

export const ROLE_GROUPS = {
  ownerTeam: [ROLES.OWNER, ROLES.PLATFORM_SUBADMIN],
  universityTeam: [ROLES.UNIVERSITY_ADMIN, ROLES.UNIVERSITY_SUBADMIN],
};

export const SESSION_KEY = 'adminSession';

