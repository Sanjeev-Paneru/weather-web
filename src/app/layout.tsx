import "@/src/styles/globel.css";
import MainLayout from "./MainLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skeuomorphic Weather Station",
  description: "A richly detailed weather dashboard inspired by analog weather station instruments",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
