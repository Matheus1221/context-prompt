// store/itemStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Item, ItemType } from "../types";
import { getTemplateByType } from "../lib/templates";

interface ItemStore {
  items: Item[];
  addItem: (nome: string, tipo: ItemType) => void;
  updateItem: (id: string, updates: Partial<Item>) => void;
  deleteItem: (id: string) => void;
  getItemById: (id: string) => Item | undefined;
}

export const useItemStore = create<ItemStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (nome, tipo) => {
        const newItem: Item = {
          id: crypto.randomUUID(),
          nome,
          tipo,
          descricao: "",
          links: "",
          observacoes: "",
          checklist: getTemplateByType(tipo),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        set((state) => ({ items: [...state.items, newItem] }));
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
