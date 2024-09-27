use std::ffi::c_void;

use cocoa::{
    appkit::{NSColor, NSToolbar, NSWindow, NSWindowStyleMask, NSWindowTitleVisibility},
    base::{id, nil},
    delegate,
};
use objc::{
    class, msg_send,
    runtime::{Object, Sel, BOOL, NO, YES},
    sel, sel_impl,
};
use tauri::Window;

#[allow(dead_code)]
pub enum ToolbarThickness {
    Thick,
    Medium,
    Thin,
}

pub fn unified_titlebar_macos(window: *mut c_void) {
    let window = window as id;

    let style_mask = unsafe { window.styleMask() }
        | NSWindowStyleMask::NSUnifiedTitleAndToolbarWindowMask
        | NSWindowStyleMask::NSFullSizeContentViewWindowMask
        | NSWindowStyleMask::NSBorderlessWindowMask;
    unsafe { window.setStyleMask_(style_mask) };
    unsafe { window.setTitleVisibility_(NSWindowTitleVisibility::NSWindowTitleHidden) };
    unsafe { window.setTitlebarAppearsTransparent_(YES) };
    let color =
        unsafe { NSColor::colorWithSRGBRed_green_blue_alpha_(nil, 255.0, 255.0, 255.0, 1.0) };
    unsafe { window.setBackgroundColor_(color) };
    unsafe { window.setHasShadow_(YES) };
}

pub fn set_titlebar_thickness(tauri_win: &Window, thickness: ToolbarThickness) {
    let window = tauri_win.ns_window().unwrap() as id;

    match thickness {
        ToolbarThickness::Thick => {
            tauri_win.set_title("").expect("Title wasn't set to ''");
            unsafe {
                window.setToolbarStyle_(
                    cocoa::appkit::NSWindowToolbarStyle::NSWindowToolbarStyleUnified,
                )
            };
            // window.setTitleVisibility_(NSWindowTitleVisibility::NSWindowTitleVisible);
            unsafe { make_toolbar(window) };
        }
        ToolbarThickness::Medium => {
            unsafe { make_toolbar(window) };
        }
        ToolbarThickness::Thin => {}
    }
    extern "C" fn on_enter_fullscreen(this: &Object, _cmd: Sel, _notification: id) {
        unsafe {
            let window: id = *this.get_ivar("window");
            window.toolbar().setIsVisible_(NO);
        }
    }
    extern "C" fn on_exit_fullscreen(this: &Object, _cmd: Sel, _notification: id) {
        unsafe {
            let window: id = *this.get_ivar("window");
            window.toolbar().setIsVisible_(YES);
        }
    }
    let delegate_name = format!("window_delegate_{}", tauri_win.label());
    let dn = delegate_name.as_str();

    unsafe {
        window.setDelegate_(delegate!(dn, {
            window: id = window,
            (windowWillEnterFullScreen:) => on_enter_fullscreen as extern fn(&Object, Sel, id),
            (windowDidExitFullScreen:) => on_exit_fullscreen as extern fn(&Object, Sel, id)
        }))
    };
}

#[cfg(target_os = "macos")]
unsafe fn make_toolbar(id: id) -> id {
    let new_toolbar = NSToolbar::alloc(id);
    new_toolbar.setShowsBaselineSeparator_(NO);
    new_toolbar.init_();
    id.setToolbar_(new_toolbar);

    return new_toolbar;
}

#[allow(non_snake_case)]
trait ChangeVisible: Sized {
    unsafe fn setIsVisible_(self, state: BOOL);
}

#[allow(non_snake_case)]
impl ChangeVisible for id {
    unsafe fn setIsVisible_(self, state: BOOL) {
        msg_send![self, setVisible: state]
    }
}
