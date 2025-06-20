// AdminLoginPage.jsx
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useContext } from "react";
import { ContextStore } from "../store/ContextStore";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { url, atoken, setaToken } = useContext(ContextStore);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(url + "/api/v1/admin/login", {
        email,
        password,
      });

      if (res.data.success) {
        localStorage.setItem("atoken", res.data.atoken);
        toast.success("Login successful");
        // redirect to admin dashboard
        setaToken(localStorage.getItem("atoken"));
        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Invalid credentials or server error");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow-md w-96"
      >
        <h2 className="text-2xl mb-4 font-semibold text-center">Admin Login</h2>
        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          required
        />
        <input
          type="password"
          placeholder="Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
