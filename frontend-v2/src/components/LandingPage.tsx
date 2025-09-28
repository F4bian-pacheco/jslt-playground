import React from 'react'
import { Link } from '@tanstack/react-router'

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-500 via-primary-700 to-dark-500">
      {/* Header */}
      <header className="border-b border-dark-300 bg-dark-500/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">JS</span>
              </div>
              <h1 className="text-xl font-bold text-white">JSLT Playground</h1>
            </div>
            <nav className="flex items-center space-x-6">
              <a
                href="https://pachecodev.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark-200 hover:text-white transition-colors"
              >
                By Pacheco Dev
              </a>
              <Link
                to="/playground"
                className="bg-primary-600 hover:bg-primary-500 text-white px-4 py-2 rounded-lg transition-colors font-medium"
              >
                Try Playground
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-white mb-6 text-balance">
            Transform JSON with
            <span className="text-primary-600"> JSLT</span>
          </h1>
          <p className="text-xl text-dark-200 mb-8 max-w-2xl mx-auto text-pretty">
            Interactive playground for JSON Language Transformation. Learn, experiment, and master JSLT expressions with
            real-time feedback.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/playground"
              className="bg-primary-600 hover:bg-primary-500 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
            >
              Start Transforming
            </Link>
            <a
              href="https://github.com/schibsted/jslt"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-dark-300 hover:border-dark-200 text-dark-200 hover:text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
            >
              View JSLT Docs
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-dark-400/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12 text-balance">Why Choose JSLT?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-dark-400/50 p-6 rounded-lg border border-dark-300">
              <div className="w-12 h-12 bg-primary-600/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-primary-600 text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Intuitive Syntax</h3>
              <p className="text-dark-200">
                Simple dot notation and array access make JSON transformation natural and readable.
              </p>
            </div>
            <div className="bg-dark-400/50 p-6 rounded-lg border border-dark-300">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-green-400 text-2xl">🔧</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Powerful Built-ins</h3>
              <p className="text-dark-200">
                Rich set of functions for string manipulation, array operations, and type conversions.
              </p>
            </div>
            <div className="bg-dark-400/50 p-6 rounded-lg border border-dark-300">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-purple-400 text-2xl">📦</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Modular Design</h3>
              <p className="text-dark-200">Create reusable functions and import modules for complex transformations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tutorial Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12 text-balance">Learn JSLT Step by Step</h2>
          <div className="space-y-8">
            {/* Basic Concepts */}
            <div className="bg-dark-400/30 rounded-lg p-6 border border-dark-300">
              <h3 className="text-2xl font-semibold text-white mb-4">1. Basic JSON Navigation</h3>
              <p className="text-dark-200 mb-4">Start with simple dot accessors to navigate JSON structures:</p>
              <div className="bg-dark-500 rounded-lg p-4 border border-dark-300">
                <code className="text-green-400 font-mono">
                  .name // Access object property
                  <br />
                  .users[0] // Access array element
                  <br />
                  .users[0].age // Chain accessors
                </code>
              </div>
            </div>

            {/* Intermediate */}
            <div className="bg-dark-400/30 rounded-lg p-6 border border-dark-300">
              <h3 className="text-2xl font-semibold text-white mb-4">2. Array Transformations</h3>
              <p className="text-dark-200 mb-4">Use for expressions to transform arrays:</p>
              <div className="bg-dark-500 rounded-lg p-4 border border-dark-300">
                <code className="text-green-400 font-mono">
                  [for (.users) .name] // Extract names
                  <br />
                  {`{`}"total": size(.users){`}`} // Count elements
                  <br />
                  [for (.items) if (.active) .] // Filter active items
                </code>
              </div>
            </div>

            {/* Advanced */}
            <div className="bg-dark-400/30 rounded-lg p-6 border border-dark-300">
              <h3 className="text-2xl font-semibold text-white mb-4">3. Complex Transformations</h3>
              <p className="text-dark-200 mb-4">Create dynamic objects with variables and functions:</p>
              <div className="bg-dark-500 rounded-lg p-4 border border-dark-300">
                <code className="text-green-400 font-mono text-sm">
                  let total = size(.items)
                  <br />
                  {`{`}
                  <br />
                  &nbsp;&nbsp;"summary": "Found " + string($total) + " items",
                  <br />
                  &nbsp;&nbsp;"items": [for (.items) {`{`}"id": .id, "processed": true{`}`}]<br />
                  {`}`}
                </code>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              to="/playground"
              className="bg-primary-600 hover:bg-primary-500 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors inline-block"
            >
              Try These Examples
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-dark-300 bg-dark-500/50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-dark-200 mb-4 md:mb-0">
              <p>
                Built with ❤️ by{" "}
                <a
                  href="https://pachecodev.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-500 transition-colors"
                >
                  Pacheco Dev
                </a>
              </p>
              <p className="text-sm">
                Based on the original{" "}
                <a
                  href="https://github.com/schibsted/jslt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-500 transition-colors"
                >
                  JSLT project
                </a>{" "}
                by Schibsted
              </p>
            </div>
            <div className="flex space-x-6">
              <a
                href="https://github.com/schibsted/jslt/blob/master/tutorial.md"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark-200 hover:text-white transition-colors"
              >
                Tutorial
              </a>
              <a
                href="https://github.com/schibsted/jslt"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark-200 hover:text-white transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage