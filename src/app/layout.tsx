import type { Metadata } from "next";
import "./globals.css";
import { Amplify } from 'aws-amplify';
import outputs from '../../amplify_outputs.json';


Amplify.configure(outputs);

export const metadata: Metadata = {
  title: "Chemical Cabinet"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen w-full flex-col">{children}</body>
    </html>
  );
}
