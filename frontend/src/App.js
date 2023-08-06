import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./style/index.scss";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useEffect, useState } from "react";
import Navigation from "./components/Navigation";
import { useUser } from "./lib/customHooks";
import Lobby from "./pages/Lobby";
import Join from "./pages/Join";
import Create from "./pages/Create";
import Questions from "./components/Questions";

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
          <Route path="/" element={<Home user={user} />}></Route>
          <Route path="/signup" element={<Signup setUser={setUser} />}></Route>
          <Route path="/login" element={<Login setUser={setUser} />}></Route>
          <Route path="/newquiz" element={<Create />}></Route>
          <Route
            path="/rooms/:id"
            element={<Lobby setUser={setUser} user={user} />}
          ></Route>
          <Route path="/join" element={<Join />}></Route>
          <Route path="/create-quiz" element={<Create />}></Route>
          <Route path="/questions" element={<Questions />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
