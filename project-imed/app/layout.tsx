import "./globals.css";
import "./data-tables-css.css";
import "./satoshi.css";
import ToasterProvider from "@/app/providers/ToasterProvider";
import NextAutProviders from "@/app/providers/nextAuthProvider";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
 
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <div className="dark:bg-boxdark-2 dark:text-bodydark ">
          <ToasterProvider />
          <NextAutProviders>
            {children}
          </NextAutProviders>
        </div>
      </body>
    </html>
  );
}
