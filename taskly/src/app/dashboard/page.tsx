"use client";

import React, { useState } from "react";
import Header from "../header/header";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import TodoCard from "../todo-card/page";

const DashBoard = () => {

  const [displayName,setDisplayName] = useState('');

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const displayName = user.displayName;
      setDisplayName(displayName ?? '')
      if (displayName) {
        console.log("User's display name:", displayName);
      } else {
        console.log("User's display name is not set.");
      }
    } else {
      console.log("No user is currently signed in.");
    }
  });

  return (
    <div>
      <Header message={"Welcome to Taskly " + displayName} />
      <TodoCard />
    </div>
  );
};

export default DashBoard;
