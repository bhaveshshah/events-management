import "./App.css";
import { NavBar } from "./components/NavBar";

// APIs
import { useState } from "react";
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';

// Pages
import LoginPage from "./features/auth/components/LoginForm";
import RegisterPage from "./features/auth/components/RegisterForm";
import ProfilePage from "./features/ProfilePage";

// Context
import { UserContext } from "./context/UserContext";

function App() {

  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Routes>

          <Route path='/' element={<MainLayout />}>
            <Route index element={<p>Events will be shown here</p>} />
            <Route path='login' element={<LoginPage />} />
            <Route path='register' element={<RegisterPage />} />
            <Route path='profile' element={<ProfilePage />} />
          </Route>

          <Route path='*' element={<Err404 />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

const MainLayout = () => (
  <div className="min-h-screen flex flex-col">
    <NavBar />
    <main className="container mx-auto px-4 py-8 flex-1 flex flex-col">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold">
          Welcome! 😍
        </h2>
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </main>
  </div>
)

const Err404 = () => {
  return <div>404</div>;
};

export default App;
