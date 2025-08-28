import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  sendPasswordResetEmail,
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";


export default function StudentLogin({ onLogin = () => {} }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [info, setInfo] = useState("");

  const navigate = useNavigate();

  // UI helper (was commented out)
  const withUiState = async (fn) => {
    setErr("");
    setInfo("");
    setLoading(true);
    try {
      await fn();
    } catch (e) {
      setErr(e?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Creates or returns existing profile
  const fetchOrCreateStudentProfile = async (user) => {
    const { uid, email: userEmail, displayName, photoURL, providerData } = user;
    const docRef = doc(db, "students", uid);
    const snap = await getDoc(docRef);

    // Derive providerId safely
    let providerId = "custom";
    if (Array.isArray(providerData) && providerData.length > 0) {
      // Prefer the first non-password provider; otherwise take first
      const nonPassword = providerData.find(
        (p) => p.providerId && p.providerId !== "password"
      );
      providerId =
        nonPassword?.providerId || providerData[0].providerId || "custom";
    } else if (user.providerId) {
      providerId = user.providerId; // sometimes "firebase" for email/password
    } else if (userEmail) {
      providerId = "password";
    }

    if (snap.exists()) {
      const profile = snap.data();
      await setDoc(
        docRef,
        { lastLoginAt: serverTimestamp(), authProvider: providerId },
        { merge: true }
      );
      onLogin({ ...profile });
      return profile;
    }

    const fallbackName =
      (displayName && displayName.trim()) ||
      (userEmail ? userEmail.split("@") : "Student");

    const newProfile = {
      uid,
      name: fallbackName,
      email: userEmail || "",
      phone: "",
      address: "",
      pincode: "",
      university: "",
      course: "",
      branch: "",
      academicDetails: "",
      counsellingBook: "",
      documents: "",
      scholarshipDoc: "",
      photoURL: photoURL || "",
      createdAt: serverTimestamp(),
      lastLoginAt: serverTimestamp(),
      authProvider: providerId, // guaranteed string
    };

    await setDoc(docRef, newProfile, { merge: true });
    onLogin(newProfile);
    return newProfile;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    withUiState(async () => {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      await fetchOrCreateStudentProfile(user);
      navigate("/");
    });
  };

  const handleGoogleLogin = () =>
    withUiState(async () => {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      await fetchOrCreateStudentProfile(result.user);
      navigate("/");
    });

  const handleFacebookLogin = () =>
    withUiState(async () => {
      const provider = new FacebookAuthProvider();
      const result = await signInWithPopup(auth, provider);
      await fetchOrCreateStudentProfile(result.user);
      navigate("/");
    });

  const handleLinkedInClick = () => {
    setErr("LinkedIn login must be implemented via Firebase Custom Auth.");
  };

  const handleForgotPassword = () =>
    withUiState(async () => {
      if (!email) {
        throw new Error("Enter your email above to receive a reset link.");
      }
      await sendPasswordResetEmail(auth, email);
      setInfo(
        "Password reset email sent. Check the inbox (and spam) for instructions."
      );
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1f2230] via-[#232736] to-[#1a1c27] flex items-center justify-center px-4 py-10">
      
      <div className="w-full max-w-md">
        <div className="backdrop-blur-xl bg-[rgb(36,39,49,0.8)] border border-white/10 text-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="px-8 pt-8 pb-4 text-center">
            <div className="mx-auto h-12 w-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-purple-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 14l9-5-9-5-9 5 9 5z"
                />
                <path
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 14l6.16-3.422A12.083 12.083 0 0112 21.5 12.083 12.083 0 015.84 10.578L12 14z"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-semibold tracking-tight">
              Welcome back
            </h2>
            <p className="text-sm text-white/70 mt-1">
              Sign in to continue to your student dashboard
            </p>
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
              <button
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full group bg-white text-gray-800 py-2.5 rounded-lg hover:bg-gray-100 transition border border-white/20 flex items-center justify-center gap-2 font-medium"
              >
                <GoogleIcon />
                Continue with Google
              </button>
              <button
                onClick={handleFacebookLogin}
                disabled={loading}
                className="w-full group bg-[#1877F2] text-white py-2.5 rounded-lg hover:bg-[#1569d6] transition border border-white/10 flex items-center justify-center gap-2 font-medium"
              >
                <FacebookIcon />
                Continue with Facebook
              </button>
              <button
                onClick={handleLinkedInClick}
                disabled={loading}
                className="w-full group bg-[#0A66C2] text-white py-2.5 rounded-lg hover:bg-[#0957a6] transition border border-white/10 flex items-center justify-center gap-2 font-medium"
              >
                <LinkedInIcon />
                Continue with LinkedIn
              </button>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-white/50 mt-4">
          By continuing, you agree to our Terms and Privacy Policy.
        </p>
      </div>
    </div>
  );
}

/* Inline SVG Icons */
function EyeIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"
      />
      <circle cx="12" cy="12" r="3" strokeWidth="2" />
    </svg>
  );
}
function EyeOffIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18" />
      <path
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.58 10.58A3 3 0 0012 15a3 3 0 002.42-4.42M9.88 5.09A10.45 10.45 0 0112 5c7 0 11 7 11 7a16.2 16.2 0 01-4.35 4.96M6.1 6.1A16.2 16.2 0 001 12s4 7 11 7a10.7 10.7 0 005.47-1.5"
      />
    </svg>
  );
}
function GoogleIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg">
      <path
        fill="#EA4335"
        d="M533.5 278.4c0-18.6-1.7-36.5-4.9-53.9H272.1v102h146.9c-6.3 34-25 62.8-53.5 82.1v68h86.5c50.6-46.6 81.5-115.4 81.5-198.2z"
      />
      <path
        fill="#34A853"
        d="M272.1 544.3c72.9 0 134-24.1 178.6-65.7l-86.5-68c-24 16.1-54.7 25.7-92.1 25.7-70.8 0-130.8-47.7-152.4-111.8h-89v70.3c44.4 88 135.6 149.5 241.4 149.5z"
      />
      <path
        fill="#4A90E2"
        d="M119.7 324.5c-10.8-32-10.8-67 0-99l.1-70.3h-89C-13.9 221.7-13.9 322.6 30.8 410.5l88.9-86z"
      />
      <path
        fill="#FBBC05"
        d="M272.1 107.7c39.6-.6 77.4 13.9 106.4 40.8l79.4-79.4C361.8-19.5 222.7-16.8 120.7 61.7l-89.9 82.9 88.9 86c21.6-64.1 81.6-111.8 152.4-111.8z"
      />
    </svg>
  );
}
function FacebookIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M22 12.06C22 6.477 17.523 2 11.94 2 6.357 2 1.88 6.477 1.88 12.06c0 4.992 3.657 9.132 8.44 9.94v-7.03H7.9v-2.91h2.42V9.847c0-2.39 1.424-3.709 3.604-3.709 1.044 0 2.137.187 2.137.187v2.35h-1.204c-1.188 0-1.557.738-1.557 1.495v1.797h2.651l-.424 2.91h-2.227V22c4.783-.808 8.44-4.948 8.44-9.94z"
      />
    </svg>
  );
}
function LinkedInIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V24h-4V8zm7.5 0h3.8v2.2h.1c.5-.9 1.8-2.2 3.8-2.2 4 0 4.7 2.6 4.7 6V24h-4v-7.1c0-1.7 0-3.8-2.3-3.8-2.3 0-2.7 1.8-2.7 3.7V24h-4V8z"
      />
    </svg>
  );
}
