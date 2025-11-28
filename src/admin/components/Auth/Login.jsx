import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ROLES } from '../../constants/roles';
import { saveSession } from '../../utils/session';
import { getRoleBasePath } from '../../utils/navigation';

const normalizeRole = (roleParam) => {
  switch (roleParam) {
    case 'super_admin':
      return ROLES.OWNER;
    case 'sub_admin':
      return ROLES.PLATFORM_SUBADMIN;
    case 'vendor_admin':
    case 'vendor':
      return ROLES.UNIVERSITY_ADMIN;
    case 'vendor_subadmin':
      return ROLES.UNIVERSITY_SUBADMIN;
    case ROLES.OWNER:
    case ROLES.PLATFORM_SUBADMIN:
    case ROLES.UNIVERSITY_ADMIN:
    case ROLES.UNIVERSITY_SUBADMIN:
      return roleParam;
    default:
      return ROLES.OWNER;
  }
};

const Login = () => {
  const [searchParams] = useSearchParams();
  const roleFromUrl = normalizeRole(searchParams.get('role') || ROLES.OWNER);
  
  const roleEmailMap = {
    [ROLES.OWNER]: 'owner@ebook.com',
    [ROLES.PLATFORM_SUBADMIN]: 'subadmin@ebook.com',
    [ROLES.UNIVERSITY_ADMIN]: 'university@campushub.com',
    [ROLES.UNIVERSITY_SUBADMIN]: 'university_sub@campushub.com',
  };

  const [formData, setFormData] = useState({
    email: roleEmailMap[roleFromUrl] || roleEmailMap[ROLES.OWNER],
    password: '',
    role: roleFromUrl,
    vendorId: roleFromUrl === ROLES.UNIVERSITY_ADMIN || roleFromUrl === ROLES.UNIVERSITY_SUBADMIN ? 'UNI-001' : null,
    vendorName: roleFromUrl === ROLES.UNIVERSITY_ADMIN || roleFromUrl === ROLES.UNIVERSITY_SUBADMIN ? 'CampusHub University' : null,
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Update email when role changes
  useEffect(() => {
    const normalizedRole = normalizeRole(formData.role);
    const email = roleEmailMap[normalizedRole] || roleEmailMap[ROLES.OWNER];
    const vendorId = (normalizedRole === ROLES.UNIVERSITY_ADMIN || normalizedRole === ROLES.UNIVERSITY_SUBADMIN) ? 'UNI-001' : null;
    const vendorName = (normalizedRole === ROLES.UNIVERSITY_ADMIN || normalizedRole === ROLES.UNIVERSITY_SUBADMIN) ? 'CampusHub University' : null;
    setFormData(prev => ({
      ...prev,
      role: normalizedRole,
      email,
      vendorId,
      vendorName,
    }));
  }, [formData.role]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validate email matches role
    const expectedEmail = roleEmailMap[formData.role] || roleEmailMap[ROLES.OWNER];
    
    if (formData.email !== expectedEmail) {
      setError(`Email must be ${expectedEmail} for this role`);
      return;
    }

    // Mock authentication - replace with actual API call
    if (formData.email && formData.password) {
      const session = {
        isAuthenticated: true,
        role: formData.role,
        user: {
          name: formData.email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          email: formData.email,
        },
        scope: formData.vendorId ? {
          vendorId: formData.vendorId,
          vendorName: formData.vendorName,
        } : null,
        // Legacy support - also store at top level for backward compatibility
        vendorId: formData.vendorId,
        vendorName: formData.vendorName,
      };
      
      saveSession(session);
      const basePath = getRoleBasePath(formData.role);
      navigate(`${basePath}/dashboard`);
    } else {
      setError('Please fill in all fields');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-xl font-semibold">E</span>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">Admin Login</h1>
          <p className="text-gray-600 text-sm">Multi-Vendor Book Portal</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              readOnly
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed outline-none transition"
            />
            <p className="text-xs text-gray-500 mt-1">
              Email is automatically set based on your role
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="Enter your password"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Role
            </label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            >
              <option value={ROLES.OWNER}>Owner (owner@ebook.com)</option>
              <option value={ROLES.PLATFORM_SUBADMIN}>Platform Sub Admin (subadmin@ebook.com)</option>
              <option value={ROLES.UNIVERSITY_ADMIN}>University Admin (university@campushub.com)</option>
              <option value={ROLES.UNIVERSITY_SUBADMIN}>University Sub Admin (university_sub@campushub.com)</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              Select your role to automatically set the email
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-slate-900 text-white py-3 rounded-lg font-medium hover:bg-slate-800 transition-colors"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p className="font-semibold mb-1">Login Credentials (Demo):</p>
          <p>Owner: owner@ebook.com</p>
          <p>Platform Sub Admin: subadmin@ebook.com</p>
          <p>University Admin: university@campushub.com</p>
          <p>University Sub Admin: university_sub@campushub.com</p>
          <p className="text-xs text-gray-500 mt-2">Password: Any password (demo mode)</p>
        </div>
      </div>
    </div>
  );
};

export default Login;

