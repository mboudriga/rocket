use serde::{Deserialize, Serialize};
use tauri_plugin_store::StoreExt;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AppState {
    pub last_page: String,
    pub sidebar_open: bool,
    pub theme: String,
}

impl Default for AppState {
    fn default() -> Self {
        Self {
            last_page: "home".to_string(),
            sidebar_open: true,
            theme: "system".to_string(),
        }
    }
}

#[tauri::command]
pub fn get_app_state(app: tauri::AppHandle) -> Result<AppState, String> {
    let store = app
        .store("settings.json")
        .map_err(|e| e.to_string())?;

    let state: AppState = store
        .get("app_state")
        .and_then(|v| serde_json::from_value(v).ok())
        .unwrap_or_default();

    Ok(state)
}

#[tauri::command]
pub fn save_app_state(app: tauri::AppHandle, state: AppState) -> Result<(), String> {
    let store = app
        .store("settings.json")
        .map_err(|e| e.to_string())?;

    store.set("app_state", serde_json::to_value(&state).map_err(|e| e.to_string())?);
    store.save().map_err(|e| e.to_string())?;

    Ok(())
}
