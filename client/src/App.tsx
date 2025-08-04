import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Layout from "./components/Layouts/Layout";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notiication";
import Footer from "./components/Footer/Footer";
import { ActivityPage } from "./pages/ActivityPage";
import ProductDetails from "./pages/ProductDetails";
import About from "./pages/About";
import TermsAndConditions from "./pages/TermsAndConditions";
import ProfileSettings from "./components/SettingsPage/ProfileSettings";
import NotificationSettings from "./components/SettingsPage/NotificationSettings";
import User from "./components/SideBar/SideBar"

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
          <Route path="notificationSettings" element={<NotificationSettings />} />
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
              < User />
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

      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
