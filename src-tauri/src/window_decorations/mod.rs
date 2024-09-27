use objc2_app_kit::{NSColor, NSWindow};
use tauri::WebviewWindow;

#[cfg(target_os = "macos")]
pub trait WindowExt {
    fn fix_decoration(&self);
}

#[cfg(target_os = "macos")]
impl WindowExt for WebviewWindow {
    fn fix_decoration(&self) {
        let ns_window = unsafe {
            (self.ns_window().unwrap().cast() as *mut NSWindow)
                .as_ref()
                .unwrap()
        };

        ns_window.setBackgroundColor(Some(unsafe {
            NSColor::colorWithSRGBRed_green_blue_alpha(255.0, 255.0, 255.0, 1.0).as_ref()
        }));
    }
}
