import { Route, Routes } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./Components/ProtectedRoute";
import Auth from "./Pages/Auth";
import Home from "./Pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
