// types/index.ts
export type ItemType = "componente" | "tela" | "formulario";

export interface ChecklistItem {
  id: string;
  texto: string;
  concluido: boolean;
}

export interface Item {
  id: string;
  nome: string;
  tipo: ItemType;
  descricao: string;
  links: string;
  observacoes: string;
  checklist: ChecklistItem[];
  createdAt: string;
  updatedAt: string;
}

export type ItemStatus = "nao-iniciado" | "em-andamento" | "concluido";
