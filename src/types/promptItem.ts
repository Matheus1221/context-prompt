// types/index.ts
export type PromptItemType = "componente" | "tela" | "formulario";

export interface ChecklistItem {
  id: string;
  texto: string;
  concluido: boolean;
}

export interface PromptItem {
  id: string;
  nome: string;
  tipo: PromptItemType;
  descricao: string;
  links: string;
  observacoes: string;
  checklist: ChecklistItem[];
  createdAt: string;
  updatedAt: string;
}

export type PromptItemStatus = "nao-iniciado" | "em-andamento" | "concluido";
