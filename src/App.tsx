import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SidebarProvider } from './context/SidebarContext';
import { DateRangeProvider } from './context/DateRangeContext';
import { RoleGuard } from './components/layouts/RoleGuard';

// Login Page
import Login from './pages/login/Login';

// Legal Pages (co-located in Login.tsx)
import { TermsOfService } from './pages/login/Login';
import { PrivacyPolicy } from './pages/login/Login';

// Admin Logistik Pages
import LogisticsDashboard from './pages/logistik/Dashboard';
import LogisticsRoutePlanning from './pages/logistik/RoutePlanning';
import LogisticsDriverPerformance from './pages/logistik/DriverPerformance';
import LogisticsFleetManagement from './pages/logistik/FleetManagement';
import LogisticsAnalytics from './pages/logistik/Analytics';
import LogisticsSettings from './pages/logistik/Settings';
import LoadPlanner from './pages/logistik/LoadPlanner';
import CustomerData from './pages/logistik/CustomerData';
import AddCustomer from './pages/logistik/AddCustomer';
import EditCustomer from './pages/logistik/EditCustomer';
import ManagerLogistik from './pages/manager logistik/ManagerLogistik';

// Kasir Pages
import KasirDashboard from './pages/kasir/KasirDashboard';
import KasirHistory from './pages/kasir/KasirHistory';

// Admin POD Pages
import PodDashboard from './pages/pod/Dashboard';
import PodVerifications from './pages/pod/Verifications';
import PodHistory from './pages/pod/History';
import PodSettings from './pages/pod/Settings';



// Driver Pages
import DriverDashboard from './pages/driver/Dashboard';
import DriverRouteList from './pages/driver/RouteList';
import DriverDeliveryDetail from './pages/driver/DeliveryDetail';
import DriverPodCapture from './pages/driver/PodCapture';
import DriverTripSummary from './pages/driver/TripSummary';
import DriverNavigation from './pages/driver/Navigation';

// Logistics Layout
import LogisticsLayout from './components/layouts/LogisticsLayout';

function App() {
  return (
    <Router>
      <AuthProvider>
        <SidebarProvider>
          <DateRangeProvider>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />

              {/* Root Redirect */}
              <Route path="/" element={<Navigate to="/login" replace />} />

              {/* Admin Logistik Routes */}
              <Route element={<RoleGuard allowedRoles={['logistik']} />}>
                <Route element={<LogisticsLayout />}>
                  <Route path="/logistik" element={<LogisticsDashboard />} />
                  <Route path="/logistik/route-planning" element={<LogisticsRoutePlanning />} />
                  <Route path="/logistik/fleet" element={<LogisticsFleetManagement />} />
                  <Route path="/logistik/drivers" element={<LogisticsDriverPerformance />} />
                  <Route path="/logistik/customers" element={<CustomerData />} />
                  <Route path="/logistik/customers/add" element={<AddCustomer />} />
                  <Route path="/logistik/customers/edit" element={<EditCustomer />} />
                  <Route path="/logistik/analytics" element={<LogisticsAnalytics />} />
                  <Route path="/logistik/settings" element={<LogisticsSettings />} />
                  <Route path="/logistik/load-planner" element={<LoadPlanner />} />
                </Route>
              </Route>

              {/* Manager Logistik Routes */}
              <Route element={<RoleGuard allowedRoles={['manager']} />}>
                <Route element={<LogisticsLayout />}>
                  <Route path="/manager" element={<Navigate to="/manager/overview" replace />} />
                  <Route path="/manager/overview" element={<ManagerLogistik />} />
                  <Route path="/manager/return" element={<ManagerLogistik />} />
                  <Route path="/manager/efficiency" element={<ManagerLogistik />} />
                </Route>
              </Route>

              {/* Kasir Routes */}
              <Route element={<RoleGuard allowedRoles={['kasir']} />}>
                <Route element={<LogisticsLayout />}>
                  <Route path="/kasir" element={<KasirDashboard />} />
                  <Route path="/kasir/history" element={<KasirHistory />} />
                </Route>
              </Route>

              {/* Admin POD Routes */}
              <Route element={<RoleGuard allowedRoles={['pod']} />}>
                <Route path="/pod" element={<PodDashboard />} />
                <Route path="/pod/verifications" element={<PodVerifications />} />
                <Route path="/pod/history" element={<PodHistory />} />
                <Route path="/pod/settings" element={<PodSettings />} />
                {/* Catch-all for pod routes */}
                <Route path="/pod/*" element={<Navigate to="/pod" replace />} />
              </Route>

              {/* Driver Routes (Mobile First) */}
              <Route element={<RoleGuard allowedRoles={['driver']} />}>
                <Route path="/driver" element={<DriverDashboard />} />
                <Route path="/driver/routes" element={<DriverRouteList />} />
                <Route path="/driver/detail" element={<DriverDeliveryDetail />} />
                <Route path="/driver/pod" element={<DriverPodCapture />} />
                <Route path="/driver/summary" element={<DriverTripSummary />} />
                <Route path="/driver/navigation" element={<DriverNavigation />} />
              </Route>

              {/* Catch-all route */}
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </DateRangeProvider>
        </SidebarProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
