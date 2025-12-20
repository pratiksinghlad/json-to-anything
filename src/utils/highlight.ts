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

// Simple JSON syntax highlighting
export const highlightJson = (code: string): string => {
  const escaped = escapeHtml(code);
  
  return escaped
    // Strings (double-quoted)
    .replace(/"([^"\\]|\\.)*"/g, '<span style="color: #a31515;">$&</span>')
    // Numbers
    .replace(/\b(-?\d+\.?\d*)\b/g, '<span style="color: #098658;">$1</span>')
    // Booleans and null
    .replace(/\b(true|false|null)\b/g, '<span style="color: #0000ff;">$1</span>')
    // Property names (keys before colon)
    .replace(/(&quot;[^&]*&quot;)(\s*:)/g, '<span style="color: #0451a5;">$1</span>$2');
};

// Simple XML/HTML syntax highlighting
export const highlightXml = (code: string): string => {
  const escaped = escapeHtml(code);
  
  return escaped
    // Tags
    .replace(/(&lt;\/?[\w-]+)/g, '<span style="color: #800000;">$1</span>')
    // Attributes
    .replace(/([\w-]+)(=)/g, '<span style="color: #ff0000;">$1</span>$2')
    // Attribute values
    .replace(/(=)(&quot;[^&]*&quot;)/g, '$1<span style="color: #0000ff;">$2</span>')
    // Closing bracket
    .replace(/(\/?&gt;)/g, '<span style="color: #800000;">$1</span>');
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
