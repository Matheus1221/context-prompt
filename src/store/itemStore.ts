// store/itemStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PromptItem, PromptItemType } from "../types/promptItem";
import { getTemplateByType } from "../lib/templates";

interface ItemStore {
  items: PromptItem[];
  addItem: (nome: string, tipo: PromptItemType) => void;
  updateItem: (id: string, updates: Partial<PromptItem>) => void;
  deleteItem: (id: string) => void;
  getItemById: (id: string) => PromptItem | undefined;
}

export const useItemStore = create<ItemStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (nome, tipo) => {
        const newPromptItem: PromptItem = {
          id: crypto.randomUUID(),
          nome,
          tipo,
          ferramentas: "",
          descricao: "",
          links: "",
          regras: "",
          checklist: getTemplateByType(tipo),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        set((state) => ({ items: [...state.items, newPromptItem] }));
      },
      updateItem: (id, updates) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id
              ? { ...item, ...updates, updatedAt: new Date().toISOString() }
              : item,
          ),
        }));
      },
      deleteItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },
      getItemById: (id) => get().items.find((item) => item.id === id),
    }),
    { name: "context-prompt-storage" },
  ),
);
