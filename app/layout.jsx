"use client";
import { Figtree } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import TanstackQueryProvider from "@/TanstackQuery/TanstackQueryhProvider";
import { configure } from "mobx";
import { Provider } from "mobx-react";
import rootStore from "../stores/root";

const figtree = Figtree({ subsets: ["latin"] });

configure({
  enforceActions: "always",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${figtree.className} max-w-3xl mx-auto bg-primary-bg pb-[80px] overflow-y-scroll`}
      >
        <title>Favmine.com</title>
        <Provider rootStore={rootStore} meStore={rootStore.meStore}>
          <TanstackQueryProvider>
            <Toaster
              toastOptions={{
                className: "",
                style: {
                  border: "1px solid #ddd",
                  padding: "8px",
                  color: "#333",
                },
              }}
            />
            {children}
          </TanstackQueryProvider>
        </Provider>
      </body>
    </html>
  );
}
