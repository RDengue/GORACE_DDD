"use client";
import { createContext, useCallback, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { UsuarioDTO } from "@ddd/auth-adapter";
import cookie from "js-cookie";

export interface SessionContextProps {
  loading: boolean;
  token: string | null;
  user: UsuarioDTO | null;
  createSession: (jwt: string) => void;
  clearSession: () => void;
}

const SessionContext = createContext<SessionContextProps>({} as any);

export function SessionProvider(props: any) {
  const cookieName = "authorization";

  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UsuarioDTO | null>(null);

  const loadSession = useCallback(function () {
    try {
      setLoading(true);
      const data = getSessionData();
      setToken(data?.token ?? null);
      setUser(data?.user ?? null);
    } finally {
      setLoading(false);
    }
  }, []);

  const createSession = useCallback(function (jwt: string) {
    cookie.set(cookieName, jwt, {
      expires: 1,
      sameSite: "None",
      secure: true,
    });
    loadSession();
  }, []);

  const clearSession = useCallback(function () {
    setToken(null);
    setUser(null);
    cookie.remove(cookieName);
  }, []);

  function getSessionData(): { token: string; user: UsuarioDTO } | null {
    const jwt = cookie.get(cookieName);
    if (!jwt) return null;

    try {
      const decoded: any = jwtDecode(jwt);
      const expired = decoded.exp < Date.now() / 1000;
      if (expired) {
        cookie.remove(cookieName);
        return null;
      }

      return {
        token: jwt,
        user: {
          id: decoded.id,
          nome: decoded.nome,
          email: decoded.email,
          iniciais: decoded.iniciais,
        },
      };
    } catch (error) {
      cookie.remove(cookieName);
      return null;
    }
  }

  useEffect(() => {
    loadSession();
  }, [loadSession]);

  return (
    <SessionContext.Provider
      value={{
        loading,
        token,
        user,
        createSession,
        clearSession,
      }}
    >
      {props.children}
    </SessionContext.Provider>
  );
}

export default SessionContext;
