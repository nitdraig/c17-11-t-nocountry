import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Index from "./pages/index/Index";
import Dashboard from "./pages/dashboard/Dashboard";
import { useAuth } from "./services/Api";
import { Profile } from "./pages/profile/Profile";
import { Login } from "./pages/login/Login";
import { Loader } from "./components/Loader";

import Navbar from "./components/NavBar";
import Register from "./pages/register/Register";

const ProtectedRoute: React.FC<{ element: React.ReactElement }> = ({
  element,
}) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? element : <Navigate to="/login" />;
};

const UnauthenticatedRoute: React.FC<{ element: React.ReactElement }> = ({
  element,
}) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Navigate to="/dashboard" /> : element;
};

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route
            path="/register"
            element={<UnauthenticatedRoute element={<Register />} />}
          />
          <Route
            path="/login"
            element={<UnauthenticatedRoute element={<Login />} />}
          />
          <Route
            path="/profile"
            element={<ProtectedRoute element={<Profile />} />}
          />
          <Route
            path="/dashboard"
            element={<ProtectedRoute element={<Dashboard />} />}
          />
          <Route path="/auth/google/callback" element={<Loader />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
