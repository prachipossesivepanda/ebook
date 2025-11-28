import { getStoredSession } from '../utils/session';
import { ROLES, ROLE_GROUPS } from '../constants/roles';

export const useRoleContext = () => {
  const session = getStoredSession();
  const role = session?.role || ROLES.OWNER;

  const isOwner = role === ROLES.OWNER;
  const isPlatformSubadmin = role === ROLES.PLATFORM_SUBADMIN;
  const isOwnerTeam = ROLE_GROUPS.ownerTeam.includes(role);
  const isUniversityAdmin = role === ROLES.UNIVERSITY_ADMIN;
  const isUniversitySubadmin = role === ROLES.UNIVERSITY_SUBADMIN;
  const isUniversityTeam = ROLE_GROUPS.universityTeam.includes(role);

  // Support both new scope structure and legacy top-level vendor fields
  const universityId = session?.scope?.universityId || session?.universityId || session?.scope?.vendorId || session?.vendorId || null;
  const universityName = session?.scope?.universityName || session?.universityName || session?.scope?.vendorName || session?.vendorName || null;

  return {
    session,
    role,
    universityId,
    universityName,
    // Legacy aliases
    vendorId: universityId,
    vendorName: universityName,
    isVendorAdmin: isUniversityAdmin,
    isVendorSubadmin: isUniversitySubadmin,
    isVendorTeam: isUniversityTeam,
    isOwner,
    isPlatformSubadmin,
    isOwnerTeam,
    isUniversityAdmin,
    isUniversitySubadmin,
    isUniversityTeam,
  };
};

