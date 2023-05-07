import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useEffect, useState } from "react";
import Navigation from "./components/Navigation";
import { useUser } from "./lib/customHooks";

function App() {
  const [user, setUser] = useState(null);
  const { connectedUser } = useUser();

  useEffect(() => {
    setUser(connectedUser);
  }, [connectedUser]);

  return (
    <div className="App">
      <BrowserRouter>
        <Navigation user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login setUser={setUser} />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
