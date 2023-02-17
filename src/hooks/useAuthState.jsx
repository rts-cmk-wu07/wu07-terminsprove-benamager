import { useEffect, useState } from "react"
import { getCookie, setCookie } from "react-use-cookie"

export default function useAuthState() {
  // default auth state
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    userId: null,
    token: "",
    validUntil: null,
  });

  useEffect(() => {
    const authCookie = JSON.parse(getCookie("authCookie") || "null");

    // no cookie => keep default auth state
    if (!authCookie) {
      return;
    }

    setAuthState(authCookie)

  }, []);

  return { authState, setAuthState };
}