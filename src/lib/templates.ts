// lib/templates.ts
import type { ChecklistItem } from "../types/promptItem";

export const TEMPLATES: Record<string, ChecklistItem[]> = {
  componente: [
    { id: "1", texto: "Definir objetivo do componente", concluido: false },
    { id: "2", texto: "Definir estrutura visual", concluido: false },
    { id: "3", texto: "Definir estados principais", concluido: false },
    { id: "4", texto: "Implementar responsividade", concluido: false },
    { id: "5", texto: "Revisar estilos", concluido: false },
    {
      id: "6",
      texto: "Testar integração no contexto da página",
      concluido: false,
    },
  ],
  tela: [
    { id: "1", texto: "Definir objetivo da tela", concluido: false },
    { id: "2", texto: "Mapear seções principais", concluido: false },
    { id: "3", texto: "Estruturar layout", concluido: false },
    { id: "4", texto: "Revisar navegação", concluido: false },
    { id: "5", texto: "Validar responsividade", concluido: false },
    { id: "6", texto: "Revisar consistência visual", concluido: false },
  ],
  formulario: [
    { id: "1", texto: "Definir campos necessários", concluido: false },
    { id: "2", texto: "Definir validações", concluido: false },
    { id: "3", texto: "Estruturar layout do formulário", concluido: false },
    { id: "4", texto: "Tratar estados de erro", concluido: false },
    { id: "5", texto: "Tratar estado de carregamento", concluido: false },
    { id: "6", texto: "Revisar envio e feedback visual", concluido: false },
  ],
};

export const getTemplateByType = (tipo: string): ChecklistItem[] => {
  return TEMPLATES[tipo] || [];
};
