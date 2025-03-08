Github Repositories Explorer

A modern React application that allows users to search for GitHub users in real-time. Built with React, TypeScript, and Vite.

## Features

- Real-time GitHub user search
- Debounced search to optimize API calls
- Responsive design with Tailwind CSS
- Loading states and error handling
- Clean and modern UI

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Vitest for testing
- ESLint for code quality

## Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd github-user-search
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your GitHub API token:
```
VITE_GITHUB_API_URL=https://api.github.com
VITE_GITHUB_TOKEN=your_github_token_here
```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the production version
- `npm run preview` - Preview the production build locally
- `npm run test` - Run tests
- `npm run test:coverage` - Run tests with coverage report
- `npm run test:ui` - Run tests with UI
- `npm run lint` - Run ESLint

## Development

The project uses Vite as the build tool and development server. The development server can be started with:

```bash
npm run dev
```

This will start the server at `http://localhost:5173` (or another port if 5173 is in use).

## Testing

The project uses Vitest for testing. Tests can be run with:

```bash
npm run test
```

For test coverage:

```bash
npm run test:coverage
```

## Project Structure

```
github-user-search/
├── src/
│   ├── assets/        # Static assets
│   ├── components/    # React components
│   ├── services/      # API services
│   ├── styles/        # Global styles
│   ├── types/         # TypeScript type definitions
│   ├── utils/         # Utility functions
│   ├── App.tsx        # Main application component
│   └── main.tsx       # Application entry point
├── public/            # Public assets
├── tests/             # Test files
└── vite.config.ts     # Vite configuration
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
