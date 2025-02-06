import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
// 配置 PostCSS 插件
const config = {
  plugins: [
    tailwindcss, // 使用正确的 Tailwind CSS PostCSS 插件
    autoprefixer,
  ],
};

export default config;
