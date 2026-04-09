use serde::{Deserialize, Serialize};
use tauri_plugin_store::StoreExt;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Note {
    pub id: String,
    pub title: String,
    pub content: String,
    pub created_at: String,
    pub updated_at: String,
}

#[tauri::command]
pub fn save_note(app: tauri::AppHandle, note: Note) -> Result<(), String> {
    let store = app
        .store("notes.json")
        .map_err(|e| e.to_string())?;

    let mut notes: Vec<Note> = store
        .get("notes")
        .and_then(|v| serde_json::from_value(v).ok())
        .unwrap_or_default();

    if let Some(existing) = notes.iter_mut().find(|n| n.id == note.id) {
        *existing = note;
    } else {
        notes.push(note);
    }

    store.set("notes", serde_json::to_value(&notes).map_err(|e| e.to_string())?);
    store.save().map_err(|e| e.to_string())?;

    Ok(())
}

#[tauri::command]
pub fn load_notes(app: tauri::AppHandle) -> Result<Vec<Note>, String> {
    let store = app
        .store("notes.json")
        .map_err(|e| e.to_string())?;

    let notes: Vec<Note> = store
        .get("notes")
        .and_then(|v| serde_json::from_value(v).ok())
        .unwrap_or_default();

    Ok(notes)
}

#[tauri::command]
pub fn delete_note(app: tauri::AppHandle, id: String) -> Result<(), String> {
    let store = app
        .store("notes.json")
        .map_err(|e| e.to_string())?;

    let mut notes: Vec<Note> = store
        .get("notes")
        .and_then(|v| serde_json::from_value(v).ok())
        .unwrap_or_default();

    notes.retain(|n| n.id != id);

    store.set("notes", serde_json::to_value(&notes).map_err(|e| e.to_string())?);
    store.save().map_err(|e| e.to_string())?;

    Ok(())
}
