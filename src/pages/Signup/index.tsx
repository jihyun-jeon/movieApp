import { useAuth } from '@/context/AuthContext';
import { AuthError } from '@supabase/supabase-js';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState(''); // [TODO] form 라이브러리 사용 후 상태 정리
  const [password, setPassword] = useState('');
  const [error, setError] = useState<null | AuthError>(null);

  const handleSignIn = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const { data, error } = await signUp({ email, password });

    if (data?.user) {
      navigate('/login');
      alert('회원가입 완료되었습니다.');
      setError(null);
    }
    if (error) {
      setError(error);
    }
  };

  return (
    <div>
      {/* [TODO] form UI 라이브러리 사용, 유효성 검사 */}
      <form onSubmit={handleSignIn} className="max-w-md m-auto pt-24">
        <h2 className="font-bold pb-2">Signup</h2>

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
        <button className="w-full mt-4">Signup</button>
        {error && <p className="text-red-600 text-center pt-4">{JSON.stringify(error.message)}</p>}
      </form>
    </div>
  );
};

export default Signup;
