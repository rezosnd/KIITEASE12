"use client"

import { SessionProvider, SessionProviderProps } from "next-auth/react"
import type { ReactNode } from "react"

export function AuthProvider({ 
  children,
  session
}: { 
  children: ReactNode;
  session?: SessionProviderProps['session']; 
}) {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  );
}

