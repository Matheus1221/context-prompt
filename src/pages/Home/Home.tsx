import { Header } from "@/components/layout/Header/Header";

export function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-36">
        <section className="mx-auto w-full max-w-300 px-4 py-16">
          <h1 className="text-4xl font-bold text-zinc-900">Home</h1>
        </section>
      </main>
    </div>
  );
}
