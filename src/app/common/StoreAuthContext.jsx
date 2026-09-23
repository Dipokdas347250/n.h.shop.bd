"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { storeRequest } from "../../lib/storeApi";

const StoreAuthContext = createContext(null);

/**
 * Tracks the signed-in customer. Signing in is entirely optional: the
 * storefront works, and orders can be placed, with `user` left as null.
 */
export function StoreAuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    storeRequest("/auth/me")
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback(async (credentials) => {
    const nextUser = await storeRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
    setUser(nextUser);
    return nextUser;
  }, []);

  const register = useCallback(
    (details) => storeRequest("/auth/signup", { method: "POST", body: JSON.stringify(details) }),
    []
  );

  const verifyOtp = useCallback(
    (details) => storeRequest("/auth/verifyotp", { method: "POST", body: JSON.stringify(details) }),
    []
  );

  const resendOtp = useCallback(
    (email) => storeRequest("/auth/resendotp", { method: "POST", body: JSON.stringify({ email }) }),
    []
  );

  const updateProfile = useCallback(async (details) => {
    const nextUser = await storeRequest("/auth/profile", { method: "PATCH", body: JSON.stringify(details) });
    setUser(nextUser);
    return nextUser;
  }, []);

  const logout = useCallback(async () => {
    try {
      await storeRequest("/auth/logout", { method: "POST" });
    } finally {
      setUser(null);
    }
  }, []);

  const value = useMemo(
    () => ({ user, loading, login, register, verifyOtp, resendOtp, updateProfile, logout }),
    [user, loading, login, register, verifyOtp, resendOtp, updateProfile, logout]
  );

  return <StoreAuthContext.Provider value={value}>{children}</StoreAuthContext.Provider>;
}

export function useStoreAuth() {
  const context = useContext(StoreAuthContext);
  if (!context) throw new Error("useStoreAuth must be used inside StoreAuthProvider");
  return context;
}
