"use client";
import Link from "next/link";
import { useDispatch } from "react-redux";
import styles from "./Header.module.scss"; // 引入CSS模块
import { openModal, openPersistentModal } from "@/store/modalSlice";
import { ModalEnum } from "@/enum/ModalEnum";
const navLinks = [
  { href: "/", label: "首页" },
  { href: "/createPost", label: "Post" },
];

export default function Header() {
  const dispatch = useDispatch();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.headerInner}>
          <Link href="/" className={styles.logo}></Link>

          <nav className={styles.desktopNav}>
            {navLinks.map(({ href, label }) => (
              <Link key={href} href={href} className={styles.navLink}>
                {label}
              </Link>
            ))}
            <button
              onClick={() =>
                dispatch(openPersistentModal(ModalEnum.LoginModal))
              }
            >
              打开登录弹窗
            </button>
            <button
              onClick={() =>
                dispatch(openPersistentModal(ModalEnum.SignupModal))
              }
            >
              打开注册弹窗
            </button>
            <button
              onClick={() =>
                dispatch(openModal({ title: "弹窗 3", content: "内容 1" }))
              }
            >
              打开普通弹窗
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
