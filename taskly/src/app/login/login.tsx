"use client";
import React, { useRef, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../config/firebase";
import { checkValidateData } from "../utlis/Validate";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userStore";
import Loading from "../utlis/Loading";

const Login = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();
  const dispatch = useDispatch();

  const fullName = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const confirmPassword = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    setIsLoading(true);
    const emailValue = email.current?.value;
    const passwordValue = password.current?.value;
    const name = fullName?.current?.value;

    if (!emailValue || !passwordValue) {
      setErrorMessage("Email and password are required.");
      return;
    }

    const msg = checkValidateData(emailValue, passwordValue);
    setErrorMessage(msg);
    if (msg) return;

    if (!isLogin) {
      createUserWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
          const user = userCredential.user;
          setIsLoading(false);
          dispatch(addUser(user));
          if (name) {
            updateProfile(user, {
              displayName: name,
            })
              .then(() => {
                router.push("/dashboard");
              })
              .catch((error) => {
                console.error("Error updating profile:", error);
              });
          }else{
            console.error('Invalid Request');
            
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setIsLoading(false);
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
          const user = userCredential.user;
          setIsLoading(false);
          dispatch(addUser(user));
          router.push("/dashboard");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setIsLoading(false);
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  if (isLoading)
    return (
      <div className="mt-50 md:mt-[15%]">
        <Loading />
      </div>
    );

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-r from-violet-200 to-pink-200">
      <div className="w-3/4 md:w-1/3 bg-gradient-to-b from-slate-300 to-slate-500 rounded-2xl shadow-2xl">
        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col">
          {!isLogin && (
            <input
              type="text"
              ref={fullName}
              className="border border-gray-600 mx-10 my-5 p-2 rounded-sm"
              placeholder="Enter Full Name"
            />
          )}
          <input
            type="text"
            className={`border border-gray-600 mx-10 ${
              isLogin ? "mt-10" : "my-auto"
            } p-2 rounded-sm`}
            ref={email}
            placeholder="Email"
          />
          <input
            type="password"
            ref={password}
            className="border border-gray-600 mx-10 my-6 p-2 rounded-sm"
            placeholder="Password"
          />
          {!isLogin && (
            <input
              type="text"
              ref={confirmPassword}
              className="border border-gray-600 mx-10 p-2 rounded-sm"
              placeholder="Confirm Password"
            />
          )}
          <p className="text-red-800 font-semibold relative ml-10 text-lg">
            {errorMessage}
          </p>
          <button
            onClick={handleButtonClick}
            className="mx-10 my-4 p-2 bg-gradient-to-r from-emerald-500 to-emerald-900 md:w-[15%] rounded-md cursor-pointer"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        {isLogin ? (
          <button onClick={() => setIsLogin(false)}>
            <p className="mx-10 my-2 p-2 text-black font-semibold cursor-pointer">
              Are you new to <span className="font-bold">Taskly</span>? please
              Sign up
            </p>
          </button>
        ) : (
          <button onClick={() => setIsLogin(true)}>
            <p className="mx-10 my-2 p-2 text-black font-semibold cursor-pointer">
              Already a User. Please Login
            </p>
          </button>
        )}
      </div>
    </div>
  );
};

export default Login;
