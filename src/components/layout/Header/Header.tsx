import brand from "@/assets/brand-image.png";
import { Input } from "@/components/ui/input";
import { Search, Sparkles } from "lucide-react";

export function Header() {
  return (
    <header className="fixed top-4 left-1/2 z-50 w-[95%] max-w-6xl -translate-x-1/2">
      <div className="overflow-hidden rounded-[1.6rem] border border-border/80 bg-card px-4 py-3 sm:px-5">
        <div className="flex items-center gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <img src={brand} alt="Context Prompt" className="h-10 w-auto object-contain" />
            <div className="hidden min-w-0 md:block">
              <p
                className="truncate text-[0.92rem] font-semibold tracking-tight text-foreground"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Context Prompt
              </p>
              <p className="truncate text-xs text-muted-foreground">
                Fluxo focado para prompts de desenvolvimento
              </p>
            </div>
          </div>

          <div className="relative ml-auto hidden max-w-sm flex-1 md:block">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Busque por item ou contexto..."
              className="h-9 rounded-xl border-border/70 bg-background/90 pl-9 text-sm"
              aria-label="Buscar itens"
            />
          </div>

          <button
            type="button"
            className="inline-flex h-9 items-center gap-2 rounded-xl border border-border/70 bg-background/90 px-3 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Dica de produtividade"
          >
            <Sparkles className="size-3.5 text-primary" />
            <span className="hidden sm:inline">Use templates por tipo</span>
          </button>
        </div>
      </div>
    </header>
  );
}
