import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/layout/Header/Header";
import { useItemStore } from "@/store/itemStore";
import { generatePrompt } from "@/lib/promptGenerator";
import type { ChecklistItem } from "@/types/promptItem";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Plus,
  Trash2,
  Copy,
  Check,
  Link as LinkIcon,
  FileText,
  MessageSquare,
  ListChecks,
  Layout,
  Monitor,
  FileText as FormIcon,
  CircleCheckBig,
} from "lucide-react";

const typeIcons = {
  componente: Layout,
  tela: Monitor,
  formulario: FormIcon,
};

const ItemDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { items, updateItem } = useItemStore();
  const item = items.find((i) => i.id === id);

  const [newTaskText, setNewTaskText] = useState("");
  const [copied, setCopied] = useState(false);

  const progress = item
    ? item.checklist.length > 0
      ? Math.round(
          (item.checklist.filter((c) => c.concluido).length /
            item.checklist.length) *
            100,
        )
      : 0
    : 0;

  if (!item) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-28 md:pt-32">
          <section className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16">
                <p className="mb-4 text-lg">Item nao encontrado.</p>
                <Link to="/">
                  <Button>Voltar para Home</Button>
                </Link>
              </CardContent>
            </Card>
          </section>
        </main>
      </div>
    );
  }

  const TypeIcon = typeIcons[item.tipo];

  const handleChecklistChange = (taskId: string, concluido: boolean) => {
    const updatedChecklist = item.checklist.map((task) =>
      task.id === taskId ? { ...task, concluido } : task,
    );
    updateItem(item.id, { checklist: updatedChecklist });
  };

  const handleAddTask = () => {
    if (newTaskText.trim()) {
      const newTask: ChecklistItem = {
        id: crypto.randomUUID(),
        texto: newTaskText.trim(),
        concluido: false,
      };
      updateItem(item.id, { checklist: [...item.checklist, newTask] });
      setNewTaskText("");
    }
  };

  const handleRemoveTask = (taskId: string) => {
    const updatedChecklist = item.checklist.filter(
      (task) => task.id !== taskId,
    );
    updateItem(item.id, { checklist: updatedChecklist });
  };

  const handleContextChange = (
    field: "descricao" | "links" | "observacoes",
    value: string,
  ) => {
    updateItem(item.id, { [field]: value });
  };

  const handleCopyPrompt = () => {
    const prompt = generatePrompt(item);
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generatedPrompt = generatePrompt(item);
  const completedTasks = item.checklist.filter((task) => task.concluido).length;

  return (
    <div className="min-h-screen">
      <Header />

      <main className="pb-20 pt-30 md:pt-34">
        <section className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <Link
            to="/"
            className="mb-5 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Voltar
          </Link>

          <Card className="mb-6 border-border/70 bg-card">
            <CardContent className="py-7">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex min-w-0 items-start gap-3">
                  <div className="rounded-xl border border-primary/30 bg-primary/10 p-3">
                    <TypeIcon className="size-6 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <h1
                      className="line-clamp-2 text-3xl leading-[0.96] font-semibold tracking-tight md:text-5xl"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {item.nome}
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground capitalize">
                      {item.tipo}
                    </p>
                  </div>
                </div>

                <div className="rounded-xl border border-border/70 bg-background/85 px-3 py-2 text-right">
                  <p className="text-xs text-muted-foreground">
                    Progresso total
                  </p>
                  <p className="text-xl font-semibold">{progress}%</p>
                </div>
              </div>

              <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
            <div className="space-y-6">
              <Card className="border-border/70 bg-card/92">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ListChecks className="size-5 text-primary" />
                    Checklist
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 space-y-2">
                    {item.checklist.map((task) => (
                      <div
                        key={task.id}
                        className="group flex items-center gap-3 rounded-xl border border-border/65 bg-background/80 p-3 transition-colors hover:border-primary/35"
                      >
                        <Checkbox
                          checked={task.concluido}
                          onCheckedChange={(checked) =>
                            handleChecklistChange(task.id, checked as boolean)
                          }
                          className="shrink-0"
                        />
                        <span
                          className={`flex-1 transition-all ${
                            task.concluido
                              ? "text-muted-foreground line-through"
                              : ""
                          }`}
                        >
                          {task.texto}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => handleRemoveTask(task.id)}
                          className="opacity-0 transition-opacity group-hover:opacity-100 hover:text-destructive"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    ))}

                    {item.checklist.length === 0 && (
                      <p className="py-6 text-center text-muted-foreground">
                        Nenhuma tarefa adicionada.
                      </p>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Input
                      placeholder="Nova tarefa..."
                      value={newTaskText}
                      onChange={(e) => setNewTaskText(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
                    />
                    <Button onClick={handleAddTask} size="icon">
                      <Plus className="size-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/70 bg-card/92">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="size-5 text-primary" />
                    Prompt gerado
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="max-h-95 overflow-auto rounded-xl border border-border/70 bg-background/82 p-4 text-sm leading-relaxed">
                    {generatedPrompt}
                  </pre>
                </CardContent>
              </Card>
            </div>

            <aside className="space-y-4 lg:sticky lg:top-30 lg:self-start">
              <Card className="border-primary/25 bg-card">
                <CardContent className="py-4">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-sm font-medium">Resumo rapido</p>
                    <CircleCheckBig className="size-4 text-emerald-400" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {completedTasks} de {item.checklist.length} tarefas
                    concluidas.
                  </p>
                  <Button
                    onClick={handleCopyPrompt}
                    variant="outline"
                    size="sm"
                    className="mt-4 w-full gap-2"
                  >
                    {copied ? (
                      <>
                        <Check className="size-4" />
                        Copiado
                      </>
                    ) : (
                      <>
                        <Copy className="size-4" />
                        Copiar prompt
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-border/70 bg-card/92">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="size-5 text-primary" />
                    Descricao
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Descreva o objetivo deste item..."
                    value={item.descricao}
                    onChange={(e) =>
                      handleContextChange("descricao", e.target.value)
                    }
                    className="min-h-30"
                  />
                </CardContent>
              </Card>

              <Card className="border-border/70 bg-card/92">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LinkIcon className="size-5 text-primary" />
                    Links de referencia
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Cole links uteis (um por linha)..."
                    value={item.links}
                    onChange={(e) =>
                      handleContextChange("links", e.target.value)
                    }
                    className="min-h-30"
                  />
                </CardContent>
              </Card>

              <Card className="border-border/70 bg-card/92">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="size-5 text-primary" />
                    Observacoes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Observacoes adicionais..."
                    value={item.observacoes}
                    onChange={(e) =>
                      handleContextChange("observacoes", e.target.value)
                    }
                    className="min-h-27.5"
                  />
                </CardContent>
              </Card>
            </aside>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ItemDetail;
