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
# Create .env file from example
cp env.example .env
```

4. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3002`

## Development

### Working with Mock API

The project includes a mock API system for development without backend dependencies.

**Enable Mock API:**

```bash
# In .env file
NUXT_PUBLIC_API_BASE_URL=http://localhost:3002/api/mocks
```

**Note:** After changing environment variables, restart the development server for changes to take effect.

**Mock endpoints:**
- `http://localhost:3002/api/mocks/api/v1/public/madiphs`
- Supports query parameters: `?crop_name=tomato`
- Returns filtered mock data based on crop_name

**Mock data location:**
- `server/data/madiphs.ts` - Contains mock data and filter functions
- `server/api/mocks/[...path].ts` - Dynamic mock API handler

### Working with Proxy API

The project includes a proxy API system for development for example with local backend

**Enable Proxy:**

```bash
# In .env file
NUXT_PUBLIC_API_BASE_URL=http://localhost:3002/api/proxy
NUXT_INTERNAL_PROXY_BASE_URL=https://your-backend.com
```

**Note:** After changing environment variables, restart the development server for changes to take effect.

**How it works:**
1. Your app makes a request to `/api/proxy/api/v1/public/madiphs`
2. The proxy forwards it to `https://your-backend.com/api/v1/public/madiphs`

**Proxy configuration:**
- `server/api/proxy/[...path].ts` - Dynamic proxy handler
- Only available in development mode
- Forwards all HTTP methods (GET, POST, etc.)
- Preserves query parameters

You can leverage both approaches simultaneously in your development workflow:
- **Mocks** (`/api/mocks`) - for features where the backend doesn't exist yet
- **Proxy** (`/api/proxy`) - for backend endpoints that are already implemented and deployed

This hybrid strategy enables you to develop against real APIs where available, while using mocks to unblock frontend development for features still awaiting backend implementation.

### Available Scripts

- `npm run dev` - Start development server
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
│   ├── api/
│   │   ├── mocks/      # Mock API endpoints
│   │   └── proxy/      # Proxy endpoints for CORS bypass
│   └── data/           # Mock data definitions
└── nuxt.config.ts      # Nuxt configuration
```
