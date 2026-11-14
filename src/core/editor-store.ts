import { createStore } from 'zustand/vanilla';
import type { ProjectDocument } from '../modules/projects/document';

export interface EditorState {
  document: ProjectDocument;
  editVersion: number;
  selectedNodeIds: readonly string[];
  past: readonly ProjectDocument[];
  future: readonly ProjectDocument[];
  apply(document: ProjectDocument): void;
  undo(): void;
  redo(): void;
}

/** Per editor instance. Never a mutable server singleton or implicit persistence. */
export function createEditorStore(document: ProjectDocument) {
  return createStore<EditorState>()((set) => ({
    document: structuredClone(document),
    editVersion: 0,
    selectedNodeIds: [],
    past: [],
    future: [],
    apply: (next) =>
      set((state) => ({
        document: structuredClone(next),
        editVersion: state.editVersion + 1,
        past: [...state.past.slice(-49), state.document],
        future: [],
      })),
    undo: () =>
      set((state) => {
        const previous = state.past.at(-1);
        return previous
          ? {
              document: previous,
              editVersion: state.editVersion + 1,
              past: state.past.slice(0, -1),
              future: [state.document, ...state.future],
              selectedNodeIds: [],
            }
          : state;
      }),
    redo: () =>
      set((state) => {
        const next = state.future[0];
        return next
          ? {
              document: next,
              editVersion: state.editVersion + 1,
              past: [...state.past, state.document],
              future: state.future.slice(1),
              selectedNodeIds: [],
            }
          : state;
      }),
  }));
}
export type EditorStore = ReturnType<typeof createEditorStore>;
