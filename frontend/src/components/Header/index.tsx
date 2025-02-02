"use client";
import { useState } from "react";
import Link from "next/link";
import styles from "./Header.module.scss"; // 引入CSS模块

// 导航链接数据
const navLinks = [
  { href: "/", label: "首页" },
  { href: "/createPost", label: "Post" },
  // { href: "/about", label: "关于" },
  // { href: "/contact", label: "联系" },
];

// 导出 Header 组件
export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.headerInner}>
          {/* Logo */}
          <Link href="/" className={styles.logo}></Link>

          {/* Desktop Menu */}
          <nav className={styles.desktopNav}>
            {navLinks.map(({ href, label }) => (
              <Link key={href} href={href} className={styles.navLink}>
                {label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className={styles.mobileMenuButton}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <nav className={styles.mobileNav}>
            {navLinks.map(({ href, label }) => (
              <Link key={href} href={href} className={styles.navLink}>
                {label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
