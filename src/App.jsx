import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './admin/common/Layout';
import ProtectedRoute from './admin/Services/Protectedroutes';
import Login from './admin/components/Auth/Login';
import Otp from './admin/components/Auth/Otp';
import Dashboard from './admin/pages/Dashboard';
import Vendors from './admin/pages/Vendors';
import VendorOnboarding from './admin/pages/VendorOnboarding';
import KycVerification from './admin/pages/KycVerification';
import AdminOrders from './admin/pages/Orders';
import Analytics from './admin/pages/Analytics';
import Catalog from './admin/pages/Catalog';
import ContentApproval from './admin/pages/ContentApproval';
import Commission from './admin/pages/Commission';
import Subscription from './admin/pages/Subscription';
import SubAdmins from './admin/pages/SubAdmins';
import Settings from './admin/pages/Settings';
import Unauthorized from './admin/pages/Unauthorized';

// User components
import UserLayout from './user/common/UserLayout';
import UserProtectedRoute from './user/Services/UserProtectedRoute';
import Home from './user/pages/Home';
import BrowseBooks from './user/pages/BrowseBooks';
import BookDetails from './user/pages/BookDetails';
import Cart from './user/pages/Cart';
import Orders from './user/pages/Orders';
import Profile from './user/pages/Profile';
import UserLogin from './user/components/Auth/UserLogin';
import UserRegister from './user/components/Auth/UserRegister';
import RoleSelection from './user/components/RoleSelection';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/otp" element={<Otp />} />
        <Route path="/admin/unauthorized" element={<Unauthorized />} />

        {/* Protected Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={['super_admin', 'sub_admin']}>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/vendors"
          element={
            <ProtectedRoute allowedRoles={['super_admin', 'sub_admin']}>
              <Layout>
                <Vendors />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/vendor-onboarding"
          element={
            <ProtectedRoute allowedRoles={['super_admin']}>
              <Layout>
                <VendorOnboarding />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/kyc-verification"
          element={
            <ProtectedRoute allowedRoles={['super_admin']}>
              <Layout>
                <KycVerification />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute allowedRoles={['super_admin', 'sub_admin']}>
              <Layout>
                <AdminOrders />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/analytics"
          element={
            <ProtectedRoute allowedRoles={['super_admin']}>
              <Layout>
                <Analytics />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/catalog"
          element={
            <ProtectedRoute allowedRoles={['super_admin', 'sub_admin']}>
              <Layout>
                <Catalog />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/content-approval"
          element={
            <ProtectedRoute allowedRoles={['super_admin', 'sub_admin']}>
              <Layout>
                <ContentApproval />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/commission"
          element={
            <ProtectedRoute allowedRoles={['super_admin']}>
              <Layout>
                <Commission />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/subscription"
          element={
            <ProtectedRoute allowedRoles={['super_admin']}>
              <Layout>
                <Subscription />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/sub-admins"
          element={
            <ProtectedRoute allowedRoles={['super_admin']}>
              <Layout>
                <SubAdmins />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/settings"
          element={
            <ProtectedRoute allowedRoles={['super_admin']}>
              <Layout>
                <Settings />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* User Routes */}
        {/* Public User Routes */}
        <Route path="/role-selection" element={<RoleSelection />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/register" element={<UserRegister />} />

        {/* Protected User Routes */}
        <Route
          path="/"
          element={
            <UserLayout>
              <Home />
            </UserLayout>
          }
        />
        <Route
          path="/books"
          element={
            <UserLayout>
              <BrowseBooks />
            </UserLayout>
          }
        />
        <Route
          path="/books/:id"
          element={
            <UserLayout>
              <BookDetails />
            </UserLayout>
          }
        />
        <Route
          path="/cart"
          element={
            <UserLayout>
              <Cart />
            </UserLayout>
          }
        />
        <Route
          path="/orders"
          element={
            <UserProtectedRoute>
              <UserLayout>
                <Orders />
              </UserLayout>
            </UserProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <UserProtectedRoute>
              <UserLayout>
                <Profile />
              </UserLayout>
            </UserProtectedRoute>
          }
        />

        {/* Default redirects */}
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
