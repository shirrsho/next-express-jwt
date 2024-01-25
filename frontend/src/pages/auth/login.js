import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Cookies from 'js-cookie';

async function handler(username, password) {
  // if (req.method === 'POST') {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, {username, password});
      const { token } = response.data;
      console.log("token: ",token);

      Cookies.set('auth_token', token, { expires: 1, path: '/' });
      console.log("Login Succesful");
      // res.status(200).json({ message: 'Login successful' });
    } catch (error) {
      console.log("Error:: ", error);
      // res.status(error.response?.status || 500).json({ error: error.response?.data?.error });
    }
  }
// }

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      // const response = await axios.post('/api/auth/login', { username, password });
      await handler(username, password)
      // console.log(response.data);

      router.push('/auth/profile');
    } catch (error) {
      console.error(error || 'Internal Server Error');
    }
  };

  return (
    <div className='h-screen w-screen bg-white text-black text-center'>
      <h1 className='py-8'>Login</h1>
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
        <button type="button" className='bg-gray-500 text-white px-4 py-2' onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
}
