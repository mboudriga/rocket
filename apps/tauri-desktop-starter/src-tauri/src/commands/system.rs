use serde::Serialize;

#[derive(Debug, Serialize)]
pub struct SystemInfo {
    pub hostname: String,
    pub os_type: String,
    pub arch: String,
    pub version: String,
    pub platform: String,
}

#[tauri::command]
pub fn get_system_info() -> SystemInfo {
    SystemInfo {
        hostname: tauri_plugin_os::hostname(),
        os_type: tauri_plugin_os::type_().to_string(),
        arch: tauri_plugin_os::arch().to_string(),
        version: tauri_plugin_os::version().to_string(),
        platform: tauri_plugin_os::platform().to_string(),
    }
}
