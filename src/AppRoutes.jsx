import { Routes, Route } from "react-router-dom";

// Common Pages
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";

// Owner Pages
import OwnerDashboard from "./pages/OwnerDashboard";
import MyHouseDashboard from "./pages/MyHouseDashboard";

// Engineer Pages
import EngineerDashboard from "./pages/EngineerDashboard";
import EngineerTechnicalDetails from "./pages/EngineerTechnicalDetails";
import EngineerCommunityDetail from "./pages/EngineerCommunityDetails";
import EngineerMaintenance from "./pages/EngineerMaintenance";
import EngineerMaintenanceDetails from "./pages/EngineerMaintenanceDetails";

// Admin Pages (Rough placeholders)
import AdminDashboard from "./pages/AdminDashboard";
import AdminInsights from "./pages/AdminInsights";
import AdminMaintenanceAndReports from "./pages/AdminMaintenanceAndReports";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Common & Login */}
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<HomePage />} />

      {/* Owner Pages */}
      <Route path="/owner-dashboard" element={<OwnerDashboard />} />
      <Route path="/my-house" element={<MyHouseDashboard />} />

      {/* Engineer Pages */}
      <Route path="/engineer-dashboard" element={<EngineerDashboard />} />
      <Route
        path="/engineer-technical"
        element={<EngineerTechnicalDetails />}
      />
      <Route
        path="/technical-details/:communityId"
        element={<EngineerCommunityDetail />}
      />
      <Route path="/engineer-maintenance" element={<EngineerMaintenance />} />
      <Route
        path="/engineer-maintenance/:communityId"
        element={<EngineerMaintenanceDetails />}
      />

      {/* Admin Pages */}
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/admin-insights" element={<AdminInsights />} />
      <Route
        path="/admin-maintenance-reports"
        element={<AdminMaintenanceAndReports />}
      />
    </Routes>
  );
}
