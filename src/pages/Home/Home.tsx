import { Button } from "@/components/ui/button";
import styles from "./Home.module.scss";
import { Header } from "@/components/Header/Header";

export function Home() {
  return (
    <div className={styles.page}>
      <Header />
      <main>
        <h1>Olá Mundo Porra</h1>
        <Button>Click me</Button>
      </main>
    </div>
  );
}
