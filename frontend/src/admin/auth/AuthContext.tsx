import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { authApi, onSessionExpired, tokenStore } from "../lib/api";
import type { User } from "../lib/types";

interface AuthValue {
  user: User | null;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => tokenStore.user);

  useEffect(() => {
    const unsubscribe = onSessionExpired(() => setUser(null));
    return () => {
      unsubscribe();
    };
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const res = await authApi.login(email, password);
    tokenStore.save(res.access_token, res.refresh_token, res.user);
    setUser(res.user);
    return res.user;
  }, []);

  const logout = useCallback(async () => {
    const refresh = tokenStore.refresh;
    if (refresh) {
      try {
        await authApi.logout(refresh);
      } catch {
        /* the local session is dropped regardless */
      }
    }
    tokenStore.clear();
    setUser(null);
  }, []);

  const value = useMemo<AuthValue>(
    () => ({ user, isAdmin: user?.role === "admin", login, logout }),
    [user, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
