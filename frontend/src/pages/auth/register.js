import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

async function handler(username, password) {
  // if (req.method === 'POST') {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/register`, {username, password});
      console.log("Registration Succesful");
      // res.status(200).json({ message: 'Login successful' });
    } catch (error) {
      console.log("Error:: ", error);
      // res.status(error.response?.status || 500).json({ error: error.response?.data?.error });
    }
  }
// }

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    try {
      // const response = await axios.post('/api/auth/Register', { username, password });
      await handler(username, password)
      // console.log(response.data);

      // Redirect to a protected page after successful Register
      router.push('/auth/login');
    } catch (error) {
      console.error(error || 'Internal Server Error');
    }
  };

  return (
    <div className='h-screen w-screen bg-white text-black text-center'>
      <h1 className='py-8'>Register</h1>
      <form className='flex flex-col items-center'>
        <label>
          Username:
          <input type="text" className='mx-4 border border-gray-500' value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" className='mx-4 border border-gray-500' value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="button" className='bg-gray-500 text-white px-4 py-2' onClick={handleRegister}>
          Register
        </button>
      </form>
    </div>
  );
}
