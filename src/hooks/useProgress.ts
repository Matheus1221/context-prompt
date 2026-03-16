// hooks/useProgress.ts
import { useMemo } from "react";
import type { Item, ItemStatus } from "../types";

export const useProgress = (item: Item) => {
  return useMemo(() => {
    const total = item.checklist.length;
    if (total === 0) return 0;
    const concluidos = item.checklist.filter((c) => c.concluido).length;
    return Math.round((concluidos / total) * 100);
  }, [item.checklist]);
};

export const getStatus = (progress: number): ItemStatus => {
  if (progress === 0) return "nao-iniciado";
  if (progress === 100) return "concluido";
  return "em-andamento";
};
