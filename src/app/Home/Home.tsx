import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header/Header";
import { useItemStore } from "@/store/itemStore";
import { getStatus } from "@/hooks/useProgress";
import type { PromptItemType } from "@/types/promptItem";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Trash2,
  ChevronRight,
  Layout,
  Monitor,
  FileText,
  Layers3,
  CircleCheckBig,
  Clock3,
} from "lucide-react";

const typeIcons = {
  componente: Layout,
  tela: Monitor,
  formulario: FileText,
};

const typeLabels = {
  componente: "Componente",
  tela: "Tela",
  formulario: "Formulario",
};

function formatDate(dateValue: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(dateValue));
}

export default function Home() {
  const { items, addItem, deleteItem } = useItemStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [newItemType, setNewItemType] = useState<PromptItemType>("componente");

  const sortedItems = [...items].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );

  const total = items.length;
  const completed = items.filter((item) => {
    if (item.checklist.length === 0) return false;
    return item.checklist.every((task) => task.concluido);
  }).length;
  const inProgress = items.filter((item) => {
    if (item.checklist.length === 0) return false;
    const done = item.checklist.filter((task) => task.concluido).length;
    return done > 0 && done < item.checklist.length;
  }).length;
  const avgProgress =
    total > 0
      ? Math.round(
          items.reduce((acc, item) => {
            if (item.checklist.length === 0) return acc;
            const progress = Math.round(
              (item.checklist.filter((task) => task.concluido).length /
                item.checklist.length) *
                100,
            );
            return acc + progress;
          }, 0) / total,
        )
      : 0;

  const handleAddItem = () => {
    if (newItemName.trim()) {
      addItem(newItemName.trim(), newItemType);
      setNewItemName("");
      setIsModalOpen(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />

      <main className="pb-20 pt-30 md:pt-34">
        <section className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-7">
            <div className="space-y-7 lg:col-span-8">
              <Card className="border-border/70 bg-card">
                <CardContent className="py-9 md:py-11">
                  <p className="mb-3 text-xs font-semibold tracking-[0.22em] text-primary uppercase">
                    Workspace
                  </p>
                  <h1
                    className="text-4xl leading-[0.95] font-semibold tracking-tight text-foreground md:text-6xl"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Biblioteca de contexto para IA
                  </h1>
                  <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
                    Organize contexto por componente, tela e formulario para
                    gerar prompts consistentes e com menos retrabalho.
                  </p>
                </CardContent>
              </Card>

              {sortedItems.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {sortedItems.map((item) => {
                    const progress =
                      item.checklist.length > 0
                        ? Math.round(
                            (item.checklist.filter((c) => c.concluido).length /
                              item.checklist.length) *
                              100,
                          )
                        : 0;
                    const status = getStatus(progress);
                    const TypeIcon = typeIcons[item.tipo];

                    const statusStyles = {
                      concluido:
                        "border-emerald-400/30 bg-emerald-400/15 text-emerald-300",
                      "em-andamento":
                        "border-amber-400/35 bg-amber-400/15 text-amber-200",
                      "nao-iniciado":
                        "border-zinc-500/40 bg-zinc-500/20 text-zinc-300",
                    };

                    const statusLabel =
                      status === "nao-iniciado"
                        ? "Nao iniciado"
                        : status === "em-andamento"
                          ? "Em andamento"
                          : "Concluido";

                    return (
                      <Link
                        to={`/item/${item.id}`}
                        key={item.id}
                        className="block"
                      >
                        <Card className="h-full border-border/75 bg-card transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40">
                          <CardHeader className="pb-3">
                            <CardTitle className="flex items-start justify-between gap-3">
                              <div className="min-w-0">
                                <div className="mb-2 flex items-center gap-2">
                                  <div className="rounded-xl border border-primary/30 bg-primary/12 p-2.5">
                                    <TypeIcon className="size-4 text-primary" />
                                  </div>
                                  <span className="text-xs tracking-wide text-muted-foreground uppercase">
                                    {typeLabels[item.tipo]}
                                  </span>
                                </div>
                                <span className="line-clamp-1 text-base">
                                  {item.nome}
                                </span>
                              </div>

                              <Button
                                variant="ghost"
                                size="icon-sm"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  deleteItem(item.id);
                                }}
                                className="opacity-0 transition-opacity group-hover/card:opacity-100 hover:text-destructive"
                                aria-label={`Remover ${item.nome}`}
                              >
                                <Trash2 className="size-4" />
                              </Button>
                            </CardTitle>
                          </CardHeader>

                          <CardContent className="pt-0">
                            <div className="mb-4 flex items-center justify-between gap-2">
                              <span
                                className={`rounded-full border px-2 py-0.5 text-xs ${statusStyles[status]}`}
                              >
                                {statusLabel}
                              </span>
                              <span className="text-xs font-medium text-muted-foreground">
                                Atualizado {formatDate(item.updatedAt)}
                              </span>
                            </div>

                            <div className="mb-4">
                              <div className="mb-1.5 flex items-center justify-between text-xs">
                                <span className="text-muted-foreground">
                                  Progresso
                                </span>
                                <span className="font-medium text-foreground">
                                  {progress}%
                                </span>
                              </div>
                              <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                                <div
                                  className="h-full rounded-full bg-primary transition-all duration-500"
                                  style={{ width: `${progress}%` }}
                                />
                              </div>
                            </div>

                            <div className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                              Ver detalhes
                              <ChevronRight className="size-4 transition-transform group-hover/card:translate-x-0.5" />
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <Card className="border-dashed border-border/70 bg-card/80">
                  <CardContent className="flex flex-col items-center py-16 text-center">
                    <div className="mb-5 rounded-2xl border border-primary/30 bg-primary/10 p-4">
                      <Plus className="size-8 text-primary" />
                    </div>
                    <h2 className="mb-2 text-xl font-semibold">
                      Nenhum item criado
                    </h2>
                    <p className="mb-6 max-w-md text-muted-foreground">
                      Inicie com um item e use checklist, links e observacoes
                      para montar prompts consistentes.
                    </p>
                    <Button
                      onClick={() => setIsModalOpen(true)}
                      className="gap-2"
                    >
                      <Plus className="size-4" />
                      Criar primeiro item
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>

            <aside className="space-y-4 lg:col-span-4 lg:sticky lg:top-30 lg:self-start">
              <Card className="border-primary/25 bg-card">
                <CardHeader>
                  <CardTitle className="text-sm uppercase tracking-wide text-muted-foreground">
                    Visao geral
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-border/70 bg-background/80 p-3">
                    <p className="text-xs text-muted-foreground">Total</p>
                    <p className="mt-1 flex items-center gap-1 text-2xl font-semibold">
                      <Layers3 className="size-4 text-primary" />
                      {total}
                    </p>
                  </div>
                  <div className="rounded-xl border border-border/70 bg-background/80 p-3">
                    <p className="text-xs text-muted-foreground">Concluidos</p>
                    <p className="mt-1 flex items-center gap-1 text-2xl font-semibold">
                      <CircleCheckBig className="size-4 text-emerald-400" />
                      {completed}
                    </p>
                  </div>
                  <div className="rounded-xl border border-border/70 bg-background/80 p-3">
                    <p className="text-xs text-muted-foreground">
                      Em andamento
                    </p>
                    <p className="mt-1 flex items-center gap-1 text-2xl font-semibold">
                      <Clock3 className="size-4 text-amber-300" />
                      {inProgress}
                    </p>
                  </div>
                  <div className="rounded-xl border border-border/70 bg-background/80 p-3">
                    <p className="text-xs text-muted-foreground">Media</p>
                    <p className="mt-1 text-2xl font-semibold">
                      {avgProgress}%
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/70 bg-card/92">
                <CardHeader>
                  <CardTitle className="text-lg">Novo item</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Crie itens curtos e objetivos para manter seus prompts
                    limpos.
                  </p>
                  <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full gap-2" size="lg">
                        <Plus className="size-4" />
                        Adicionar item
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Criar novo item</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-5 pt-2">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Nome</label>
                          <Input
                            placeholder="Ex: Header da landing page"
                            value={newItemName}
                            onChange={(e) => setNewItemName(e.target.value)}
                            onKeyDown={(e) =>
                              e.key === "Enter" && handleAddItem()
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Tipo</label>
                          <Select
                            value={newItemType}
                            onValueChange={(value) =>
                              setNewItemType(value as PromptItemType)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="componente">
                                <div className="flex items-center gap-2">
                                  <Layout className="size-4" />
                                  Componente
                                </div>
                              </SelectItem>
                              <SelectItem value="tela">
                                <div className="flex items-center gap-2">
                                  <Monitor className="size-4" />
                                  Tela
                                </div>
                              </SelectItem>
                              <SelectItem value="formulario">
                                <div className="flex items-center gap-2">
                                  <FileText className="size-4" />
                                  Formulario
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button
                          onClick={handleAddItem}
                          className="w-full"
                          size="lg"
                        >
                          Criar item
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            </aside>
          </div>
        </section>
      </main>
    </div>
  );
}
