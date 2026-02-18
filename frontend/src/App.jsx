import "./App.css";
import { NavBar } from "./components/NavBar";

// APIs
import { useEffect, useState, useContext } from "react";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";

// Pages
import { LoginPage } from "./features/auth/components/LoginForm";
import { RegisterPage } from "./features/auth/components/RegisterForm";
import { Dashboard } from "./features/dashboard/Dashboard";

// Context
import { UserContext } from "./context/UserContext";
import { EventsContext } from "./context/EventsContext.jsx";

// Components
import { ProtectedRoutes } from "./components/ProtectedRoute.jsx";
import ProfilePage from "./features/ProfilePage.jsx";
import { Modal } from "./components/Modal/Modal.jsx";
import { Button } from "./components/Button/Button.jsx";
import { CalendarPlus } from "lucide-react";
import { AddEvent } from "./features/events/AddEvent.jsx";
import { addEvent } from "./services/EventService.jsx";

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser }}>
        <EventsContext.Provider value={{ events, setEvents }}>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />

            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected routes */}


            <Route
              path="/dashboard"
              element={
                <ProtectedRoutes>
                  <MainLayout />
                </ProtectedRoutes>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="profile" element={<ProfilePage />} />
            </Route>


            <Route path="*" element={<Err404 />} />
          </Routes>
        </EventsContext.Provider>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

const MainLayout = () => {

  const { setEvents } = useContext(EventsContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddNewEvent = async (data) => {

    // adding new event
    try {
      const newEvent = await addEvent(data);
      // Update the events context to include the new event
      setEvents(prevEvents => [...prevEvents, newEvent]);
      setIsModalOpen(false);  

    } catch (err) {
      console.error(err);
      alert("Failed to add event. Please try again.");
    }

  };


  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      <div className="flex justify-between items-center mb-4 mt-2">
        <Button
          size="small"
          className="flex items-center gap-2 p-2"
          onClick={() => setIsModalOpen(true)}
        >
          <CalendarPlus size={16} />
          Add Event
        </Button>
      </div>

      <main className="container mx-auto px-4 py-8 flex-1 flex flex-col">
        <div className="flex-1">
          <Outlet />
        </div>
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title='Add New Event'
          size="md"
          showFooter={false}
        >
          <AddEvent onSubmit={(data) => handleAddNewEvent(data)} onCancel={() => setIsModalOpen(false)} />
        </Modal>
      </main>
    </div>
  );
};

const Err404 = () => {
  return <div>404</div>;
};

export default App;
