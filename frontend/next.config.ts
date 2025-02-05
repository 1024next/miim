import type { NextConfig } from "next";
import withPWA from "next-pwa";
const nextConfig: NextConfig = {
  ...withPWA({
    dest: "public", // PWA Service Worker 存放位置
    register: true, // 自动注册 Service Worker
    skipWaiting: true, // 让新 Service Worker 立即生效
    disable: process.env.NODE_ENV === "development",
  }),
  i18n: {
    locales: ["en", "fr", "zh"], // 支持的语言列表
    defaultLocale: "en", // 默认语言
  },
};
export default nextConfig;
