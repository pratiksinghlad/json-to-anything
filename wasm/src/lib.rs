/*!
 * json-engine — Rust WASM module
 *
 * Exposes JSON processing functions via wasm-bindgen.
 * Compiled with: wasm-pack build --target web --out-dir ../public/wasm
 *
 * These functions are called by wasmBridge.ts when payload > wasmThreshold (default 4 MB).
 */

use wasm_bindgen::prelude::*;
use serde_json::Value;

/// Minifies a JSON string (removes all whitespace).
///
/// # Errors
/// Returns a JsValue error if the input is not valid JSON.
#[wasm_bindgen]
pub fn minify_json(input: &str) -> Result<String, JsValue> {
    let value: Value = serde_json::from_str(input)
        .map_err(|e| JsValue::from_str(&format!("Invalid JSON: {}", e)))?;

    serde_json::to_string(&value)
        .map_err(|e| JsValue::from_str(&format!("Serialisation error: {}", e)))
}

/// Pretty-prints a JSON string with the given indentation level.
///
/// # Arguments
/// * `input`  — Valid JSON string.
/// * `indent` — Number of spaces per indentation level (0–8).
///
/// # Errors
/// Returns a JsValue error if the input is not valid JSON.
#[wasm_bindgen]
pub fn pretty_print_json(input: &str, indent: u32) -> Result<String, JsValue> {
    let value: Value = serde_json::from_str(input)
        .map_err(|e| JsValue::from_str(&format!("Invalid JSON: {}", e)))?;

    let indent_clamped = indent.clamp(0, 8) as usize;
    let indent_str = " ".repeat(indent_clamped);

    let formatter = serde_json::ser::PrettyFormatter::with_indent(indent_str.as_bytes());
    let mut buf = Vec::new();
    let mut ser = serde_json::Serializer::with_formatter(&mut buf, formatter);

    use serde::Serialize;
    value.serialize(&mut ser)
        .map_err(|e| JsValue::from_str(&format!("Serialisation error: {}", e)))?;

    String::from_utf8(buf)
        .map_err(|e| JsValue::from_str(&format!("UTF-8 error: {}", e)))
}

/// Converts a JSON string to YAML.
///
/// # Errors
/// Returns a JsValue error if the input is not valid JSON or if serialization fails.
#[wasm_bindgen]
pub fn json_to_yaml(input: &str) -> Result<String, JsValue> {
    let value: Value = serde_json::from_str(input)
        .map_err(|e| JsValue::from_str(&format!("Invalid JSON: {}", e)))?;

    serde_yaml::to_string(&value)
        .map_err(|e| JsValue::from_str(&format!("YAML serialisation error: {}", e)))
}

/// Converts a JSON string to TOML.
///
/// # Errors
/// Returns a JsValue error if the input is not valid JSON, if it doesn't represent a table structure, or if serialization fails.
#[wasm_bindgen]
pub fn json_to_toml(input: &str) -> Result<String, JsValue> {
    let value: Value = serde_json::from_str(input)
        .map_err(|e| JsValue::from_str(&format!("Invalid JSON: {}", e)))?;

    toml::to_string(&value)
        .map_err(|e| JsValue::from_str(&format!("TOML serialisation error: {}", e)))
}
