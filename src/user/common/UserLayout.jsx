import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const UserLayout = ({ children }) => {
  const [cartCount] = useState(3); // Mock cart count
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('userAuthenticated') === 'true';
  const userName = localStorage.getItem('userName') || 'User';

  const handleLogout = () => {
    localStorage.removeItem('userAuthenticated');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center">
                <span className="text-white font-semibold text-lg">E</span>
              </div>
              <span className="text-xl font-semibold text-gray-900">E-Book Store</span>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link
                to="/"
                className={`text-sm font-medium transition-colors ${
                  location.pathname === '/' ? 'text-slate-900' : 'text-gray-600 hover:text-slate-900'
                }`}
              >
                Home
              </Link>
              <Link
                to="/books"
                className={`text-sm font-medium transition-colors ${
                  location.pathname === '/books' ? 'text-slate-900' : 'text-gray-600 hover:text-slate-900'
                }`}
              >
                Browse Books
              </Link>
              <Link
                to="/orders"
                className={`text-sm font-medium transition-colors ${
                  location.pathname === '/orders' ? 'text-slate-900' : 'text-gray-600 hover:text-slate-900'
                }`}
              >
                My Orders
              </Link>
              <Link
                to="/my-ebooks"
                className={`text-sm font-medium transition-colors ${
                  location.pathname === '/my-ebooks' ? 'text-slate-900' : 'text-gray-600 hover:text-slate-900'
                }`}
              >
                My Ebooks
              </Link>
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              {/* Cart */}
              <Link
                to="/cart"
                className="relative p-2 text-gray-600 hover:text-slate-900 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 w-5 h-5 bg-slate-900 text-white text-xs font-semibold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* User Menu */}
              {isAuthenticated ? (
                <div className="flex items-center gap-3">
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-slate-900 transition-colors"
                  >
                    <div className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center text-white font-medium text-sm">
                      {userName.charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden sm:block font-medium">{userName}</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-slate-900 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-slate-900 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 text-sm font-medium transition-colors"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
                  <span className="text-white font-semibold">E</span>
                </div>
                <span className="text-lg font-semibold text-gray-900">E-Book Store</span>
              </div>
              <p className="text-sm text-gray-600">
                Your one-stop destination for digital books from multiple universities.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link to="/books" className="hover:text-slate-900 transition-colors">Browse Books</Link></li>
                <li><Link to="/orders" className="hover:text-slate-900 transition-colors">My Orders</Link></li>
                <li><Link to="/my-ebooks" className="hover:text-slate-900 transition-colors">My Ebooks</Link></li>
                <li><Link to="/profile" className="hover:text-slate-900 transition-colors">My Profile</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-slate-900 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-slate-900 transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-slate-900 transition-colors">FAQs</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-slate-900 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-slate-900 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-slate-900 transition-colors">Refund Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
            <p>&copy; 2024 E-Book Store. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UserLayout;

