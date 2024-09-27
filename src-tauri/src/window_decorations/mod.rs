// mod macos;

use objc2::{declare_class, rc::Retained};
use objc2_app_kit::{NSColor, NSToolbar, NSWindow, NSWindowDelegate, NSWindowToolbarStyle};
use objc2_foundation::MainThreadMarker;
// use self::macos::{set_titlebar_thickness, unified_titlebar_macos, ToolbarThickness};
use tauri::WebviewWindow;

pub enum ToolbarThickness {
    Thick,
    Medium,
    Thin,
}

#[cfg(target_os = "macos")]
pub trait WindowExt {
    fn fix_decoration(&self);
    fn set_toolbar(&self, thickness: ToolbarThickness);
}

fn make_toolbar(window: &NSWindow) -> Retained<NSToolbar> {
    let mtm = MainThreadMarker::new().unwrap();
    let toolbar = unsafe { NSToolbar::new(mtm) };
    unsafe { toolbar.setShowsBaselineSeparator(false) };

    unsafe { window.setToolbar(Some(toolbar.as_ref())) };

    return toolbar;
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
    fn set_toolbar(&self, thickness: ToolbarThickness) {
        let ns_window = unsafe {
            (self.ns_window().unwrap().cast() as *mut NSWindow)
                .as_ref()
                .unwrap()
        };

        match thickness {
            ToolbarThickness::Thick => {
                self.set_title("").expect("Title wasn't set to ''");
                unsafe {
                    ns_window.setToolbarStyle(
                        NSWindowToolbarStyle::Unified, // cocoa::appkit::NSWindowToolbarStyle::NSWindowToolbarStyleUnified,
                    )
                };
                // window.setTitleVisibility_(NSWindowTitleVisibility::NSWindowTitleVisible);
                unsafe { make_toolbar(ns_window) };
            }
            ToolbarThickness::Medium => {
                unsafe { make_toolbar(ns_window) };
            }
            ToolbarThickness::Thin => {}
        }

        // let delegate = unsafe { NSWindowDelegate::new(ns_window) };

        // extern "C" fn on_enter_fullscreen(this: &Object, _cmd: Sel, _notification: id) {
        //     unsafe {
        //         let window: id = *this.get_ivar("window");
        //         window.toolbar().setIsVisible_(NO);
        //     }
        // }
        // extern "C" fn on_exit_fullscreen(this: &Object, _cmd: Sel, _notification: id) {
        //     unsafe {
        //         let window: id = *this.get_ivar("window");
        //         window.toolbar().setIsVisible_(YES);
        //     }
        // }
        // let delegate_name = format!("window_delegate_{}", tauri_win.label());
        // let dn = delegate_name.as_str();

        // unsafe {
        //     window.setDelegate_(delegate!(dn, {
        //         window: id = window,
        //         (windowWillEnterFullScreen:) => on_enter_fullscreen as extern fn(&Object, Sel, id),
        //         (windowDidExitFullScreen:) => on_exit_fullscreen as extern fn(&Object, Sel, id)
        //     }))
        // };
    }
}
