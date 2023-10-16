import { Routes, Route } from "react-router-dom";
import './App.css'
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Header from "./components/Header";
function App() {
  return <div className="App">
    <Header/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<Profile />} />

    </Routes>

  </div>;
}

export default App;
