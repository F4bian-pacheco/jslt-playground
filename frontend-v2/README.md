# JSLT Playground Frontend

A modern, interactive web application for learning and experimenting with JSLT (JSON Select Language for Transformation). Built with React, TypeScript, and TanStack Router.

## 🚀 Features

- **Interactive Code Editor**: Monaco Editor with syntax highlighting
- **Real-time Transformation**: Live preview of JSLT transformations
- **Validation**: Real-time JSLT expression validation
- **Modern UI**: Dark theme with Tailwind CSS
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Educational Content**: Built-in tutorials and examples

## 🛠️ Tech Stack

- **Frontend Framework**: React 19
- **Language**: TypeScript
- **Routing**: TanStack Router
- **Styling**: Tailwind CSS 4.0
- **Code Editor**: Monaco Editor
- **HTTP Client**: Axios
- **Build Tool**: Vite
- **Testing**: Vitest + Testing Library

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- JSLT Backend API (for transformation functionality)

## 🚀 Getting Started

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd frontend-v2
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Create .env file
VITE_API_URL=http://localhost:8000
```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

### Testing

Run tests:
```bash
npm test
```

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── CodeEditor.tsx   # Monaco editor wrapper
│   ├── LandingPage.tsx  # Homepage component
│   └── PlaygroundLayout.tsx # Main playground interface
├── hooks/              # Custom React hooks
│   └── useTransform.ts # JSLT transformation logic
├── routes/             # TanStack Router routes
│   ├── __root.tsx     # Root layout
│   ├── index.tsx      # Homepage route
│   └── playground.tsx # Playground route
├── types/             # TypeScript type definitions
│   └── api.ts         # API response types
├── utils/             # Utility functions
│   └── api.ts         # API client configuration
└── main.tsx           # Application entry point
```

## 🔧 Available Scripts

- `npm run dev` - Start development server on port 3000
- `npm run build` - Build for production
- `npm run serve` - Preview production build
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run check` - Format and lint code

## 🌐 API Integration

The frontend communicates with a JSLT backend API for:

- **Transform Endpoint**: `POST /api/v1/transform`
  - Transforms JSON using JSLT expressions
  - Returns transformed result or error details

- **Validate Endpoint**: `POST /api/v1/validate`
  - Validates JSLT expressions
  - Returns validation status and error details

- **Health Endpoint**: `GET /api/v1/health`
  - API health check

### API Configuration

Configure the API base URL using the `VITE_API_URL` environment variable:

```env
VITE_API_URL=http://localhost:8000
```

## 🎨 UI Components

### Landing Page
- Hero section with JSLT introduction
- Feature highlights
- Interactive tutorials
- Links to playground and documentation

### Playground
- Split-pane interface
- JSON input editor
- JSLT expression editor
- Transformed output display
- Real-time validation feedback

### Code Editor
- Monaco Editor integration
- JSON and JSLT syntax highlighting
- Auto-completion and error detection
- Customizable themes

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🔒 Error Handling

- Network error handling with user-friendly messages
- JSON parsing error detection
- JSLT validation error display
- Graceful fallbacks for API failures

## 🚀 Deployment

### Vercel
```bash
npm run build
# Deploy dist/ folder to Vercel
```

### Netlify
```bash
npm run build
# Deploy dist/ folder to Netlify
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "serve"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes
4. Run tests: `npm test`
5. Commit your changes: `git commit -m 'Add new feature'`
6. Push to the branch: `git push origin feature/new-feature`
7. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built by [Pacheco Dev](https://pachecodev.com)
- Based on the original [JSLT project](https://github.com/schibsted/jslt) by Schibsted
- Icons and design inspiration from modern web applications

## 📚 Learn More

- [JSLT Documentation](https://github.com/schibsted/jslt)
- [JSLT Tutorial](https://github.com/schibsted/jslt/blob/master/tutorial.md)
- [TanStack Router](https://tanstack.com/router)
- [Monaco Editor](https://microsoft.github.io/monaco-editor/)
