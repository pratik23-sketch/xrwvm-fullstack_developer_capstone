import React, { useState } from 'react';
import "./Register.css";
import Header from '../Header/Header';

const Register = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const register_url = window.location.origin + "/djangoapp/registration";

  const register = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await fetch(register_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userName: userName,
          password: password
        })
      });

      const json = await res.json();

      if (json.status === "Account created") {
        alert("Registration successful. Please login.");
        window.location.href = "/login";
      } else {
        alert(json.error || "Registration failed");
      }
    } catch (error) {
      alert("Unable to register. Please try again.");
    }
  };

  return (
    <div>
      <Header />
      <div className="register_container">
        <h2 className="header">Register</h2>
        <form onSubmit={register}>
          <div className="inputs">
            <div className="input">
              <input
                className="input_field"
                type="text"
                placeholder="Username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>
            <div className="input">
              <input
                className="input_field"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="input">
              <input
                className="input_field"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div className="submit_panel">
              <input className="submit" type="submit" value="Register" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
