import { Route, Routes } from "react-router-dom";
import LandingPage from "./Landing/LandingPage";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import PrivateRoutes from './PrivateRoute/PrivateRoutes'
import Dashboard from "./Pages/Dashboard"
import CreateTask from "./Pages/CreateTask";
import ViewTask from "./Pages/ViewTask";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/dashboard"
            element={
              <PrivateRoutes>
                <Dashboard />
              </PrivateRoutes>
            }
          />
          <Route
            path="/create"
            element={
              <PrivateRoutes>
                <CreateTask />
              </PrivateRoutes>
            }
          />
          <Route
            path="/task/:id"
            element={
              <PrivateRoutes>
                <ViewTask />
              </PrivateRoutes>
            }
          />


        </Routes>

        <Toaster/>
      </div>
    </>
  );
}

export default App;
