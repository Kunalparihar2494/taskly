import "./globals.css";
import { Metadata } from "next";
import ReduxProvider from "./ReduxProvider"; // We'll create this

export const metadata: Metadata = {
  title: "Taskly - Your Todo App",
  description: "Track your tasks and productivity effortlessly",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
