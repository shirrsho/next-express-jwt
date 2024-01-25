import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

function handler() {
  // if (req.method === 'POST') {
    Cookies.remove('auth_token');

    console.log({ message: 'Logout successful' });
  // } else {
  //   res.status(405).json({ error: 'Method Not Allowed' });
  // }
}

export default function Logout() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // await axios.post('/api/auth/logout');
      // console.log('Logout successful');
      handler()

      router.reload();
    } catch (error) {
      console.error(error.response?.data || 'Internal Server Error');
    }
  };

  return (
    <div>
      <button type="button" className='bg-gray-500 text-white px-4 py-2' onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
