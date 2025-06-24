"use client";

import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../config/firebase";
import { addUser, removeUser } from "../store/userStore";
import { useRouter } from "next/navigation";

interface HeaderProps {
  message: string;
}

const Header: React.FC<HeaderProps> = ({ message }) => {
  const router = useRouter();
  // Define RootState type to match your Redux store structure
  interface RootState {
    user: {
      user: {
        uid: string;
        email: string | null;
        displayName: string | null;
      } | null;
    };
  }

  const user = useSelector((store: RootState) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
        router.push("/dashboard");
      } else {
        dispatch(removeUser());
        router.push("/");
      }
    });

    return () => unsubscribe();
  }, [dispatch,router]);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch(() => {});
  };

  return (
    <div className="bg-black flex justify-between">
      <div></div>
      <h1 className="text-xl text-white md:text-2xl font-sans py-3">
        {message}
      </h1>
      {user.user && (
        <button
          onClick={handleSignOut}
          className="bg-white mx-5 my-2 p-2 rounded-md font-semibold cursor-pointer"
        >
          Log out
        </button>
      )}
      {!user.user && <div></div>}
    </div>
  );
};

export default Header;
