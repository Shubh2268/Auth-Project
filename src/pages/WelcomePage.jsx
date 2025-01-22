import React, { useEffect, useState } from 'react';
import { supabase } from '../Supabase';
import { useNavigate } from 'react-router';

const WelcomePage = () => {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/'); // Redirect to login if not authenticated
        return;
      }

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('name')
        .eq('id', session.user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }

      setUserName(profile.name || 'User'); // Use the user's name or a default value
    };

    fetchUserProfile();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/'); // Redirect to login page after logout
  };

  return (
    <div className='relative flex items-center justify-center min-h-screen w-screen bg-gradient-to-br from-blue-500 to-purple-600'>
      <div className='absolute inset-0'>
        <img
          src='https://cdn.pixabay.com/photo/2022/05/31/07/01/island-7232868_1280.png'
          alt='Background'
          className='object-cover w-full h-full opacity-70'
        />
      </div>
      <div className='relative z-10 lg:p-8 text-center text-white'>
        <h1 className='text-6xl lg:text-8xl font-extrabold animate-fade-in'>
          Welcome, <span className='text-white'>{userName}</span>!
        </h1>
        <p className='mt-4 text-base lg:text-lg animate-fade-in-delay'>
          We're glad to have you here. Explore and enjoy your journey.
        </p>
        <button onClick={handleLogout} className='px-6 py-2 mt-8 text-base lg:text-lg font-semibold text-purple-600 bg-white rounded-full border-2 border-purple-500 shadow-lg hover:bg-gray-100 focus:outline-none animate-bounce'>Logout</button>
      </div>
    </div>
  );
};

export default WelcomePage;
