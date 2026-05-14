import { useEffect, useState } from "react";

export function useAuth() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setUser(token ? { token } : null);
  }, []);
  return { user, setUser };
}
