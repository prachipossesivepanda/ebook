import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RoleSelection = () => {
  const [selectedRole, setSelectedRole] = useState('');
  const navigate = useNavigate();

  const handleContinue = () => {
    if (!selectedRole) {
      alert('Please select a role');
      return;
    }

    if (selectedRole === 'user') {
      navigate('/books');
    } else if (selectedRole === 'admin') {
      navigate('/admin/login?role=super_admin');
    } else if (selectedRole === 'sub_admin') {
      navigate('/admin/login?role=sub_admin');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-xl font-semibold">E</span>
            </div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-1">Choose Your Role</h1>
            <p className="text-gray-600 text-sm">Select how you want to access the platform</p>
          </div>

          <div className="space-y-4 mb-6">
            <button
              onClick={() => setSelectedRole('user')}
              className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
                selectedRole === 'user'
                  ? 'border-slate-900 bg-slate-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    selectedRole === 'user' ? 'bg-slate-900' : 'bg-gray-100'
                  }`}>
                    <svg className={`w-6 h-6 ${selectedRole === 'user' ? 'text-white' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">User</h3>
                    <p className="text-sm text-gray-600">Browse and purchase books</p>
                  </div>
                </div>
                {selectedRole === 'user' && (
                  <svg className="w-5 h-5 text-slate-900" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </button>

            <button
              onClick={() => setSelectedRole('admin')}
              className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
                selectedRole === 'admin'
                  ? 'border-slate-900 bg-slate-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    selectedRole === 'admin' ? 'bg-slate-900' : 'bg-gray-100'
                  }`}>
                    <svg className={`w-6 h-6 ${selectedRole === 'admin' ? 'text-white' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Super Admin</h3>
                    <p className="text-sm text-gray-600">Full platform management access</p>
                  </div>
                </div>
                {selectedRole === 'admin' && (
                  <svg className="w-5 h-5 text-slate-900" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </button>

            <button
              onClick={() => setSelectedRole('sub_admin')}
              className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
                selectedRole === 'sub_admin'
                  ? 'border-slate-900 bg-slate-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    selectedRole === 'sub_admin' ? 'bg-slate-900' : 'bg-gray-100'
                  }`}>
                    <svg className={`w-6 h-6 ${selectedRole === 'sub_admin' ? 'text-white' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Sub Admin</h3>
                    <p className="text-sm text-gray-600">Limited management access</p>
                  </div>
                </div>
                {selectedRole === 'sub_admin' && (
                  <svg className="w-5 h-5 text-slate-900" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </button>
          </div>

          <button
            onClick={handleContinue}
            className="w-full bg-slate-900 text-white py-3 rounded-lg font-medium hover:bg-slate-800 transition-colors"
          >
            Continue
          </button>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/login')}
                className="font-medium text-slate-600 hover:text-slate-900"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;

