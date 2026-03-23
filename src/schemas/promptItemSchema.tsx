import { z } from "zod";

const PromptItemType = ["componente", "tela", "formulario"] as const;

const PromptItemStatus = ["nao-iniciado", "em-andamento", "concluido"] as const;

export const promptItemSchema = z.object({
  nome: z
    .string()
    .trim()
    .min(3, "Nome é obrigatório")
    .regex(/^[^0-9]*$/, "O campo não pode conter números"),
  tipo: z.enum(PromptItemType, {
    error: "Tipo deve ser um dos seguintes: componente, tela ou formulario",
  }),
  descricao: z
    .string()
    .trim()
    .min(20, "Descrição deve conter pelo menos 10 caracteres"),
  ferramentas: z.string().trim(),
  links: z.string().trim(),
  regras: z.string().trim(),
  status: z.enum(PromptItemStatus, {
    error:
      "Status deve ser um dos seguintes: nao-iniciado, em-andamento ou concluido",
  }),
});

export type PromptItemData = z.infer<typeof promptItemSchema>;
