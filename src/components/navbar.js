import Link from "next/link";
import styles from "@/app/css/navbar.module.css";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <div className={`${styles.logo} ${styles.left}`}>
        <Link href={"/"}>
          <Image src={"/disk-brake.png"} width={20} height={20} alt="logo" />
          <p>BiciklizamHR</p>
        </Link>
      </div>
      <div className={styles.right}>
        <Link href={"/forum"} className={styles.link}>
          Forum
        </Link>
        <Link href={"/about"} className={styles.link}>
          About
        </Link>
      </div>
    </nav>
  );
}
