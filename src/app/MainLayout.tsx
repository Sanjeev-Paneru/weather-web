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
      <main className="min-h-screen flex flex-col items-center justify-start" style={{ background: 'var(--bg-primary)' }}>
        {children}
      </main>
      <Footer />
    </>
  );
}
