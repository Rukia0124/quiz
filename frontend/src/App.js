import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./style/index.scss";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useEffect, useState } from "react";
import Navigation from "./components/Navigation";
import { useUser } from "./lib/customHooks";
import Create from "./pages/Create";
import Lobby from "./pages/Lobby";
import Join from "./pages/Join";

function App() {
  const [user, setUser] = useState(null);
  const { connectedUser } = useUser();

  useEffect(() => {
    setUser(connectedUser);
  }, [connectedUser]);

  return (
    <BrowserRouter>
      <div className="App">
        <Navigation user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login setUser={setUser} />}></Route>
          <Route path="/newquiz" element={<Create />}></Route>
          <Route path="/newgame" element={<Lobby />}></Route>
          <Route path="/join" element={<Join />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
