import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useRouter } from 'next/router';
import Logout from './logout';

async function handler() {
  // const cookies = parseCookies(req);
  // console.log(cookies);
  // const token = cookies.auth_token;
  console.log("handler");
  const token = Cookies.get('auth_token')
  console.log(Cookies.get('auth_token'));

  if (!token) {
    console.log({ error: 'Unauthorized from Frontend' });
  }

  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/profile`, {
      headers: {
        Authorization: token,
      },
    });
    console.log(response.data);
    return response.data
    // res.status(200).json(response.data);
  } catch (error) {
    console.log("Error:: ", error);
    return "faka"
    // res.status(error.response?.status || 500).json({ error: error.response?.data?.error || 'Internal Server Error' });
  }
}

export default function Profile() {
  const [user, setUser] = useState(null);
  const router = useRouter()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // const cookies = parseCookies();
        // const response = await axios.get('/api/auth/me', {
        //   headers: {
        //     Authorization: cookies.auth_token || '',
        //   },
        // });
        
        const response = await handler()
        setUser(response.user);
      } catch (error) {
        console.error(error.response?.data || 'Internal Server Error');
        // router.push('/auth/login')
        // fetchProfile()
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className='h-screen w-screen bg-white text-black text-center pt-12'>
      {user ? (
        <div className='flex flex-col gap-4 items-center'>
          <p>Username: {user.username}</p>
          <Logout/>
        </div>
      ) : (
        <p>Unauthorized</p>
      )}
    </div>
  );
}
