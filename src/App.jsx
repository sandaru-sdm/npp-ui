import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users/Users";
import Villagers from "./pages/Villagers/Villagers";
import AddUsers from "./pages/Users/AddUser";
import AddVillager from "./pages/Villagers/AddVillager";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/users" element={<Users />} />
        <Route path="/add-user" element={<AddUsers/>} />

        <Route path="/villagers" element={<Villagers />} />
        <Route path="/add-villager" element={<AddVillager/>} />

      </Routes>
    </Router>
  );
}

export default App;
