import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './admin/common/Layout';
import ProtectedRoute from './admin/Services/Protectedroutes';
import Login from './admin/components/Auth/Login';
import Otp from './admin/components/Auth/Otp';
import Dashboard from './admin/pages/Dashboard';
import Vendors from './admin/pages/Vendors';
import VendorOnboarding from './admin/pages/VendorOnboarding';
import KycVerification from './admin/pages/KycVerification';
import Orders from './admin/pages/Orders';
import Analytics from './admin/pages/Analytics';
import Catalog from './admin/pages/Catalog';
import ContentApproval from './admin/pages/ContentApproval';
import Commission from './admin/pages/Commission';
import Subscription from './admin/pages/Subscription';
import SubAdmins from './admin/pages/SubAdmins';
import Settings from './admin/pages/Settings';
import Unauthorized from './admin/pages/Unauthorized';
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
                <Orders />
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

        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/admin/login" replace />} />
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
