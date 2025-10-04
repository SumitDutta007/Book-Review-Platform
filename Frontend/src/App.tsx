import { Route, Routes } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./Components/ProtectedRoute";
import { UserProvider } from "./Context/UserContext";
import Auth from "./Pages/Auth";
import Book from "./Pages/Book";
import CreateBook from "./Pages/CreateBook";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Book />} />
          <Route path="/create-book" element={<CreateBook />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </UserProvider>
  );
}

export default App;
