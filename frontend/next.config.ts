import type { NextConfig } from "next";
import withPWA from "next-pwa";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();
const nextConfig: NextConfig = {
  ...withPWA({
    dest: "public", // PWA Service Worker 存放位置
    register: true, // 自动注册 Service Worker
    skipWaiting: true, // 让新 Service Worker 立即生效
    disable: process.env.NODE_ENV === "development",
  }),
};

export default withNextIntl(nextConfig);
