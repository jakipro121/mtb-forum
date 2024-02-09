import Image from "next/image";
import styles from "@/css/main.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className={styles.title}>
        <h1>
          Dobrodošli na <span style={{color: '#990000'}}>Biciklizam</span><span style={{color: '#991a1a'}}>HR</span> forum
        </h1>
      </div>
      <div className={styles.hero}>
        <Link href="/forum">
          <p>
            Imaš <span className={styles.pitanje} style={{color: '#f3c730'}}>pitanje?</span> Pogledaj naš{" "}
            <span style={{color: '#f3c730'}}>forum!</span>
          </p>
          <Image src={"/golden-orbea.png"} width={400} height={400} alt="" />
        </Link>
        <Link href="/forum/category/marketplace">
          <p>
            Tražiš <span className={styles.pitanje} style={{color: '#f3c730'}}>bicikl?</span> Pogledaj naš{" "}
            <span style={{color: '#f3c730'}}>oglasnik!</span>
          </p>
          <div>
            <Image
              src={"/orbea-golden-fully.png"}
              width={400}
              height={400}
              className={styles.flip}
              alt=""
            />
          </div>
        </Link>
      </div>
    </>
  );
}
