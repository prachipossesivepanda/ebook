import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import OwnerLayout from './admin/common/OwnerLayout';
import UniversityLayout from './admin/common/UniversityLayout';
import SubadminLayout from './admin/common/SubadminLayout';
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
import MyEbooks from './user/pages/MyEbooks';
import Profile from './user/pages/Profile';
import UserLogin from './user/components/Auth/UserLogin';
import UserRegister from './user/components/Auth/UserRegister';
import RoleSelection from './user/components/RoleSelection';
import EbookReader from './user/components/EbookReader';

import './App.css';
import { ROLE_GROUPS, ROLES } from './admin/constants/roles';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/otp" element={<Otp />} />
        <Route path="/admin/unauthorized" element={<Unauthorized />} />

        {/* Owner Routes */}
        <Route
          path="/owner/dashboard"
          element={
            <ProtectedRoute allowedRoles={ROLE_GROUPS.ownerTeam}>
              <OwnerLayout>
                <Dashboard />
              </OwnerLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/owner/vendors"
          element={
            <ProtectedRoute allowedRoles={ROLE_GROUPS.ownerTeam}>
              <OwnerLayout>
                <Vendors />
              </OwnerLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/owner/vendor-onboarding"
          element={
            <ProtectedRoute allowedRoles={[ROLES.OWNER]}>
              <OwnerLayout>
                <VendorOnboarding />
              </OwnerLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/owner/kyc-verification"
          element={
            <ProtectedRoute allowedRoles={[ROLES.OWNER]}>
              <OwnerLayout>
                <KycVerification />
              </OwnerLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/owner/orders"
          element={
            <ProtectedRoute allowedRoles={ROLE_GROUPS.ownerTeam}>
              <OwnerLayout>
                <AdminOrders />
              </OwnerLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/owner/analytics"
          element={
            <ProtectedRoute allowedRoles={[ROLES.OWNER]}>
              <OwnerLayout>
                <Analytics />
              </OwnerLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/owner/catalog"
          element={
            <ProtectedRoute allowedRoles={ROLE_GROUPS.ownerTeam}>
              <OwnerLayout>
                <Catalog />
              </OwnerLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/owner/content-approval"
          element={
            <ProtectedRoute allowedRoles={ROLE_GROUPS.ownerTeam}>
              <OwnerLayout>
                <ContentApproval />
              </OwnerLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/owner/commission"
          element={
            <ProtectedRoute allowedRoles={[ROLES.OWNER]}>
              <OwnerLayout>
                <Commission />
              </OwnerLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/owner/subscription"
          element={
            <ProtectedRoute allowedRoles={[ROLES.OWNER]}>
              <OwnerLayout>
                <Subscription />
              </OwnerLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/owner/sub-admins"
          element={
            <ProtectedRoute allowedRoles={[ROLES.OWNER]}>
              <OwnerLayout>
                <SubAdmins />
              </OwnerLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/owner/settings"
          element={
            <ProtectedRoute allowedRoles={[ROLES.OWNER]}>
              <OwnerLayout>
                <Settings />
              </OwnerLayout>
            </ProtectedRoute>
          }
        />

        {/* Platform Subadmin Routes */}
        <Route
          path="/subadmin/dashboard"
          element={
            <ProtectedRoute allowedRoles={[ROLES.PLATFORM_SUBADMIN]}>
              <SubadminLayout>
                <Dashboard />
              </SubadminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/subadmin/orders"
          element={
            <ProtectedRoute allowedRoles={[ROLES.PLATFORM_SUBADMIN]}>
              <SubadminLayout>
                <AdminOrders />
              </SubadminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/subadmin/catalog"
          element={
            <ProtectedRoute allowedRoles={[ROLES.PLATFORM_SUBADMIN]}>
              <SubadminLayout>
                <Catalog />
              </SubadminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/subadmin/content-approval"
          element={
            <ProtectedRoute allowedRoles={[ROLES.PLATFORM_SUBADMIN]}>
              <SubadminLayout>
                <ContentApproval />
              </SubadminLayout>
            </ProtectedRoute>
          }
        />

        {/* University Admin Routes */}
        <Route
          path="/vendor/dashboard"
          element={
            <ProtectedRoute allowedRoles={ROLE_GROUPS.universityTeam} requireScope="vendor">
              <UniversityLayout>
                <Dashboard />
              </UniversityLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/vendor/orders"
          element={
            <ProtectedRoute allowedRoles={ROLE_GROUPS.universityTeam} requireScope="vendor">
              <UniversityLayout>
                <AdminOrders />
              </UniversityLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/vendor/catalog"
          element={
            <ProtectedRoute allowedRoles={ROLE_GROUPS.universityTeam} requireScope="vendor">
              <UniversityLayout>
                <Catalog />
              </UniversityLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/vendor/content"
          element={
            <ProtectedRoute allowedRoles={ROLE_GROUPS.universityTeam} requireScope="vendor">
              <UniversityLayout>
                <ContentApproval />
              </UniversityLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/vendor/commission"
          element={
            <ProtectedRoute allowedRoles={ROLE_GROUPS.universityTeam} requireScope="vendor">
              <UniversityLayout>
                <Commission />
              </UniversityLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/vendor/subadmins"
          element={
            <ProtectedRoute allowedRoles={ROLE_GROUPS.universityTeam} requireScope="vendor">
              <UniversityLayout>
                <SubAdmins />
              </UniversityLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/vendor/analytics"
          element={
            <ProtectedRoute allowedRoles={ROLE_GROUPS.universityTeam} requireScope="vendor">
              <UniversityLayout>
                <Analytics />
              </UniversityLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/vendor/settings"
          element={
            <ProtectedRoute allowedRoles={ROLE_GROUPS.universityTeam} requireScope="vendor">
              <UniversityLayout>
                <Settings />
              </UniversityLayout>
            </ProtectedRoute>
          }
        />

        {/* User Routes */}
        {/* Public User Routes */}
        <Route path="/role-selection" element={<RoleSelection />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/register" element={<UserRegister />} />

        {/* Protected User Routes */}
        <Route path="/" element={<Navigate to="/role-selection" replace />} />
        <Route
          path="/home"
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
          path="/my-ebooks"
          element={
            <UserProtectedRoute>
              <UserLayout>
                <MyEbooks />
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
        <Route
          path="/reader/:bookId"
          element={
            <UserProtectedRoute>
              <EbookReader />
            </UserProtectedRoute>
          }
        />

        {/* Default redirects */}
        <Route path="/admin/*" element={<Navigate to="/owner/dashboard" replace />} />
        <Route path="/owner" element={<Navigate to="/owner/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
