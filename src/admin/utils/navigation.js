import { ROLES } from '../constants/roles';

export const getRoleBasePath = (role) => {
  if (role === ROLES.UNIVERSITY_ADMIN || role === ROLES.UNIVERSITY_SUBADMIN) {
    return '/vendor';
  }

  if (role === ROLES.PLATFORM_SUBADMIN) {
    return '/subadmin';
  }

  return '/owner';
};

export const buildRoleRoute = (role, path) => {
  const base = getRoleBasePath(role);
  return `${base}/${path.replace(/^\/+/, '')}`;
};

