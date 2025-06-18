
"use client";
import { Provider } from "react-redux";
import Header from "./header/header";
import Login from "./login/login";
import appStore from "./store/appstore";

export default function Home() {
  const isUserLogin = false;
  return (
    <Provider store={appStore}>
    <div>
      <Header
        message={isUserLogin ? "Welcome to Taskly" : "Please Login to Taskly"}
      />
      <Login />
    </div>
    </Provider>
  );
}
