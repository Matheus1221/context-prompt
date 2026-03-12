import styles from "./Home.module.scss";
import Button from "@/components/ui/button";

export function Home() {
  return (
    <div className={styles.page}>
      <main>
        <h1 className="text-4xl font-bold text-blue-500">Tailwind</h1>
        <Button>Click me</Button>
      </main>
    </div>
  );
}
