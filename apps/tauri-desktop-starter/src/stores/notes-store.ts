import { create } from 'zustand';
import type { Note } from '@/services/commands';
import { deleteNote, loadNotes, saveNote } from '@/services/commands';

interface NotesStore {
  notes: Note[];
  loading: boolean;
  error: string | null;
  fetchNotes: () => Promise<void>;
  addNote: (title: string, content: string) => Promise<void>;
  updateNote: (id: string, title: string, content: string) => Promise<void>;
  removeNote: (id: string) => Promise<void>;
}

export const useNotesStore = create<NotesStore>((set, get) => ({
  notes: [],
  loading: false,
  error: null,

  fetchNotes: async () => {
    set({ loading: true, error: null });
    try {
      const notes = await loadNotes();
      set({ notes, loading: false });
    } catch (e) {
      set({ error: String(e), loading: false });
    }
  },

  addNote: async (title, content) => {
    const note: Note = {
      id: crypto.randomUUID(),
      title,
      content,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    await saveNote(note);
    set({ notes: [...get().notes, note] });
  },

  updateNote: async (id, title, content) => {
    const existing = get().notes.find((n) => n.id === id);
    if (!existing) return;
    const updated = { ...existing, title, content, updated_at: new Date().toISOString() };
    await saveNote(updated);
    set({ notes: get().notes.map((n) => (n.id === id ? updated : n)) });
  },

  removeNote: async (id) => {
    await deleteNote(id);
    set({ notes: get().notes.filter((n) => n.id !== id) });
  },
}));
