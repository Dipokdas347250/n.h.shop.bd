"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { storeRequest } from "../../lib/storeApi";

const StoreAuthContext = createContext(null);

export function StoreAuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    storeRequest("/auth/me")
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = async (credentials) => {
    const nextUser = await storeRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
    setUser(nextUser);
    return nextUser;
  };

  const logout = async () => {
    await storeRequest("/auth/logout", { method: "POST" });
    setUser(null);
  };

  return <StoreAuthContext.Provider value={{ user, loading, login, logout }}>{children}</StoreAuthContext.Provider>;
}

export function useStoreAuth() {
  const context = useContext(StoreAuthContext);
  if (!context) throw new Error("useStoreAuth must be used inside StoreAuthProvider");
  return context;
}
