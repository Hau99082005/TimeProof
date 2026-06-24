"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "@/firebase/client";
import { User } from "firebase/auth";

interface DbUser {
  id: number;
  firebase_id?: string;
  full_name: string;
  email: string;
  avatar?: string;
  role: "admin" | "seller" | "customer";
  wallet_balance: number;
  status: boolean;
  created_at: Date;
  updated_at: Date;
}

interface AuthContextType {
  user: User | null;
  dbUser: DbUser | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refetchUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [dbUser, setDbUser] = useState<DbUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refetchUser = async () => {
    if (!user) return;
    try {
      const res = await fetch("/api/auth/me", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setDbUser(data.user);
      }
    } catch (err) {
      console.error("Failed to fetch user:", err);
    }
  };

  const signOutUser = async () => {
    try {
      await auth.signOut();
      await fetch("/api/auth/session", { method: "DELETE" });
      setUser(null);
      setDbUser(null);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        try {
          const res = await fetch("/api/auth/me", { cache: "no-store" });
          if (res.ok) {
            const data = await res.json();
            setDbUser(data.user);
          }
        } catch (err) {
          console.error("Failed to fetch user:", err);
        }
      } else {
        setDbUser(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, dbUser, loading, signOut: signOutUser, refetchUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
