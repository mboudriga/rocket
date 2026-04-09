use serde::Serialize;
use std::fs;
use std::path::PathBuf;

#[derive(Debug, Serialize)]
pub struct FileEntry {
    pub name: String,
    pub path: String,
    pub is_dir: bool,
    pub size: u64,
}

#[derive(Debug, thiserror::Error)]
pub enum FileError {
    #[error("IO error: {0}")]
    Io(#[from] std::io::Error),
    #[error("Access denied: {0}")]
    AccessDenied(String),
}

impl serde::Serialize for FileError {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        serializer.serialize_str(&self.to_string())
    }
}

fn validate_path(path: &str) -> Result<PathBuf, FileError> {
    let path = PathBuf::from(path);
    let canonical = path
        .canonicalize()
        .map_err(|_| FileError::AccessDenied(format!("Invalid path: {}", path.display())))?;

    // Block access to sensitive system directories
    let blocked = ["/etc/shadow", "/etc/passwd", "C:\\Windows\\System32\\config"];
    for b in &blocked {
        if canonical.starts_with(b) {
            return Err(FileError::AccessDenied(format!(
                "Access to {} is restricted",
                canonical.display()
            )));
        }
    }

    Ok(canonical)
}

#[tauri::command]
pub fn list_files(path: String) -> Result<Vec<FileEntry>, FileError> {
    let dir = validate_path(&path)?;
    let mut entries = Vec::new();

    for entry in fs::read_dir(dir)? {
        let entry = entry?;
        let metadata = entry.metadata()?;
        entries.push(FileEntry {
            name: entry.file_name().to_string_lossy().to_string(),
            path: entry.path().to_string_lossy().to_string(),
            is_dir: metadata.is_dir(),
            size: metadata.len(),
        });
    }

    entries.sort_by(|a, b| {
        b.is_dir.cmp(&a.is_dir).then(a.name.to_lowercase().cmp(&b.name.to_lowercase()))
    });

    Ok(entries)
}

#[tauri::command]
pub fn read_file_content(path: String) -> Result<String, FileError> {
    let canonical = validate_path(&path)?;
    Ok(fs::read_to_string(canonical)?)
}
