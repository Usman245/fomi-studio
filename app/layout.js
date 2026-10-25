import "./globals.css";

export const metadata = {
  title: "Fomi — AI Creative Generation Workspace",
  description:
    "Maximum capability. Minimum complexity. Professional AI image and video generation workspace built with Next.js.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans bg-[#FCFAF8] text-[#191615]">
        {children}
      </body>
    </html>
  );
}
