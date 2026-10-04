import { Routes, Route } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Dashboard from "../pages/Dashboard/Dashboard";
import Jobs from "../pages/Jobs/Jobs";
import Profile from "../pages/Profile/Profile";
import EditProfile from "../pages/Profile/EditProfile";
import ChangePassword from "../pages/Profile/ChangePassword";
import JobDetails from "../pages/Jobs/JobDetails";
import RecruiterDashboard from "../pages/Recruiter/RecruiterDashboard";
import PostJob from "../pages/Recruiter/PostJob";
import MyJobs from "../pages/Recruiter/MyJobs";
import EditJob from "../pages/Recruiter/EditJob";
import Applicants from "../pages/Recruiter/Applicants";
import CreateCompany from "../pages/Company/CreateCompany";
import CompanyList from "../pages/Company/CompanyList";
import CompanyDetails from "../pages/Company/CompanyDetails";
import EditCompany from "../pages/Company/EditCompany";
import MyApplications from "../pages/Applications/MyApplications";
import HelpSupport from "../pages/Support/HelpSupport";
import AboutNexora from "../pages/About/AboutNexora";
import ActiveSessions from "../pages/Profile/ActiveSessions";
import TwoFactorAuth from "../pages/Profile/TwoFactorAuth";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route element={<ProtectedRoute />}>

        <Route
          path="/about"
          element={<AboutNexora />}
        />

        <Route
          path="/help-support"
          element={<HelpSupport />}
        />

        <Route
          path="/active-sessions"
          element={<ActiveSessions />}
        />

        <Route
          path="/two-factor-auth"
          element={<TwoFactorAuth />}
        />
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<EditProfile />} />

          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
          <Route path="/companies" element={<CompanyList />} />
          <Route path="/companies/create" element={<CreateCompany />} />
          <Route path="/companies/:id" element={<CompanyDetails />} />

          <Route path="/companies/edit/:id" element={<EditCompany />} />

          <Route path="/recruiter/post-job" element={<PostJob />} />

          <Route path="/recruiter/my-jobs" element={<MyJobs />} />

          <Route path="/recruiter/edit-job/:id" element={<EditJob />} />

          <Route path="/recruiter/applicants/:id" element={<Applicants />} />
          <Route
            path="/change-password"
            element={<ChangePassword />}
          />

          <Route
            path="/applications"
            element={<MyApplications />}
          />


        </Route>
      </Route>

      <Route path="*" element={<h1>404 Page Not Found</h1>} />
    </Routes>
  );
}

export default AppRoutes;