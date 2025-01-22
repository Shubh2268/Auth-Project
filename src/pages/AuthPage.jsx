import React, { useState } from 'react';
import Lottie from 'lottie-react';
import animationData from '../assets/animation.json'; // Download a free Lottie JSON animation file
import { supabase } from '../Supabase';

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleAuth = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;

        const { error: profileError } = await supabase
          .from('profiles')
          .insert({ id: data.user.id, name, email });
        if (profileError) throw profileError;

        setSuccess('Account created successfully! Please check your email to confirm.');
        setIsSignUp(false);
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;

        setSuccess('Login successful! Redirecting...');
        setTimeout(() => {
          window.location.href = '/welcome';
        }, 1500);
      }
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Side - Animation */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-purple-600 to-blue-500 items-center justify-center">
        <Lottie animationData={animationData} className="w-3/4 h-full" />
      </div>

      {/* Right Side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-purple-600 md:bg-gray-100">
        <div className="w-full max-w-md px-8 m-3 lg:m-0 py-20 space-y-6 bg-white rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            {isSignUp ? 'Create an Account' : 'Welcome Back !'}
          </h2>
          <div className="space-y-4">
            {isSignUp && (
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 text-gray-700 bg-gray-100 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 text-gray-700 bg-gray-100 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 text-gray-700 bg-gray-100 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
          {error && <p className="text-sm font-medium text-red-600">{error}</p>}
          {success && <p className="text-sm font-medium text-green-600">{success}</p>}
          <div className="flex flex-col space-y-4">
            <button
              onClick={handleAuth}
              disabled={loading}
              className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 focus:outline-none"
            >
              {loading
                ? isSignUp
                  ? 'Signing up...'
                  : 'Logging in...'
                : isSignUp
                ? 'Sign Up'
                : 'Login'}
            </button>
            <p className="text-center text-gray-500">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <span
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError('');
                  setSuccess('');
                }}
                className="text-blue-500 cursor-pointer hover:underline"
              >
                {isSignUp ? 'Login here' : 'Sign up here'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
