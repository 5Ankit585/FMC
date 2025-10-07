// src/components/LoginModal.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { auth } from "../firebase"; // adjust path if needed
import {
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

/* --- Providers --- */
const googleProvider = new GoogleAuthProvider();

export default function StudentLogin({ onLogin = () => {} }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [info, setInfo] = useState("");

  const navigate = useNavigate();

  // UI helper
  const withUiState = async (fn) => {
    setErr("");
    setInfo("");
    setLoading(true);
    try {
      await fn();
    } catch (e) {
      // Friendly error messages for common errors
      const msg = e?.response?.data?.message || e?.message || String(e);
      setErr(msg);
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // Email/password login
  const handleLogin = async (e) => {
    e.preventDefault();
    withUiState(async () => {
      const response = await axios.post("http://localhost:5000/api/signup/login", {
        email,
        password
      });

      // ✅ Save user ID to localStorage
      localStorage.setItem("userId", response.data.userId);
      localStorage.setItem("name", response.data.name);     // optional
      localStorage.setItem("email", response.data.email);   // optional

      setInfo("Login successful!");
      onLogin(response.data); // Pass user data
      // Redirect to profile page
      navigate(`/myprofile/${response.data.userId}`);
    });
  };

  // Google login
  const handleGoogleLogin = async () => {
    setErr("");
    setInfo("");
    setLoading(true);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Send Firebase user info to backend
      const response = await axios.post("http://localhost:5000/api/signup/google-login", {
        email: user.email,
        name: user.displayName,
        firebaseId: user.uid,
      });

      // Save MongoDB userId in localStorage
      localStorage.setItem("userId", response.data.userId);
      localStorage.setItem("name", response.data.name || "");
      localStorage.setItem("email", response.data.email || "");

      onLogin(response.data);

      // Redirect to profile page
      navigate(`/myprofile/${response.data.userId}`);
    } catch (error) {
      setErr(error.message || "Google sign-in failed");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Forgot password (kept for now, but would need backend endpoint)
  const handleForgotPassword = () => {
    withUiState(async () => {
      if (!email) throw new Error("Please enter your email to receive a password reset link.");
      // TODO: Implement backend forgot password endpoint
      setInfo("Password reset email sent — check your inbox. (Backend TODO)");
    });
  };

  // Social logins: quick note — these still use Firebase; align with backend if needed
  const handleFacebookLogin = () => {
    setErr("");
    setInfo("Facebook sign-in requires backend integration. Use email/password for now.");
  };

  const handleLinkedInClick = () => {
    setErr("");
    setInfo(
      "LinkedIn sign-in requires extra setup (OIDC or custom token). See the instructions below to add LinkedIn support."
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1f2230] via-[#232736] to-[#1a1c27] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="backdrop-blur-xl bg-[rgb(36,39,49,0.8)] border border-white/10 text-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="px-8 pt-8 pb-4 text-center">
            <div className="mx-auto h-12 w-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422A12.083 12.083 0 0112 21.5 12.083 12.083 0 015.84 10.578L12 14z" />
              </svg>
            </div>
            <h2 className="text-3xl font-semibold tracking-tight">Welcome back</h2>
            <p className="text-sm text-white/70 mt-1">Sign in to continue to your student dashboard</p>
          </div>

          {/* Form */}
          <div className="px-8 pb-8">
            {err && (
              <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 text-red-200 px-3 py-2 text-sm">
                {err}
              </div>
            )}
            {info && (
              <div className="mb-4 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-200 px-3 py-2 text-sm">
                {info}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-white/80">Email</label>
                <input
                  type="email"
                  placeholder="name@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  className="w-full bg-[#2b2f3a] placeholder-white/40 text-white border border-white/10 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400/50 transition"
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm text-white/80">Password</label>
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="text-xs text-purple-300 hover:text-purple-200 underline-offset-2 hover:underline"
                    disabled={loading}
                  >
                    {showPassword ? "Hide password" : "Show password"}
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    className="w-full bg-[#2b2f3a] placeholder-white/40 text-white border border-white/10 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400/50 transition pr-10"
                    required
                  />
                  <span className="absolute inset-y-0 right-3 flex items-center text-white/50 pointer-events-none">
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-xs text-white/40">Need help?</div>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-xs text-purple-300 hover:text-purple-200 underline-offset-2 hover:underline disabled:opacity-60"
                  disabled={loading}
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-purple-600 disabled:opacity-70 disabled:cursor-not-allowed text-white py-2.5 rounded-lg hover:bg-purple-700 transition font-medium shadow-lg shadow-purple-900/30"
              >
                {loading ? "Signing in..." : "Login"}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="h-px bg-white/10 flex-1" />
              <span className="text-xs text-white/50">or continue with</span>
              <div className="h-px bg-white/10 flex-1" />
            </div>

            {/* Social Buttons */}
            <div className="grid grid-cols-1 gap-3">
              <button onClick={handleGoogleLogin} disabled={loading} className="w-full group bg-white text-gray-800 py-2.5 rounded-lg hover:bg-gray-100 transition border border-white/20 flex items-center justify-center gap-2 font-medium">
                <GoogleIcon /> Continue with Google
              </button>
              <button onClick={handleFacebookLogin} disabled={loading} className="w-full group bg-[#1877F2] text-white py-2.5 rounded-lg hover:bg-[#1569d6] transition border border-white/10 flex items-center justify-center gap-2 font-medium">
                <FacebookIcon /> Continue with Facebook
              </button>
              <button onClick={handleLinkedInClick} disabled={loading} className="w-full group bg-[#0A66C2] text-white py-2.5 rounded-lg hover:bg-[#0957a6] transition border border-white/10 flex items-center justify-center gap-2 font-medium">
                <LinkedInIcon /> Continue with LinkedIn
              </button>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-white/50 mt-4">By continuing, you agree to our Terms and Privacy Policy.</p>
      </div>
    </div>
  );
}

/* Inline SVG Icons (same as your previous SVGs) */
function EyeIcon() { 
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"> 
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" /> 
      <circle cx="12" cy="12" r="3" strokeWidth="2" /> 
    </svg>
  ); 
}
function EyeOffIcon() { 
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"> 
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18" /> 
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M10.58 10.58A3 3 0 0012 15a3 3 0 002.42-4.42M9.88 5.09A10.45 10.45 0 0112 5c7 0 11 7 11 7a16.2 16.2 0 01-4.35 4.96M6.1 6.1A16.2 16.2 0 001 12s4 7 11 7a10.7 10.7 0 005.47-1.5"/>
    </svg>
  ); 
}
function GoogleIcon() { 
  return (<svg className="h-5 w-5" viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg">/* ... */</svg>); 
}
function FacebookIcon() { 
  return (<svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">/* ... */</svg>); 
}
function LinkedInIcon() { 
  return (<svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">/* ... */</svg>); 
}