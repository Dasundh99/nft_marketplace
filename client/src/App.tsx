import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Layout from "./components/Layouts/Layout";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notiication";

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
        {/* Wrap pages with Layout */}
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
        />
        <Route
          path="/notifications"
          element={
            <Layout>
              <Notifications />
            </Layout>
          }
        />
        {/* <Route
          path="/settings"
          element={
            <Layout>
              <Settings />
            </Layout>
          }
        /> */}
        {/* <Route
          path="/settings"
          element={
            <Layout>
              <Settings />
            </Layout>
          }
        /> */}
        {/* <Route
          path="/settings"
          element={
            <Layout>
              <Settings />
            </Layout>
          }
        /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
