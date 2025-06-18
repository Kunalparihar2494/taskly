"use client";
import React from "react";

const DateComponent = () => {
  const today = new Date().toDateString();
  return (
    <div className="flex justify-center m-4 p-2 border-b-1 border-gray-400">
      <p className="font-bold italic text-xl text-purple-800">{today.toString()}</p>
    </div>
  );
};

export default DateComponent;
