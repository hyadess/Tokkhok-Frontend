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
// import Arnab from "./pages/Arnab";
import AuthProvider, { useAuth } from "./context/AuthContext";
import LandingPage from "./pages/LandingPage";
import Translator from "./components/Translator";
import NotesDashboard from "./pages/Notes/NotesDashboard";
import NotesList from "./pages/Notes/NotesList";
import NoteViewer from "./pages/Notes/NoteViewer";
import CreateNote from "./pages/Notes/CreateNote";
import BookReader from "./pages/Notes/BookReader";
import ReadingRoomContextProvider from "./context/ReadingRoomContextProvider";
import PublicNotes from "./pages/Notes/PublicNotes";
import EditNote from "./pages/Notes/EditNote";
import Profile from "./pages/Profile";
import Navbar from "./components/navbar/Navbar";
import UserTrain from "./components/overlays/UserTrain";
import Admin from "./pages/Admin";
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
      <Route path="/translate" element={<Translator />} />
      <Route path="/conversation/:chat_id" element={<Convo />} />
      <Route path="/usertrain" element={<UserTrain />} />
      <Route path="/notes" element={<NotesDashboard />} />
      <Route path="/mynotes" element={<NotesList />} />
      <Route path="/note-viewer/:id" element={<NoteViewer />} />
      <Route path="/notes-create" element={<CreateNote />} />
      <Route path="/notes-pdf" element={<BookReader />} />
      <Route path="/notes-public" element={<PublicNotes />} />
      <Route path="/note/edit/:id" element={<EditNote />} />
      <Route path="/admin" element={<Admin />} />
      {/* <Route path="/allconvo" element={<AllConvo />} /> */}
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

function App() {
  return (
    <div>
      <AuthProvider>
        <ReadingRoomContextProvider>
          <Router>
            <Navbar />
            <AppContent />
          </Router>
        </ReadingRoomContextProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
