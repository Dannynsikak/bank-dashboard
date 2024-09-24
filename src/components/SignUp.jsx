import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth, googleAuthProvider } from "../lib/firebaseconfig";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // initailize navigate

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      // set the username in firebase
      if (username) {
        await updateProfile(user, { displayName: username });
      }
      console.log("User created:", userCredential.user);
      // rediract to the dashboard with the display name
      navigate("/", { state: { name: user.displayName || username } });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      const user = result.user;

      console.log("Google sign-in success:", result.user);
      // redirect to the dashboard with google displayname
      navigate("/", { state: { name: user.displayName } });
    } catch (Error) {
      setError(Error.message);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-6 bg-white rounded-md shadow-md">
      <form className="flex flex-col space-y-4" onSubmit={handleSignUp}>
        <input
          className="border p-2 rounded"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="border p-2 rounded"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border p-2 rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className="border p-2 rounded"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {error && <p className="text-red-500">{error}</p>}
        <button className="bg-blue-500 text-white p-2 rounded" type="submit">
          Sign Up
        </button>
      </form>
      <button
        className="bg-red-500 text-white p-2 rounded"
        onClick={handleGoogleSignIn}
      >
        Sign Up with Google
      </button>
    </div>
  );
};

export default SignUp;
