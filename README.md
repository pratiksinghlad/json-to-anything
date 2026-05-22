# JSON to Anything Converter

A simple, robust, and user-friendly web application for converting JSON data to various formats (CSV, XML, TOON) entirely in your browser.

![JSON to CSV Converter](https://img.shields.io/badge/React-19-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue) ![Vite](https://img.shields.io/badge/Vite-7-purple) ![MUI](https://img.shields.io/badge/MUI-7-blue)

| items   | sample |
| ------- | ------ |
| [1,2,3] | data   |

## ✨ Features

- **📝 JSON to anything** - Large, syntax-highlighted JSON to anything with validation
- **🔄 Real-time Conversion** - Instant CSV preview as you type
- **⚙️ Flexible Options**
  - Multiple separator choices (comma, semicolon, tab)
  - Toggle header row inclusion
  - Trim empty columns option
- **📊 Interactive Preview** - View converted data in a responsive table
- **💾 Multiple Export Options**
  - Download as CSV with timestamp
  - Download original JSON
  - Copy CSV to clipboard
  - View raw CSV data in new tab
- **🔒 Privacy First** - All processing happens in your browser, no data is uploaded
- **🎨 Modern UI** - Built with Material-UI for a polished experience
- **🌍 Multi-language Support** - Available in English, Spanish, and Hindi
- **📱 Responsive Navigation** - Adapts seamlessly between desktop and mobile
- **♿ Accessible** - ARIA labels and keyboard navigation support

### 🆕 JSON to TOON Converter

- **📉 Token Optimization** - Reduce LLM token usage by 30-60% with TOON format
- **📊 Live Token Counter** - Real-time token counting using GPT-4's tokenizer (gpt-tokenizer)
- **💰 Savings Calculator** - See exact token savings and percentage reduction
- **🔄 Lossless Conversion** - TOON format preserves all JSON data structure
- **📋 Copy & Download** - Export TOON output with one click

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/pratiksinghlad/json-to-anything.git
cd json-to-anything

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173/`

## 📦 Build & Deploy

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm test

# Run linter
npm run lint
```

## 🔧 How It Works

### Conversion Rules

1. **JSON Input Formats**
   - Direct array of objects: `[{...}, {...}]`
   - Object with data property: `{ "data": [{...}] }`

2. **Nested Objects**
   - Flattened using dot notation
   - Example: `{ "profile": { "name": "Alice" } }` → `profile.name`

3. **Arrays**
   - Converted to JSON strings
   - Example: `["a", "b"]` → `"[\"a\",\"b\"]"`

4. **CSV Formatting**
   - RFC4180 compliant
   - Proper escaping of quotes, commas, and newlines
   - Quotes are doubled: `"hello"` → `"""hello"""`

5. **Column Ordering**
   - All unique keys are collected from all objects
   - Sorted alphabetically for stable ordering
   - Empty columns can be trimmed optionally

### Example

**Input JSON:**

```json
[
  {
    "id": 1,
    "name": "Alice",
    "email": "alice@example.com",
    "profile": {
      "role": "engineer",
      "joined": "2023-04-12T08:00:00Z"
    },
    "tags": ["frontend", "react"]
  },
  {
    "id": 2,
    "name": "Bob",
    "email": "bob@example.com",
    "profile": {
      "role": "designer"
    },
    "tags": []
  }
]
```

**Output CSV:**

```csv
email,id,name,profile.joined,profile.role,tags
alice@example.com,1,Alice,2023-04-12T08:00:00Z,engineer,"[""frontend"",""react""]"
bob@example.com,2,Bob,,designer,[]
```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Editor.tsx           # JSON editor with syntax highlighting
│   ├── OptionsBar.tsx       # Conversion options controls
│   ├── PreviewTable.tsx     # CSV preview table
│   ├── DownloadButtons.tsx  # Download and export buttons
│   └── Footer.tsx           # Footer with links and privacy statement
├── utils/
│   ├── parseJson.ts         # JSON parsing with error handling
│   ├── normalizeData.ts     # Data normalization logic
│   ├── flattenObject.ts     # Object flattening with dot notation
│   ├── jsonToCsv.ts         # CSV conversion with RFC4180 compliance
│   ├── jsonToToon.ts        # TOON format conversion for LLM optimization
│   └── tokenizer.ts         # Token counting using gpt-tokenizer
├── __tests__/
│   └── utils/               # Unit tests for utility functions
├── App.tsx                  # Main application component
└── main.tsx                 # Application entry point
```

## 🎯 TOON Format

TOON (Token-Oriented Object Notation) is a data serialization format designed specifically for LLM prompts. It reduces token usage by 30-60% compared to JSON while maintaining readability and lossless data representation.

### Key Features

- **Tabular Arrays**: Declares keys once in headers, then presents data in CSV-like format
- **Smart Quoting**: Only quotes strings when necessary
- **Indentation-Based Structure**: Uses indentation instead of curly braces (like YAML)
- **Explicit Array Lengths**: Includes array lengths for validation

### Example Conversion

**Input JSON:**

```json
[
  { "id": 1, "name": "Alice", "role": "engineer" },
  { "id": 2, "name": "Bob", "role": "designer" }
]
```

**Output TOON:**

```
[2]
id,name,role
1,Alice,engineer
2,Bob,designer
```

### Token Counting

The TOON converter uses `gpt-tokenizer`, which implements OpenAI's tokenization algorithm (cl100k_base encoding used by GPT-4 and ChatGPT). Token counts are calculated for both the original JSON and the TOON output, providing accurate savings metrics.

**Note**: Token counts may vary slightly between different LLM providers (OpenAI, Anthropic, etc.) as they use different tokenization schemes. The counts shown use GPT-4's tokenizer as a reference.

## 🧪 Testing

The project includes comprehensive unit tests for all utility functions:

- JSON parsing and validation
- Data normalization
- Object flattening
- CSV conversion and escaping

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 🔐 Privacy & Security

**Privacy & open source.** All conversion happens in your browser — nothing is uploaded or stored on a server. The full source code is available on [GitHub](https://github.com/pratiksinghlad/json-to-anything).

- ✅ No server-side processing
- ✅ No data collection
- ✅ No external API calls
- ✅ No cookies or tracking
- ✅ 100% client-side JavaScript

## 🛠️ Technology Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Material-UI** - Component library
- **React Router** - Client-side routing
- **react-i18next** - Internationalization
- **Sass/SCSS** - Styling
- **react-simple-code-editor** - Code editor
- **Prism** - Syntax highlighting
- **gpt-tokenizer** - LLM token counting for TOON converter
- **Vitest** - Testing framework
- **React Testing Library** - Component testing

## 📚 Documentation

- [Navigation Menu Customization Guide](./NAVIGATION_DOCS.md) - How to customize colors, add menu items, manage translations

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 👨‍💻 Author

Made with ❤️ by [Pratik Singh Lad](https://github.com/pratiksinghlad)

## 🔗 Links

- [GitHub Repository](https://github.com/pratiksinghlad/json-to-anything)
- [Report Issues](https://github.com/pratiksinghlad/json-to-anything/issues)
- [Request Features](https://github.com/pratiksinghlad/json-to-anything/issues/new)
