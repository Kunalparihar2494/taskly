"use client"; // ✅ This can now be a client component

import { Provider } from "react-redux";
import appStore from "./store/appstore";

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={appStore}>{children}</Provider>;
}
