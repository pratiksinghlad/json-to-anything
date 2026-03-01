// Simple syntax highlighting utilities that work without global dependencies
// This avoids issues with PrismJS in production builds

const escapeHtml = (text: string): string => {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

// Simple JSON syntax highlighting - improved
export const highlightJson = (code: string): string => {
  const escaped = escapeHtml(code);
  
  return escaped
    // Use token replacements to avoid overlapping
    // Keywords (keys)
    .replace(/(&quot;[^&]*&quot;)(\s*:)/g, 'TOKEN_KEY_$1_TOKEN_END$2')
    // Strings (values) - only those not already marked as keys
    .replace(/(&quot;[^&]*&quot;)(?![^TOKEN]*_TOKEN_END)/g, 'TOKEN_STR_$1_TOKEN_END')
    // Numbers
    .replace(/\b(-?\d+\.?\d*)\b/g, 'TOKEN_NUM_$1_TOKEN_END')
    // Booleans and null
    .replace(/\b(true|false|null)\b/g, 'TOKEN_BOOL_$1_TOKEN_END')
    // Final replacements
    .split('TOKEN_KEY_').join('<span style="color: #0451a5;">')
    .split('TOKEN_STR_').join('<span style="color: #a31515;">')
    .split('TOKEN_NUM_').join('<span style="color: #098658;">')
    .split('TOKEN_BOOL_').join('<span style="color: #0000ff;">')
    .split('_TOKEN_END').join('</span>');
};

// Simple XML/HTML syntax highlighting - improved to avoid self-highlighting tags
export const highlightXml = (code: string): string => {
  const escaped = escapeHtml(code);
  
  // Use a temporary replacement for the highlight tags to avoid collisions
  // Then replace them back at the end
  return escaped
    .replace(/(&lt;\/?[\w-]+)/g, 'TOKEN_START_TAG_$1_TOKEN_END_TAG')
    .replace(/([\w-]+)(=)/g, 'TOKEN_START_ATTR_$1_TOKEN_END_ATTR_$2')
    .replace(/(=)(&quot;[^&]*&quot;)/g, '$1TOKEN_START_VAL_$2_TOKEN_END_VAL')
    .replace(/(\/?&gt;)/g, 'TOKEN_START_TAG_$1_TOKEN_END_TAG')
    // Final replacements to actual HTML spans
    .split('TOKEN_START_TAG_').join('<span style="color: #800000;">')
    .split('_TOKEN_END_TAG').join('</span>')
    .split('TOKEN_START_ATTR_').join('<span style="color: #ff0000;">')
    .split('_TOKEN_END_ATTR_').join('</span>')
    .split('TOKEN_START_VAL_').join('<span style="color: #0000ff;">')
    .split('_TOKEN_END_VAL').join('</span>');
};

// Simple CSV highlighting (just escape, no colors needed)
export const highlightCsv = (code: string): string => {
  return escapeHtml(code);
};

// Generic highlight function
export const highlight = (code: string, language: string): string => {
  switch (language.toLowerCase()) {
    case 'json':
      return highlightJson(code);
    case 'xml':
    case 'markup':
    case 'html':
      return highlightXml(code);
    case 'csv':
    default:
      return highlightCsv(code);
  }
};

export default highlight;
