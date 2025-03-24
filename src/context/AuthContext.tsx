import { createContext, useContext, useState, ReactNode, useEffect, Suspense } from 'react';
import { supabase } from '@/lib/supabaseClient';
import type {
  SignUpWithPasswordCredentials,
  SignInWithPasswordCredentials,
  AuthTokenResponsePassword,
  Session,
  AuthResponse,
} from '@supabase/supabase-js';
import SpinnerPortal from '@/components/Spinner';

type AuthContextType = {
  session: Session | null;
  signIn: (credentials: SignInWithPasswordCredentials) => Promise<AuthTokenResponsePassword['data']>;
  signOut: () => Promise<void>;
  signUp: (credentials: SignInWithPasswordCredentials) => Promise<AuthResponse['data']>;
};

const AuthContext = createContext<AuthContextType | null>(null);

const sessionPromiseRef = { current: null as Promise<void> | null };

function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);

  // 1)첫 번째 마운트시, 2)새로고침해서 null로 초기화시
  if (!sessionPromiseRef.current) {
    sessionPromiseRef.current = supabase.auth.getSession().then(({ data }) => {
      const session = data.session;
      setSession(session);
    });
    throw sessionPromiseRef.current; // Promise를 저장하여 반환 -> 비동기 처리중 -> Suspense가 이를 감지하여 로딩 UI 출력
  }

  useEffect(() => {
    // 세션이 변경시 때마다(로그인, 로그아웃, 세션 만료 등) - 세션 상태 자동 업데이트
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const signIn = async (credentials: SignInWithPasswordCredentials) => {
    const { data, error } = await supabase.auth.signInWithPassword(credentials);

    if (error) throw error;
    return data;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const signUp = async (credentials: SignUpWithPasswordCredentials) => {
    const { data, error } = await supabase.auth.signUp(credentials);
    if (error) throw error;
    return data;
  };

  const value = { session, signIn, signOut, signUp };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const AuthContextProvider = ({ children }: { children: ReactNode }) => (
  <Suspense fallback={<SpinnerPortal />}>
    <AuthProvider>{children}</AuthProvider>
  </Suspense>
);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth는 AuthContextProvider 내부에서만 사용되야 합니다!');
  }
  return context;
};
