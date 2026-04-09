const isTauri = typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window;

export interface SystemInfo {
  hostname: string;
  os_type: string;
  arch: string;
  version: string;
  platform: string;
}

export interface FileEntry {
  name: string;
  path: string;
  is_dir: boolean;
  size: number;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface AppState {
  last_page: string;
  sidebar_open: boolean;
  theme: string;
}

async function tauriInvoke<T>(command: string, args?: Record<string, unknown>): Promise<T> {
  if (!isTauri) throw new Error('Not running in Tauri');
  const { invoke } = await import('@tauri-apps/api/core');
  return invoke<T>(command, args);
}

export function getSystemInfo() {
  return tauriInvoke<SystemInfo>('get_system_info');
}

export function listFiles(path: string) {
  return tauriInvoke<FileEntry[]>('list_files', { path });
}

export function readFileContent(path: string) {
  return tauriInvoke<string>('read_file_content', { path });
}

export function saveNote(note: Note) {
  return tauriInvoke<void>('save_note', { note });
}

export function loadNotes() {
  return tauriInvoke<Note[]>('load_notes');
}

export function deleteNote(id: string) {
  return tauriInvoke<void>('delete_note', { id });
}

export function getAppState() {
  return tauriInvoke<AppState>('get_app_state');
}

export function saveAppState(state: AppState) {
  return tauriInvoke<void>('save_app_state', { state });
}
