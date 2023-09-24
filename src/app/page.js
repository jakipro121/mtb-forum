import Image from "next/image";
import styles from "@/app/css/main.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className={styles.title}>
        <h1>
          Dobrodošli na <span>Biciklizam</span><span style={{color: '#991a1a'}}>HR</span> forum
        </h1>
      </div>
      <div className={styles.hero}>
        <Link href="/forum">
          <p>
            Imaš <span className={styles.pitanje}>pitanje?</span> Pogledaj naš{" "}
            <span>forum!</span>
          </p>
          <Image src={"/golden-orbea.png"} width={400} height={400} alt="" />
        </Link>
        <Link href="/marketplace">
          <p>
            Tražiš <span className={styles.pitanje}>bicikl?</span> Pogledaj naš{" "}
            <span>oglasnik!</span>
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
