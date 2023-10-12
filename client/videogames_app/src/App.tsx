import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./Views/Home/Home";
import Landing from "./Views/Landing/Landing";
import Create from "./Views/Create/Create";
import Details from "./Views/Details/Details";
import NavBar from "./Components/NavBar/NavBar";
import AuthCallback from "./Components/AuthCallback/AuthCallback";

function App() {
  const location = useLocation();

  return (
    <div className="app-container">
      {location.pathname !== "/" && <NavBar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/callback" element={<AuthCallback />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/:id" element={<Details />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </div>
  );
}

export default App;
