# Madiphs

## Technology Stack

- **Frontend**: Nuxt 3 with Vue 3 and TypeScript
- **Styling**: Tailwind CSS 4
- **Icons**: Nuxt Icon
- **Fonts**: Inter Variable Font
- **Build**: Vite with Tailwind CSS plugin

## Getting Started

### Prerequisites

- Node.js (version 20 or higher)
- npm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/PlantVillage/madiphs
cd madiphs
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
# Create .env file
cp .env.local .env
```

4. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3002`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run generate` - Generate static site
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run type-check` - Run TypeScript type checking
- `npm run find-unused` - To find unused vars, exports and modules
- `npm run check` - To run all linters and checks

## Project Structure

```
madiphs/
├── components/         # Vue components
├── pages/              # Nuxt pages and routing
├── composables/        # Reusable composables
├── domain/             # TypeScript type definitions and data specific logic
├── assets/             # Static assets and CSS
├── public/             # Public static files
├── server/             # Server-side code
└── nuxt.config.ts      # Nuxt configuration
```
