import { useAuth } from '@/context/AuthContext';
import { AuthError } from '@supabase/supabase-js';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState(''); // [TODO] form 라이브러리 사용 후 상태 정리
  const [password, setPassword] = useState('');
  const [error, setError] = useState<null | AuthError>(null);

  const handleSignIn = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const { data, error } = await signIn({ email, password });

    if (data?.user) {
      navigate('/');
      setError(null);
    }
    if (error) {
      setError(error);
      console.log('error state', error);
    }
  };

  return (
    <div>
      {/* [TODO] form UI 라이브러리 사용, 유효성 검사 */}
      <form onSubmit={handleSignIn} className="max-w-md m-auto pt-24">
        <h2 className="font-bold pb-2">Login</h2>
        <p>
          Don&apos;t have an account yet? <Link to="/signup">Sign up</Link>
        </p>
        <div className="flex flex-col py-4">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 mt-2 text-black"
            type="email"
            name="email"
            id="email"
            placeholder="Email"
          />
        </div>
        <div className="flex flex-col py-4">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 mt-2 text-black"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          />
        </div>
        <button className="w-full mt-4">Login</button>
        {error && (
          <p className="text-red-600 text-center pt-4">
            아이디 또는 비밀번호를 확인해주세요 {JSON.stringify(error.message)}
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
