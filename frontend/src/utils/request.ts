// utils/api.ts
import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";

// 设置 API 基础 URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.example.com";

// 创建 axios 实例
const request = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 请求拦截器（可选）
request.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 在这里你可以做全局的请求配置修改
    // 例如加入认证 token（如果需要）
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers['Authorization'] = `Bearer ${token}`;
    // }
    console.log("Request sent:", config);
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// 响应拦截器（可选）
request.interceptors.response.use(
  (response: AxiosResponse) => {
    // 你可以在这里统一处理响应数据
    console.log("Response received:", response);
    return response.data; // 返回响应数据（或者进行格式化处理）
  },
  (error) => {
    // 你可以在这里统一处理错误
    if (error.response) {
      console.error("Response error:", error.response);
    } else {
      console.error("Request error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default request;
