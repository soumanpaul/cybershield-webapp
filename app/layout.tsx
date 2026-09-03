import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cyber Suraksha | Be Aware. Be Safe. Be Secure.",
  description: "Learn about cyber scams, practise safely, analyze suspicious messages, and get help after an incident.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
