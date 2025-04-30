import Image from "next/image";
import styles from "./page.module.css";
import ChatHome from "@/components/ChatHome";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Squad Rolls</h1>
        <ChatHome />
      </main>
      <footer className={styles.footer}>
      </footer>
    </div>
  );
}
