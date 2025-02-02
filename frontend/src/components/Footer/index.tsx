import styles from "./Footer.module.scss"; // 引入 SCSS 模块

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.text}>
          &copy; {new Date().getFullYear()} MyWebsite. All rights reserved.
        </p>
        <nav className={styles.nav}>
          <a href="/privacy" className={styles.link}>
            隐私政策
          </a>
          <a href="/terms" className={styles.link}>
            服务条款
          </a>
        </nav>
      </div>
    </footer>
  );
}
