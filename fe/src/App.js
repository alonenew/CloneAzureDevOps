import Sidebar from "./components/layouts/Sidebar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Main from "./pages/private/Main";
import Navbar from "./components/layouts/Navbar";
import ProtectRoute from "./pages/routes/ProtectRoute";
import Login from "./pages/public/Login";
import Register from "./pages/public/Register";
import NotFound from "./pages/public/NotFound";
import TaskId from "./pages/private/TaskId";


function App() {
  let { PrivateRoutes } = ProtectRoute();
  
  return (
    <div className="App font-sans flex h-screen flex-col mx-auto justify-center z-10 bg-tailwind bg-cover">
      <Router>

        <Navbar />
        <div className="flex">
          <Sidebar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path='/*' exact element={<NotFound/>} />

            {/* <Route element={<PrivateRoutes />}> */}
              <Route path="/" element={<Main />} />
              <Route path="/detail/id=:id" element={<TaskId />} />
            {/* </Route> */}
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
