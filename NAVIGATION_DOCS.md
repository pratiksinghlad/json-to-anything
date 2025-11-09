# Responsive Navigation Menu - Documentation

## 🎨 Customizing the Menu Color

The menu color can be easily changed from a single location:

### Option 1: themeConfig.ts (Recommended)

Edit `/src/themeConfig.ts`:

```typescript
export const themeConfig = {
  // Change this color to customize the menu
  PRIMARY_COLOR: "#1976d2",  // Change this value
  PRIMARY_DARK: "#115293",
  PRIMARY_LIGHT: "#4791db",
  // ... rest of config
}
```

### Option 2: SCSS Variables

Edit `/src/styles/_variables.scss`:

```scss
// Change these values to customize the menu color
$primary-color: #1976d2;
$primary-dark: #115293;
$primary-light: #4791db;
```

**Note:** Both files should be kept in sync for consistent theming across MUI components and SCSS styles.

---

## 📋 Adding New Menu Items

### Step 1: Update menuData.ts

Edit `/src/menuData.ts` and add your new item:

```typescript
export const menuItems: MenuItem[] = [
  // ... existing items
  {
    key: "my-new-feature",           // Unique key
    labelKey: "menu.myNewFeature",   // i18n translation key
    path: "/my-feature",              // Route path
  },
];
```

### Step 2: Add Translations

Add translations in all locale files:

**`/src/locales/en.json`:**
```json
{
  "menu": {
    "myNewFeature": "My New Feature"
  }
}
```

**`/src/locales/es.json`:**
```json
{
  "menu": {
    "myNewFeature": "Mi Nueva Función"
  }
}
```

**`/src/locales/hi.json`:**
```json
{
  "menu": {
    "myNewFeature": "मेरी नई सुविधा"
  }
}
```

### Step 3: Create the Page Component

Create `/src/pages/MyFeaturePage.tsx`:

```typescript
import { Container, Box, Typography } from "@mui/material";

const MyFeaturePage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box>
        <Typography variant="h3" component="h1" gutterBottom>
          My New Feature
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Feature content goes here...
        </Typography>
      </Box>
    </Container>
  );
};

export default MyFeaturePage;
```

### Step 4: Add Route in App.tsx

Edit `/src/App.tsx` and add the route:

```typescript
import MyFeaturePage from "./pages/MyFeaturePage";

// In the Routes component:
<Route path="/my-feature" element={<MyFeaturePage />} />
```

---

## 🔄 Enabling Vertical Menu Layout

To switch from horizontal to vertical desktop menu:

### Option 1: Always Vertical

Edit `/src/App.tsx`:

```typescript
<NavBar vertical />  // Add vertical prop
```

### Option 2: Toggle-able Configuration

Create a configuration file or use context to toggle:

```typescript
// In App.tsx
const [verticalMenu, setVerticalMenu] = useState(false);

<NavBar vertical={verticalMenu} />
```

The vertical menu will:
- Display on the left side
- Show items in a column
- Have the same color theming as horizontal layout

---

## 🌍 Managing Translations

### Language Files Location

All translations are in `/src/locales/`:
- `en.json` - English
- `es.json` - Spanish
- `hi.json` - Hindi

### Translation Structure

```json
{
  "menu": {
    "jsonToCsv": "JSON to CSV",
    "jsonToXML": "JSON to XML",
    // ... menu items
  },
  "language": {
    "english": "English",
    "spanish": "Spanish",
    "hindi": "Hindi",
    "selectLanguage": "Select Language"
  },
  "aria": {
    "openMenu": "Open navigation menu",
    "closeMenu": "Close navigation menu",
    // ... accessibility labels
  }
}
```

### Adding a New Language

1. Create `/src/locales/[code].json` with all translations
2. Update `/src/i18n.ts`:

```typescript
import frTranslations from "./locales/fr.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslations },
    es: { translation: esTranslations },
    hi: { translation: hiTranslations },
    fr: { translation: frTranslations },  // Add here
  },
  // ...
});
```

3. Update `/src/menuData.ts`:

```typescript
export const languageOptions: LanguageOption[] = [
  // ... existing languages
  {
    code: "fr",
    label: "French",
    nativeLabel: "Français",
  },
];
```

---

## 📱 Responsive Breakpoints

### Default Breakpoints

Defined in `/src/styles/_variables.scss`:

```scss
$breakpoints: (
  xs: 0,
  sm: 600px,
  md: 960px,   // Mobile/Desktop switch happens here
  lg: 1280px,
  xl: 1920px,
);
```

### Behavior

- **Desktop** (`>= 960px`): Horizontal navigation bar
- **Mobile** (`< 960px`): Hamburger menu with drawer

To change the breakpoint, update both:
1. `/src/styles/_variables.scss` - Update the `md` value
2. `/src/themeConfig.ts` - Update `BREAKPOINTS.md`

---

## 🎭 SCSS Variables Reference

### Colors

```scss
// Located in /src/styles/_variables.scss

// Primary colors (menu theme)
$primary-color: #1976d2;
$primary-dark: #115293;
$primary-light: #4791db;

// Surface colors
$surface-bg: #1e1e1e;
$surface-light: #2a2a2a;
$surface-lighter: #333333;

// Text colors
$text-primary: #ffffff;
$text-secondary: #b0b0b0;
$text-disabled: #666666;
```

### Spacing

```scss
$spacing-xs: 4px;
$spacing-sm: 8px;
$spacing-md: 16px;
$spacing-lg: 24px;
$spacing-xl: 32px;
```

### Border Radius

```scss
$radius-sm: 4px;
$radius-md: 8px;
$radius-lg: 12px;
$radius-pill: 24px;
```

---

## 🧪 Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

### Test Files

- `/src/__tests__/components/navigation/LanguageMenu.test.tsx`
- `/src/__tests__/components/navigation/MobileMenu.test.tsx`
- `/src/__tests__/components/navigation/NavBar.test.tsx`

---

## 🏗️ Component Architecture

```
src/
├── components/
│   └── navigation/
│       ├── NavBar.tsx              # Main responsive wrapper
│       ├── DesktopMenu.tsx         # Horizontal menu
│       ├── DesktopMenu.module.scss
│       ├── MobileMenu.tsx          # Mobile drawer
│       ├── MobileMenu.module.scss
│       ├── LanguageMenu.tsx        # Language selector
│       └── LanguageMenu.module.scss
├── styles/
│   ├── _variables.scss             # SCSS variables
│   └── _mixins.scss                # SCSS mixins
├── locales/
│   ├── en.json                     # English translations
│   ├── es.json                     # Spanish translations
│   └── hi.json                     # Hindi translations
├── i18n.ts                         # i18n configuration
├── menuData.ts                     # Menu items data
└── themeConfig.ts                  # Theme configuration
```

---

## ♿ Accessibility Features

### Implemented ARIA Attributes

- `aria-label` on hamburger and language buttons
- `aria-current="page"` on active menu items
- `aria-expanded` on dropdown menus
- `aria-haspopup` for menu triggers
- Proper `role` attributes (navigation, menu, menuitem)

### Keyboard Navigation

- Tab navigation through all menu items
- Enter/Space to activate buttons
- Escape key closes drawer
- Focus trap in drawer when open

### Screen Reader Support

- Meaningful labels for all interactive elements
- ARIA live regions for dynamic content
- Semantic HTML structure

---

## 🚀 Build & Deploy

```bash
# Development
npm start

# Production build
npm run build

# Preview production build
npm run preview

# Lint
npm run lint
```

---

## 📝 Notes

- All menu items are data-driven from `menuData.ts`
- Language preference persists in localStorage
- Mobile menu intentionally excludes phone/email/settings per requirements
- Both MUI theme and SCSS use the same color values via `themeConfig.ts`
- The menu is fully responsive with no need for manual configuration
