import "./App.css";
import { NavBar } from "./components/NavBar";

// APIs
import { useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";

// Pages
import LoginPage from "./features/auth/components/LoginForm";
import RegisterPage from "./features/auth/components/RegisterForm";

// Context
import { UserContext } from "./context/UserContext";
import { ProtectedRoutes } from "./components/ProtectedRoute.jsx";

function App() {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoutes>
                <NavBar />
              </ProtectedRoutes>
            }
          />

          {/*<Route path="/" element={<MainLayout />}>*/}
          {/*  <Route index element={<p>Events will be shown here</p>} />*/}
          {/*  <Route path="login" element={<LoginPage />} />*/}
          {/*  <Route path="register" element={<RegisterPage />} />*/}
          {/*  <Route path="profile" element={<ProfilePage />} />*/}
          {/*</Route>*/}

          <Route path="*" element={<Err404 />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

const MainLayout = () => (
  <div className="min-h-screen flex flex-col">
    <NavBar />
    <main className="container mx-auto px-4 py-8 flex-1 flex flex-col">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold">Welcome! 😍</h2>
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </main>
  </div>
);

const Err404 = () => {
  return <div>404</div>;
};

export default App;
