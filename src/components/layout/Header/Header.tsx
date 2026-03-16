import brand from "@/assets/brand-image.png";
import { Input } from "@/components/ui/input";
import { Search, History } from "lucide-react";

export function Header() {
  return (
    <header className="fixed top-12.5 left-1/2 z-50 flex h-15 w-[90%] max-w-300 -translate-x-1/2 items-center gap-5 rounded-[50px] border border-white/35 bg-white/25 px-6 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_8px_30px_rgba(15,23,42,0.08)]">
      <div className="flex shrink-0 items-center">
        <img src={brand} alt="Logo" className="h-12 w-auto object-contain" />
      </div>

      <div className="flex-1">
        <Input
          type="text"
          placeholder="Search "
          className="h-8 rounded-2xl border  border-white/30 bg-white/20 px-4 text-sm text-zinc-800  placeholder:text-zinc-500 shadow-lg focus-visible:ring-0 focus-visible:border-white/40"
        />
      </div>

      <button
        type="button"
        aria-label="Buscar"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/40 bg-white/30 text-zinc-800 shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_4px_12px_rgba(15,23,42,0.06)] transition hover:bg-white/40"
      >
        <Search className="h-4 w-4" />
      </button>

      <button
        type="button"
        aria-label="Histórico"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/40 bg-white/30 text-zinc-800 shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_4px_12px_rgba(15,23,42,0.06)] transition hover:bg-white/40"
      >
        <History className="h-4 w-4" />
      </button>
    </header>
  );
}
