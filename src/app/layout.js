"use client";

import "./globals.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { Provider } from "react-redux";
import store from "./redux/store";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Provider store={store}>
          {!isDashboard && <Navbar />}

          <main>{children}</main>

          {!isDashboard && <Footer />}
        </Provider>
      </body>
    </html>
  );
}
