mod commands;
mod tray;

pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_store::Builder::new().build())

        .plugin(tauri_plugin_os::init())
        .setup(|app| {
            tray::create_tray(app)?;
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            commands::system::get_system_info,
            commands::files::list_files,
            commands::files::read_file_content,
            commands::notes::save_note,
            commands::notes::load_notes,
            commands::notes::delete_note,
            commands::state::get_app_state,
            commands::state::save_app_state,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
