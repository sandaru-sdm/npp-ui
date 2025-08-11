
# NPP-UI

A modern React application built with Vite, featuring a modular structure for scalable UI development.

## Features

- ⚡️ Fast development with Vite
- 🔥 Hot Module Replacement (HMR)
- 🧩 Modular component and page structure
- 🖼️ Asset management for images and icons
- 🧹 ESLint integration for code quality

## Project Structure

```
src/
  assets/           # Images and icons
  components/       # Reusable UI components
  pages/            # Application pages
    Users/          # User management pages
    Villagers/      # Villager management pages
  App.jsx           # Main App component
  main.jsx          # Entry point
public/             # Static files
```

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn

### Installation

```bash
npm install
```

### Running the App

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

### Building for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## ESLint

This project uses ESLint for code linting. You can expand the configuration in `eslint.config.js` as needed.

## Vite Plugins

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc)

## License

See the [LICENSE](LICENSE) file for details.
