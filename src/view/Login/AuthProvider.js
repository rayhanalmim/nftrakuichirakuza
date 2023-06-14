// >>>>>>>>>>DOCIFY-START - pxyhuwfsdfhu >>>>>>>>>>
// // Add googletoken functionality to a node. This is a bit tricky because we don't want to create a node that's already in googletoken
// >>>>>>>>>>DOCIFY-END - pxyhuwfsdfhu >>>>>>>>>>
import { useState, useEffect } from "react";
import { getUser } from "./auth.js";
import AuthContext from "./AuthContext";
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const currentUser = getUser();
    setUser(currentUser);
  }, []);
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
