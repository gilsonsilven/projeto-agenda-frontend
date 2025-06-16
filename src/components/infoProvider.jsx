'use client';

import { SessionProvider } from "next-auth/react";


export default function InfoProvider({ children }) {
  return (
    <SessionProvider>

        {children}

    </SessionProvider>
  );
}