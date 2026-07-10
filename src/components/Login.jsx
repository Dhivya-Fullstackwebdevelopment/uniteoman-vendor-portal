import React, { useState } from 'react';
import logo from '../assets/uniteoman-logo.png';

// Demo credentials — swap this block out for a real API call when you wire up a backend.
const DEMO_EMAIL = 'admin@uniteoman.com';
const DEMO_PASSWORD = 'admin123';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setLoading(true);
    // Simulate an auth request — replace with a real API call.
    setTimeout(() => {
      setLoading(false);
      if (email.trim().toLowerCase() === DEMO_EMAIL && password === DEMO_PASSWORD) {
        onLogin({ email, remember });
      } else {
        setError('Incorrect email or password. Please try again.');
      }
    }, 500);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0A0A0F] relative overflow-hidden">
      {/* Ambient gradient glow, matches brand palette */}
      <div className="absolute -top-40 -left-40 w-[480px] h-[480px] rounded-full bg-primary/20 blur-[120px]" />
      <div className="absolute -bottom-40 -right-40 w-[480px] h-[480px] rounded-full bg-accent/20 blur-[120px]" />

      <div className="relative w-[400px] bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.4)] p-8">
        {/* Logo */}
        <div className="flex flex-col items-center mb-7">
          <img src={logo} className="h-8 w-auto mb-3" alt="UniteOman" />
          <div className="font-normal text-[11px] leading-none text-[#9090A0] tracking-[0.5px]">
            Admin Console
          </div>
        </div>

        <div className="mb-6 text-center">
          <div className="font-bold text-xl leading-none text-[#0A0A0F] mb-2">Welcome back</div>
          <div className="font-normal text-sm leading-none text-[#9090A0]">Sign in to manage bookings, professionals and payments</div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Email */}
          <div>
            <div className="font-medium text-[11px] leading-none text-[#9090A0] mb-2">Email Address</div>
            <div className="flex items-center gap-2 bg-[#F8F8FA] border border-[#EBEBEF] rounded-xl px-3.5 py-3 focus-within:border-primary transition-colors">
              <svg className="w-4 h-4 text-[#9090A0] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 7l9 6 9-6M4 5h16a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1z" />
              </svg>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@uniteoman.com"
                autoComplete="username"
                className="bg-transparent border-none outline-none w-full font-medium text-sm text-[#0A0A0F] placeholder:text-[#B0B0C0] placeholder:font-normal"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-[11px] leading-none text-[#9090A0]">Password</span>
              <span className="font-semibold text-[11px] leading-none text-primary cursor-pointer">Forgot password?</span>
            </div>
            <div className="flex items-center gap-2 bg-[#F8F8FA] border border-[#EBEBEF] rounded-xl px-3.5 py-3 focus-within:border-primary transition-colors">
              <svg className="w-4 h-4 text-[#9090A0] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                <rect x="4" y="10" width="16" height="10" rx="2" />
                <path d="M8 10V7a4 4 0 018 0v3" strokeLinecap="round" />
              </svg>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••"
                autoComplete="current-password"
                className="bg-transparent border-none outline-none w-full font-medium text-sm text-[#0A0A0F] placeholder:text-[#B0B0C0] placeholder:font-normal"
              />
              <svg
                onClick={() => setShowPassword((v) => !v)}
                className="w-4 h-4 text-[#9090A0] flex-shrink-0 cursor-pointer"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"
              >
                {showPassword ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.774 3.162 10.065 7.5a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.243L9.88 9.88" />
                ) : (
                  <>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <circle cx="12" cy="12" r="3" />
                  </>
                )}
              </svg>
            </div>
          </div>

          {/* Remember me */}
          <div className="flex items-center gap-2 mt-1">
            <div
              onClick={() => setRemember((v) => !v)}
              className={`w-4 h-4 rounded-[5px] cursor-pointer flex items-center justify-center transition-colors flex-shrink-0 ${
                remember ? 'bg-gradient-to-br from-[#D61CA8] to-[#8B2EF5]' : 'bg-[#F0F0F4] border border-[#EBEBEF]'
              }`}
            >
              {remember && (
                <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            <span className="font-medium text-xs leading-none text-[#6B7280]">Keep me signed in</span>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-100 rounded-lg px-3.5 py-2.5 font-medium text-xs leading-snug text-red-600">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="mt-1 px-5 py-3 bg-gradient-to-r from-[#D61CA8] to-[#8B2EF5] rounded-xl font-semibold text-sm leading-none text-white cursor-pointer shadow-[0_4px_16px_rgba(214,28,168,0.35)] hover:shadow-[0_6px_24px_rgba(214,28,168,0.45)] transition-shadow disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center font-normal text-[11px] leading-none text-[#B0B0C0]">
          Demo credentials: admin@uniteoman.com / admin123
        </div>
      </div>
    </div>
  );
};

export default Login;