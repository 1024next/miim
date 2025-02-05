import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { cookies } from "next/headers";
import Providers from "./providers";
import Modal from "@/components/utils/Modal";
import "@/styles/global.css";
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme")?.value || "system"; // 获取 cookies 中的 theme
  return (
    <html className={theme}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <style></style>
      </head>
      <body>
        <Providers>
          <Header />
          {children}
          <Footer />
          <Modal />
        </Providers>
      </body>
    </html>
  );
}
