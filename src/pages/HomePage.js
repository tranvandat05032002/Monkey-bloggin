import { auth } from "firebase-app/firebase-config";
import { signOut } from "firebase/auth";
import React from "react";

const HomePage = () => {
  const handleSignOut = () => {
    signOut(auth);
  };
  return <button onClick={handleSignOut}>SignOut</button>;
};

export default HomePage;
