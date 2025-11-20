import React from "react";
import { Footer, Header } from "../components/common";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-teal-800 flex flex-col items-center justify-center">
        {children}
      </main>
      <Footer />
    </>
  );
}
