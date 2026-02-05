import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import "../styles/auth.css";

function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      // check user exists
      const res = await fetch(
        `http://localhost:5000/users?email=${data.email}`
      );
      const existingUser = await res.json();

      if (existingUser.length > 0) {
        alert("User already exists");
        return;
      }

      // register user
      await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          pass: data.password,
          role: "user"
        })
      });

      alert("Registration successful");
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <h2>Register</h2>

        {/* Name */}
        <label>Name</label>
        <input
          type="text"
          placeholder="Enter name"
          {...register("name", {
            required: "* name is required",
            minLength: { value: 3, message: "* minimum 3 characters" }
          })}
        />
        {errors.name && <p>{errors.name.message}</p>}

        {/* Email */}
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter email"
          {...register("email", {
            required: "* email is required",
            pattern: {
              value: /^[a-z0-9._%+-]+@[a-z]+\.[a-z]{2,}$/,
              message: "* invalid email"
            }
          })}
        />
        {errors.email && <p>{errors.email.message}</p>}

        {/* Password */}
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter password"
          autoComplete="off"
          {...register("password", {
            required: "* password is required",
            pattern: {
              value:
                /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/,
              message:
                "* must contain uppercase, lowercase, number & special char"
            }
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}

        {/* Confirm Password */}
        <label>Confirm Password</label>
        <input
          type="password"
          placeholder="Confirm password"
          autoComplete="off"
          {...register("confirmPassword", {
            required: "* confirm password required",
            validate: (value) =>
              value === password || "* passwords do not match"
          })}
        />
        {errors.confirmPassword && (
          <p>{errors.confirmPassword.message}</p>
        )}

        <button type="submit">Register</button>
        <Link to="/login">Already have an account?</Link>
      </form>
    </div>
  );
}

export default Register;
