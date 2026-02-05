import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import "../styles/auth.css";

function Login() {
  const navigate = useNavigate();
  const { loginUser } = useUser(); // ✅ ADD THIS

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await fetch(
        `https://easybuy-react.onrender.com/users?email=${data.email}`
      );
      const user = await res.json();

      if (user.length === 0) {
        alert("Invalid Email");
        return;
      }

      if (user[0].pass !== data.password) {
        alert("Invalid Password");
        return;
      }

      // ✅ LOGIN USING CONTEXT (IMPORTANT 🔥)
      loginUser(user[0]);

      alert("Login successful");

      // ✅ ROLE BASED REDIRECT
      if (user[0].role === "admin") {
        navigate("/admin");
      } else {
        navigate("/home");
      }

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Login</h2>

        <label>Email</label>
        <input
          type="email"
          placeholder="Enter email"
          {...register("email", {
            required: "* email is required"
          })}
        />
        {errors.email && <p>{errors.email.message}</p>}

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter password"
          autoComplete="off"
          {...register("password", {
            required: "* password is required"
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}

        <button type="submit">Login</button>
        <Link to="/register">Don't have an account?</Link>
      </form>
    </div>
  );
}

export default Login;
