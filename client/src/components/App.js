import { useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import Dashboard from "./Dashboard";
import Login from "./Login";

function App() {
  const [data, setData] = useLocalStorage("auth");
  const [token, setToken] = useState("");

  useEffect(() => {
    if (!data) return;

    const expiryDate = data.expirationTime ? new Date(data.expirationTime) : null;
    if (expiryDate && (expiryDate - new Date()) / (1000 * 60) > 0) {
      setToken(data.token);
    } else {
      setToken("");
    }
  }, [data, setToken]);

  return token ? <Dashboard /> : <Login onSubmit={setData} />;
}

export default App;
