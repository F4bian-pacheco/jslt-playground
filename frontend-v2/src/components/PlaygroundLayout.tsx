import React, { useCallback, useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'
import CodeEditor from './CodeEditor';
import { useTransform } from '@/hooks/useTransform';


const PlaygroundLayout: React.FC = () => {
  const [inputJson, setInputJson] = useState('{\n  "name": "John Doe",\n  "age": 30,\n  "city": "New York",\n  "skills": ["JavaScript", "Python", "React"]\n}');
  const [jsltExpression, setJsltExpression] = useState('let skillCount = size(.skills)\n{\n  "fullName": .name,\n  "isAdult": .age >= 18,\n  "location": .city,\n  "skillCount": $skillCount,\n  "primarySkill": .skills[0]\n}');
  const [outputJson, setOutputJson] = useState('');

  const { transform, validate, isTransforming, transformResult, validationResult } = useTransform();

  const handleTransform = useCallback(async () => {
    const result = await transform(inputJson, jsltExpression);
    if (result.success && result.output) {
      setOutputJson(JSON.stringify(result.output, null, 2));
    } else {
      setOutputJson('');
    }
  }, [inputJson, jsltExpression, transform]);

  const handleValidate = useCallback(async () => {
    await validate(jsltExpression);
  }, [jsltExpression, validate]);

  const handleClear = useCallback(() => {
    setInputJson('{}');
    setJsltExpression('.');
    setOutputJson('');
  }, []);

  // Auto-validate JSLT expression on change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (jsltExpression.trim()) {
        handleValidate();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [jsltExpression, handleValidate]);

  return (
    <div className="flex flex-col h-screen bg-[var(--color-dark-500)] text-[var(--color-dark-100)]">
      {/* Header */}
      <header className="px-8 py-4 bg-[var(--color-dark-400)] border-b border-[var(--color-dark-300)] flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className="text-white hover:text-[var(--color-dark-200)] transition-colors text-lg font-semibold"
          >
            ← Back
          </Link>
          <h1 className="text-xl font-semibold text-white">JSLT Playground</h1>
        </div>
        <div className="flex gap-4 items-center">
          <button
            onClick={handleClear}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-[var(--color-dark-100)] rounded text-sm font-medium transition-colors"
          >
            Clear
          </button>
          <button
            onClick={handleTransform}
            disabled={isTransforming}
            className="px-4 py-2 bg-[var(--color-primary-500)] hover:bg-[var(--color-primary-600)] disabled:bg-[var(--color-primary-700)] disabled:cursor-not-allowed text-white rounded text-sm font-medium transition-colors"
          >
            {isTransforming ? 'Transforming...' : 'Transform'}
          </button>
        </div>
      </header>

      {/* Error/Success Messages */}
      {transformResult && !transformResult.success && (
        <div className="bg-red-600 text-white px-4 py-2 text-sm">
          Error: {transformResult.error}
        </div>
      )}

      {transformResult && transformResult.success && (
        <div className="bg-green-600 text-white px-4 py-2 text-sm">
          Transformation completed in {transformResult.execution_time_ms.toFixed(3)}ms
        </div>
      )}

      {validationResult && !validationResult.valid && (
        <div className="bg-red-600 text-white px-4 py-2 text-sm">
          JSLT Validation Error: {validationResult.error}
          {validationResult.suggestions && validationResult.suggestions.length > 0 && (
            <div className="mt-2">
              Suggestions: {validationResult.suggestions.join(', ')}
            </div>
          )}
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex min-h-0">
        {/* Input JSON Panel */}
        <div className="flex-1 flex flex-col min-w-0 border-r border-[var(--color-dark-300)]">
          <div className="px-4 py-3 bg-[var(--color-dark-400)] border-b border-[var(--color-dark-300)] text-sm font-medium text-[var(--color-dark-200)]">
            Input JSON
          </div>
          <div className="flex-1 relative">
            <CodeEditor
              value={inputJson}
              onChange={setInputJson}
              language="json"
              placeholder="Enter your input JSON here..."
            />
          </div>
        </div>

        {/* JSLT Expression Panel */}
        <div className="flex-1 flex flex-col min-w-0 border-r border-[var(--color-dark-300)]">
          <div className="px-4 py-3 bg-[var(--color-dark-400)] border-b border-[var(--color-dark-300)] text-sm font-medium text-[var(--color-dark-200)]">
            JSLT Expression
          </div>
          <div className="flex-1 relative">
            <CodeEditor
              value={jsltExpression}
              onChange={setJsltExpression}
              language="jslt"
              placeholder="Enter your JSLT transformation here..."
            />
          </div>
        </div>

        {/* Output JSON Panel */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="px-4 py-3 bg-[var(--color-dark-400)] border-b border-[var(--color-dark-300)] text-sm font-medium text-[var(--color-dark-200)]">
            Output JSON
          </div>
          <div className="flex-1 relative">
            <CodeEditor
              value={outputJson}
              onChange={() => { }} // Read-only
              language="json"
              placeholder="Transformed output will appear here..."
              readOnly
            />
          </div>
        </div>
      </main>

      {/* Status Bar */}
      <div className="px-8 py-2 bg-blue-600 text-white text-sm flex justify-between items-center">
        <div>
          JSLT Playground - JSON Language Transformation
        </div>
        <div>
          {validationResult?.valid ? '✓ Valid JSLT' : validationResult ? '✗ Invalid JSLT' : 'Ready'}
        </div>
      </div>
    </div>
  );
};

export default PlaygroundLayout;