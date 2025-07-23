'use client'

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { createContext, useContext } from "react";
import { User } from "../interface/User";

interface AuthContextType {
  user?: User | null;
  isLoading: boolean;
  logout: () => Promise<void>;
}

const publicRoutes = ["/signIn", "/register"]
export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  logout: async () => { },
})

async function fetchUser(): Promise<User | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
    method: 'GET',
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Not authenticated');

  return res.json();
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const route = pathname.replace(/^\/[a-z-]+/, '');

  const isPublic = publicRoutes.some((publicRoute) =>
    route.startsWith(publicRoute)
  );

  const queryClient = useQueryClient()
  const {
    data: user,
    isLoading,
  } = useQuery<User | null>({
    queryKey: ['auth', 'user'],
    queryFn: fetchUser,
    enabled: !isPublic,
    retry: false,
  });

  async function logout() {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {
      method: 'POST',
      credentials: 'include',
    })

    queryClient.setQueryData(['auth', 'user'], null);
    window.location.href = '/singIn';
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext);
}
