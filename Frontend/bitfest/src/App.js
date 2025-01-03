// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Convo from "./pages/chatbot";
import Arnab from "./pages/Arnab";
import AuthProvider, { useAuth } from "./context/AuthContext";
import LandingPage from "./pages/LandingPage";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { token } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) =>
        token ? (
          <Component {...props} />
        ) : (
          <Route path="/" element={<Navigate replace to={"/login"} />} />
        )
      }
    />
  );
};

function AppContent() {

  return (

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/arnab" element={<Arnab />} />
        <Route path="/conversation/:id" element={<Convo />} />
        {/* <Route path="/allconvo" element={<AllConvo />} /> */}
        {/* <Route path="/profile/:id" element={<Profile />} /> */}
      </Routes>
  );
}

function App() {
  return (
    <div>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
