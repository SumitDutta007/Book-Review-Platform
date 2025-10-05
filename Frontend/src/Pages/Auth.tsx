import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../Context/UserContext";
import "./Auth.css";

const Auth = () => {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const [mode, setMode] = useState<"signup" | "signin">("signup");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user", // Default role
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url =
      mode === "signup"
        ? "https://book-review-platform-pjx2.onrender.com/api/auth/register"
        : "https://book-review-platform-pjx2.onrender.com/api/auth/login";

    // For login, we only need email and password. For signup, we send more.
    const body =
      mode === "signup"
        ? {
            username: formData.username,
            email: formData.email,
            password: formData.password,
          }
        : { email: formData.email, password: formData.password };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle errors from the server with toast
        toast.error(data.msg || "An error occurred.");
      } else {
        // Handle success with toast
        toast.success(
          mode === "signup" ? "Registration successful!" : "Login successful!"
        );
        // Save the token to localStorage and update context
        localStorage.setItem("token", data.token);
        userContext?.setUser(data.token);
        // Redirect to home page
        navigate("/");
      }
    } catch (error) {
      console.error("Request failed:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="auth-split-container">
      <div className="auth-form-side">
        <form className="auth-form-modern" onSubmit={handleSubmit}>
          <h2 className="auth-title">Ready to start your success story?</h2>
          <p className="auth-subtitle">
            Signup to our website and start leafing through your favorite
            literature today!
          </p>

          {mode === "signup" && (
            <>
              <label className="auth-label" htmlFor="username">
                Full name
              </label>
              <input
                className="auth-input placeholder-[#2195f380] text-[#2196f3]"
                id="username"
                name="username"
                type="text"
                placeholder="John Doe"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </>
          )}

          <label className="auth-label" htmlFor="email">
            Email
          </label>
          <input
            className="auth-input placeholder-[#2195f380] text-[#2196f3]"
            id="email"
            name="email"
            type="email"
            placeholder="janedoe@mail.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label className="auth-label" htmlFor="password">
            Password
          </label>
          <input
            className="auth-input placeholder-[#2195f380] text-[#2196f3]"
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button className="auth-submit-btn" type="submit">
            {mode === "signup" ? "Sign up" : "Sign in"}
          </button>

          <div className="mt-4 text-center text-sm auth-toggle-row">
            <span className="text-gray-500"></span>
            {mode === "signup"
              ? "Already have an account?"
              : "Don't have an account?"}

            <button
              type="button"
              className="auth-toggle-btn"
              onClick={() => setMode(mode === "signup" ? "signin" : "signup")}
            >
              {mode === "signup" ? "Sign in" : "Sign up"}
            </button>
          </div>
        </form>
      </div>
      <div className="auth-illustration-side"></div>
    </div>
  );
};

export default Auth;
