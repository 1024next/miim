import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { cookies } from "next/headers";
import "@/styles/global.css";
import Providers from "./providers";
// 获取主题的 `getServerSideProps`

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme")?.value || "system"; // 获取 cookies 中的 theme
  return (
    <html lang="en" className={theme}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <style></style>
      </head>
      <body>
        <Header />
        <Providers>{children}</Providers>
        <Footer />
      </body>
    </html>
  );
}
