import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import ProtectedRoute from "./Components/ProtectedRoute";
import { UserProvider } from "./Context/UserContext";
import Auth from "./Pages/Auth";
import Book from "./Pages/Book";
import Books from "./Pages/Books";
import CreateBook from "./Pages/CreateBook";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";

function App() {
  return (
    <UserProvider>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/book/:id" element={<Book />} />
          <Route path="/create-book" element={<CreateBook />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </UserProvider>
  );
}

export default App;
