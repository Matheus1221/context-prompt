// lib/promptGenerator.ts
import type { Item } from "../types";

export const generatePrompt = (item: Item): string => {
  const concluidos = item.checklist
    .filter((c) => c.concluido)
    .map((c) => `- [x] ${c.texto}`);
  const pendentes = item.checklist
    .filter((c) => !c.concluido)
    .map((c) => `- [ ] ${c.texto}`);

  return `
## ${item.nome} (${item.tipo})

### Objetivo
${item.descricao || "(não definido)"}

### Itens já definidos
${concluidos.join("\n") || "Nenhum"}

### Itens pendentes
${pendentes.join("\n") || "Nenhum"}

### Links de referência
${item.links || "Nenhum"}

### Observações
${item.observacoes || "Nenhuma"}
  `.trim();
};
