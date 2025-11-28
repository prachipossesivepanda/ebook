import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Login = () => {
  const [searchParams] = useSearchParams();
  const roleFromUrl = searchParams.get('role') || 'super_admin';
  const isSubAdmin = roleFromUrl === 'sub_admin';
  
  const [formData, setFormData] = useState({
    email: isSubAdmin ? 'subadmin@gmail.com' : 'admin@gmail.com',
    password: '',
    role: isSubAdmin ? 'sub_admin' : 'super_admin'
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Update email when role changes
  useEffect(() => {
    if (formData.role === 'super_admin') {
      setFormData(prev => ({ ...prev, email: 'admin@gmail.com' }));
    } else if (formData.role === 'sub_admin') {
      setFormData(prev => ({ ...prev, email: 'subadmin@gmail.com' }));
    }
  }, [formData.role]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validate email matches role
    const expectedEmail = formData.role === 'super_admin' ? 'admin@gmail.com' : 'subadmin@gmail.com';
    
    if (formData.email !== expectedEmail) {
      setError(`Email must be ${expectedEmail} for ${formData.role === 'super_admin' ? 'Super Admin' : 'Sub Admin'}`);
      return;
    }

    // Mock authentication - replace with actual API call
    if (formData.email && formData.password) {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userRole', formData.role);
      localStorage.setItem('userName', formData.email.split('@')[0]);
      localStorage.setItem('userEmail', formData.email);
      navigate('/admin/dashboard');
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
              <option value="super_admin">Super Admin (admin@gmail.com)</option>
              <option value="sub_admin">Sub Admin (subadmin@gmail.com)</option>
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
          <p className="font-semibold mb-1">Login Credentials:</p>
          <p>Super Admin: admin@gmail.com</p>
          <p>Sub Admin: subadmin@gmail.com</p>
          <p className="text-xs text-gray-500 mt-2">Password: Any password (demo mode)</p>
        </div>
      </div>
    </div>
  );
};

export default Login;

