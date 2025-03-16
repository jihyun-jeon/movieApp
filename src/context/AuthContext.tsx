import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import type {
  SignUpWithPasswordCredentials,
  SignInWithPasswordCredentials,
  AuthTokenResponsePassword,
  Session,
  AuthResponse,
} from '@supabase/supabase-js';

type AuthContextType = {
  session: Session | null;
  signIn: (credentials: SignInWithPasswordCredentials) => Promise<AuthTokenResponsePassword['data']>;
  signOut: () => Promise<void>;
  signUp: (credentials: SignInWithPasswordCredentials) => Promise<AuthResponse['data']>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

function useProvideAuth(): AuthContextType {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 처음 로드시, 새로고침 후 - 세션 상태 확인
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setLoading(false);
    };

    // 세션이 변경시 때마다(로그인, 로그아웃, 세션 만료 등) - 세션 상태 자동 업데이트
    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
    });

    getSession();

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
    setSession(null);
  };

  const signUp = async (credentials: SignUpWithPasswordCredentials) => {
    const { data, error } = await supabase.auth.signUp(credentials);
    if (error) throw error;
    return data;
  };

  return {
    session,
    signIn,
    signOut,
    signUp,
    loading,
  };
}

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext) as AuthContextType;
