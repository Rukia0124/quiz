import React, { useEffect, useState } from "react";
import Cards from "../components/Cards";
import SuccessMessage from "../components/SuccessMessage";

const Home = ({ user }) => {
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    setSuccessMessage(localStorage.getItem("SUCCESS_MESSAGE"));
  }, []);

  return (
    <div>
      <SuccessMessage message={successMessage} setMessage={setSuccessMessage} />
      <Cards user={user} />
    </div>
  );
};

export default Home;
