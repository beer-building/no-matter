use objc2_app_kit::{
    NSHapticFeedbackManager, NSHapticFeedbackPattern, NSHapticFeedbackPerformanceTime,
    NSHapticFeedbackPerformer,
};
use tauri::Manager;
use tauri_plugin_decorum::WebviewWindowExt;

mod window_decorations;
use window_decorations::WindowExt;
//

#[tauri::command]
fn haptic_feedback() {
    let manager = unsafe { NSHapticFeedbackManager::defaultPerformer() };
    unsafe {
        manager.performFeedbackPattern_performanceTime(
            NSHapticFeedbackPattern::Generic,
            NSHapticFeedbackPerformanceTime::Default,
        )
    };
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_http::init())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_decorum::init())
        .invoke_handler(tauri::generate_handler![haptic_feedback])
        .setup(|app| {
            let window = app.get_webview_window("main").unwrap();

            #[cfg(target_os = "macos")]
            {
                window.set_traffic_lights_inset(12.0, 16.0).unwrap();
                window.fix_decoration();

                // window.make_transparent().unwrap();
                // window.set_window_level(25).unwrap();
            }

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
