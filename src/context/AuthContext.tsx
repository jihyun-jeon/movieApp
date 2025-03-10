import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import type {
  SignInWithPasswordCredentials,
  AuthTokenResponsePassword,
  Session,
  User,
  AuthError,
} from '@supabase/supabase-js';

type AuthContextType = {
  session: Session | null;
  signIn: (credentials: SignInWithPasswordCredentials) => Promise<AuthTokenResponsePassword>;
  signOut: () => Promise<void>;
  getUser: (jwt?: string) => Promise<{ user: User } | AuthError>;
};

const AuthContext = createContext<AuthContextType | null>(null);

function useProvideAuth(): AuthContextType {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // 처음 로드시, 새로고침 후 - 세션 상태 확인
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
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
    const res = await supabase.auth.signInWithPassword(credentials);
    return res;
  };

  const signOut = async () => {
    const res = await supabase.auth.signOut();
    if (res.error) {
      console.log('Error signOut :', res.error);
    } else {
      setSession(null);
    }
  };

  const getUser = async (jwt?: string): Promise<{ user: User } | AuthError> => {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      console.log('Error getUser:', error.message);
      return error;
    }

    return data;
  };

  return {
    session,
    signIn,
    signOut,
    getUser,
  };
}

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext) as AuthContextType;
