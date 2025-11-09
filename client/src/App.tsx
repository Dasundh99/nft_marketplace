import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Layout from "./components/Layouts/Layout";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notiication";
import { ActivityPage } from "./pages/ActivityPage";
import ProductDetails from "./pages/ProductDetails";
import About from "./pages/About";
import TermsAndConditions from "./pages/TermsAndConditions";
import { SalesPage } from "./pages/SalesPage";
import Market from "./pages/Market";
import { DHLWorkflow } from "./pages/delivery-portal/DHLWorkflow";

import ProfileSettings from "./components/SettingsPage/ProfileSettings";
import NotificationSettings from "./components/SettingsPage/NotificationSettings";
// import User from "./components/UserProfile/UserProfile";
import HowNftsWorks from "./pages/HowNftsWorks";

import Goods from "./pages/Goods";
import MintForm from "./components/MintForm";


import Profile from "./pages/Profile";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProtectedRoute from "./components/Admin/ProtectedRoute";



function App() {
  const fetchAPI = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api");
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />

        <Route
          path="/home"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />

        <Route
          path="/settings"
          element={
            <Layout>
              <Settings />
            </Layout>
          }
        >
          <Route index element={<ProfileSettings />} />
          <Route path="profile" element={<ProfileSettings />} />
          <Route
            path="notificationSettings"
            element={<NotificationSettings />}
          />
        </Route>

        <Route
          path="/notifications"
          element={
            <Layout>
              <Notifications />
            </Layout>
          }
        />

        <Route
          path="/activitypage"
          element={
            <Layout>
              <ActivityPage />
            </Layout>
          }
        />

        <Route
          path="/market"
          element={
            <Layout>
              <Market />
            </Layout>
          }
        />
        <Route
          path="/productdetails"
          element={
            <Layout>
              <ProductDetails />
            </Layout>
          }
        />

        <Route
          path="/about"
          element={
            <Layout>
              <About />
            </Layout>
          }
        />

        <Route
          path="/termsandconditions"
          element={
            <Layout>
              <TermsAndConditions />
            </Layout>
          }
        />

        <Route
          path="/user"
          element={
            <Layout>
              <Profile />
            </Layout>
          }
        />

        <Route
          path="/profile"
          element={
            <Layout>
              <ProfileSettings />
            </Layout>
          }
        />

// Delivery Portal Routes

        <Route
          path="/dhlFlow"
          element={
            <Layout>
              <DHLWorkflow />
            </Layout>
          }
        />
// End Delivery Portal Routes

        <Route
          path="/sales"
          element={
            <Layout>
              <SalesPage />
            </Layout>
          }
        />
        <Route
          path="/hownftsworks"
          element={
            <Layout>
              <HowNftsWorks />
            </Layout>
          }
        />
        <Route
          path="/goods"
          element={
            <Layout>
              <Goods />
            </Layout>
          }
        />
        <Route
          path="/mint"
          element={
            <Layout>
              <MintForm />
            </Layout>
          }
        />
        <Route
          path="/admin/login"
          element={
            <AdminLogin />
          } />
        <Route
          path="admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
