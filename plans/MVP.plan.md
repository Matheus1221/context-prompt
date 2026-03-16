# Plano de Desenvolvimento - MVP Context Prompt

## Visão Geral do Projeto

**Stack:** Vite + React 19 + TypeScript + Tailwind CSS v4 + shadcn/ui + Zustand + localStorage

Este é o plano de implementação do MVP baseado nas melhores práticas modernas para a stack definida e no documento de product.md.

---

## 1. Estrutura de Diretórios

```
src/
├── app/                    # Páginas/Rotas
│   ├── Home/
│   │   ├── Home.tsx
│   │   └── index.ts
│   └── ItemDetail/
│       ├── ItemDetail.tsx
│       └── index.ts
├── components/
│   ├── ui/                 # Componentes base shadcn
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   ├── Checkbox.tsx
│   │   └── ...
│   ├── layout/
│   │   └── Header/
├── hooks/                  # Custom hooks
│   ├── useLocalStorage.ts
│   └── useProgress.ts
├── lib/
│   ├── utils.ts           # cn() helper
│   ├── storage.ts         # Funções de persistência
│   └── templates.ts       # Templates de checklist
├── types/                  # Definições TypeScript
│   └── index.ts
├── store/                  # Estado global (Zustand)
│   └── itemStore.ts
├── App.tsx
├── main.tsx
└── index.css
```

---

## 2. Tipos TypeScript

```typescript
// types/index.ts
export type ItemType = 'componente' | 'tela' | 'formulario';

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

export type ItemStatus = 'nao-iniciado' | 'em-andamento' | 'concluido';
```

---

## 3. Estado Global (Zustand)

```typescript
// store/itemStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Item, ItemType } from '../types';
import { getTemplateByType } from '../lib/templates';

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
          descricao: '',
          links: '',
          observacoes: '',
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
              : item
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
    { name: 'context-prompt-storage' }
  )
);
```

---

## 4. Templates de Checklist

```typescript
// lib/templates.ts
import { ChecklistItem } from '../types';

export const TEMPLATES: Record<string, ChecklistItem[]> = {
  componente: [
    { id: '1', texto: 'Definir objetivo do componente', concluido: false },
    { id: '2', texto: 'Definir estrutura visual', concluido: false },
    { id: '3', texto: 'Definir estados principais', concluido: false },
    { id: '4', texto: 'Implementar responsividade', concluido: false },
    { id: '5', texto: 'Revisar estilos', concluido: false },
    { id: '6', texto: 'Testar integração no contexto da página', concluido: false },
  ],
  tela: [
    { id: '1', texto: 'Definir objetivo da tela', concluido: false },
    { id: '2', texto: 'Mapear seções principais', concluido: false },
    { id: '3', texto: 'Estruturar layout', concluido: false },
    { id: '4', texto: 'Revisar navegação', concluido: false },
    { id: '5', texto: 'Validar responsividade', concluido: false },
    { id: '6', texto: 'Revisar consistência visual', concluido: false },
  ],
  formulario: [
    { id: '1', texto: 'Definir campos necessários', concluido: false },
    { id: '2', texto: 'Definir validações', concluido: false },
    { id: '3', texto: 'Estruturar layout do formulário', concluido: false },
    { id: '4', texto: 'Tratar estados de erro', concluido: false },
    { id: '5', texto: 'Tratar estado de carregamento', concluido: false },
    { id: '6', texto: 'Revisar envio e feedback visual', concluido: false },
  ],
};

export const getTemplateByType = (tipo: string): ChecklistItem[] => {
  return TEMPLATES[tipo] || [];
};
```

---

## 5. Hooks Personalizados

```typescript
// hooks/useProgress.ts
import { useMemo } from 'react';
import { Item } from '../types';

export const useProgress = (item: Item) => {
  return useMemo(() => {
    const total = item.checklist.length;
    if (total === 0) return 0;
    const concluidos = item.checklist.filter((c) => c.concluido).length;
    return Math.round((concluidos / total) * 100);
  }, [item.checklist]);
};

export const getStatus = (progress: number): ItemStatus => {
  if (progress === 0) return 'nao-iniciado';
  if (progress === 100) return 'concluido';
  return 'em-andamento';
};
```

---

## 6. Geração do Prompt Final

```typescript
// lib/promptGenerator.ts
import { Item } from '../types';

export const generatePrompt = (item: Item): string => {
  const concluidos = item.checklist.filter(c => c.concluido).map(c => `- [x] ${c.texto}`);
  const pendentes = item.checklist.filter(c => !c.concluido).map(c => `- [ ] ${c.texto}`);

  return `
## ${item.nome} (${item.tipo})

### Objetivo
${item.descricao || '(não definido)'}

### Itens já definidos
${concluidos.join('\n') || 'Nenhum'}

### Itens pendentes
${pendentes.join('\n') || 'Nenhum'}

### Links de referência
${item.links || 'Nenhum'}

### Observações
${item.observacoes || 'Nenhuma'}
  `.trim();
};
```

---

## 7. Componentes Principais

### 7.1 ItemCard
- Exibe nome, tipo, progresso (%), status visual
- Ações: abrir detalhe, excluir
- Status: Não iniciado (0%), Em andamento (1-99%), Concluído (100%)

### 7.2 ItemForm (Modal)
- Campos: nome (obrigatório), tipo (obrigatório)
- Tipos disponíveis: componente, tela, formulario

### 7.3 Checklist
- Checkbox editável (marcar/desmarcar)
- Adicionar novo item
- Remover item existente
- Editar texto do item

### 7.4 ContextFields
- Descrição (textarea)
- Links de referência (textarea)
- Observações (textarea)

### 7.5 PromptGenerator
- Gera prompt estruturado com todos os dados
- Botão "Copiar prompt"

---

## 8. Ordem de Implementação

### Fase 1 - Estrutura Base
- [ ] Configurar tipos TypeScript
- [ ] Criar store Zustand com persistência
- [ ] Implementar templates de checklist
- [ ] Configurar rotas (React Router)

### Fase 2 - Funcionalidades Core
- [ ] Tela Home com lista de itens
- [ ] Modal de criação de item
- [ ] Excluir item
- [ ] Detalhe do item

### Fase 3 - Checklist
- [ ] Exibir checklist base
- [ ] Marcar/desmarcar tarefas
- [ ] Adicionar tarefa
- [ ] Remover tarefa
- [ ] Editar texto da tarefa
- [ ] Calcular progresso automático

### Fase 4 - Contexto
- [ ] Campo descrição
- [ ] Campo links
- [ ] Campo observações

### Fase 5 - Prompt Final
- [ ] Gerar prompt estruturado
- [ ] Botão copiar para clipboard

### Fase 6 - Melhorias UI/UX
- [ ] Estados visuais de status
- [ ] Estado vazio
- [ ] Loading states

---

## 9. Comandos de Desenvolvimento

```bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Linting
npm run lint
```

---

## 10. Critérios de Pronto do MVP

- [ ] Criar item com nome e tipo
- [ ] Visualizar itens em cards
- [ ] Abrir detalhe do item
- [ ] Ver checklist inicial
- [ ] Marcar/desmarcar tarefas
- [ ] Editar checklist
- [ ] Ver progresso atualizado
- [ ] Preencher contexto
- [ ] Copiar prompt final
- [ ] Dados persistidos ao fechar/abrir navegador

---

## 11. Melhores Práticas Aplicadas

### Estrutura de Componentes
- Componentização modular baseada em features
- Separação entre componentes UI (shadcn) e componentes de negócio
- Co-localização de arquivos relacionados

### Estado Global
- Zustand com middleware de persistência para localStorage
- Estado minimalista, apenas o necessário para o MVP

### TypeScript
- Tipos explícitos para todas as entidades
- Interfaces bem definidas para Item, ChecklistItem

### Tailwind CSS v4
- Utilização de @theme para customização
- Estilos em CSS com variáveis quando necessário
- Component variants com class-variance-authority (cva)

### Performance
- React.memo para componentes que não precisam re-renderizar
- useMemo para cálculos de progresso
- Lazy loading de rotas se necessário

---

Este plano segue as melhores práticas para a stack Vite + React + TypeScript + Tailwind CSS v4, incluindo componentização modular, estado global com Zustand (mais leve que Redux), e persistência local com Zustand middleware.
