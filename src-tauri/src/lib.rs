use tauri::Builder;

pub fn run() {
  Builder::default()
    .setup(|app| {
      #[cfg(debug_assertions)]
      {
        let _ = app.get_webview_window("main").unwrap().open_devtools();
      }
      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
