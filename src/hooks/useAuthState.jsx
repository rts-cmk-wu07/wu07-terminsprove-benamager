import { useEffect, useState } from "react"
import { getCookie } from "react-use-cookie"

export default function useAuthState() {
  // default auth state
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    userId: null,
    token: "",
    validUntil: null
  });

  useEffect(() => {
    const authCookie = getCookie("authCookie");

    // no cookie => keep default auth state
    if (!authCookie) {
      return
    }

    // if cookie exist and it is expired
    const dateNow = new Date().getTime();
    if (dateNow > authCookie.validUntil) {
      // token has expired => keep default auth state
      return
    }

    // token all good, push cookie data to auth state
    setAuthState({ ...authCookie, isAuthenticated: true })

  }, []);

  return { authState };
}