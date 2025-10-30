import React, { useRef } from 'react';
import { Editor } from '@monaco-editor/react';
import type * as monaco from 'monaco-editor';
import type { Monaco } from '@monaco-editor/react';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language: 'json' | 'jslt';
  placeholder?: string;
  readOnly?: boolean;
  height?: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  value,
  onChange,
  language,
  placeholder,
  readOnly = false,
  height = '100%',
}) => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  const handleEditorDidMount = (editor: monaco.editor.IStandaloneCodeEditor, monaco: Monaco) => {
    editorRef.current = editor;

    // Configure JSLT language support
    if (language === 'jslt') {
      monaco.languages.register({ id: 'jslt' });

      monaco.languages.setMonarchTokensProvider('jslt', {
        tokenizer: {
          root: [
            // Keywords
            [/\b(for|if|else|let|then|and|or|not|true|false|null)\b/, 'keyword'],

            // Functions
            [/\b(size|string|number|boolean|round|parse-time|contains|starts-with|ends-with|split|join|min|max|sum|avg)\b/, 'function'],

            // Variable references
            [/\$\w+/, 'variable.name'],

            // Operators
            [/[+\-*/=<>!]/, 'operator'],
            [/[{}[\]()]/, 'bracket'],

            // Strings
            [/"([^"\\]|\\.)*$/, 'string.invalid'],
            [/"/, 'string', '@string'],

            // Numbers
            [/\d*\.\d+([eE][+-]?\d+)?/, 'number.float'],
            [/\d+/, 'number'],

            // Path expressions
            [/\.[\w[\].]+/, 'variable'],
            [/\./, 'variable'],

            // Comments
            [/\/\/.*$/, 'comment'],
          ],

          string: [
            [/[^\\"]+/, 'string'],
            [/\\./, 'string.escape'],
            [/"/, 'string', '@pop'],
          ],
        },
      });

      monaco.languages.setLanguageConfiguration('jslt', {
        brackets: [
          ['{', '}'],
          ['[', ']'],
          ['(', ')'],
        ],
        autoClosingPairs: [
          { open: '{', close: '}' },
          { open: '[', close: ']' },
          { open: '(', close: ')' },
          { open: '"', close: '"' },
        ],
        surroundingPairs: [
          { open: '{', close: '}' },
          { open: '[', close: ']' },
          { open: '(', close: ')' },
          { open: '"', close: '"' },
        ],
      });

      monaco.languages.registerCompletionItemProvider('jslt', {
        provideCompletionItems: (model, position) => {
          const word = model.getWordUntilPosition(position);
          const range = {
            startLineNumber: position.lineNumber,
            endLineNumber: position.lineNumber,
            startColumn: word.startColumn,
            endColumn: word.endColumn,
          };

          const suggestions: Array<monaco.languages.CompletionItem> = [
            {
              label: 'for',
              kind: monaco.languages.CompletionItemKind.Keyword,
              insertText: 'for (${1:.array}) ${2:expression}',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Iterate over an array',
              range,
            },
            {
              label: 'if',
              kind: monaco.languages.CompletionItemKind.Keyword,
              insertText: 'if (${1:condition}) ${2:then} else ${3:else}',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Conditional expression',
              range,
            },
            {
              label: 'size',
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: 'size(${1:value})',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Get the size of an array, object, or string',
              range,
            },
            {
              label: 'string',
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: 'string(${1:value})',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Convert value to string',
              range,
            },
            {
              label: 'number',
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: 'number(${1:value})',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Convert value to number',
              range,
            },
            {
              label: 'boolean',
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: 'boolean(${1:value})',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Convert value to boolean',
              range,
            },
            {
              label: 'let',
              kind: monaco.languages.CompletionItemKind.Keyword,
              insertText: 'let ${1:variable} = ${2:expression}',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Define a variable',
              range,
            },
          ];

          return {
            suggestions,
          } as monaco.languages.CompletionList;
        },
      });
    }

    // Set editor options
    editor.updateOptions({
      minimap: { enabled: false },
      fontSize: 14,
      lineNumbers: 'on',
      wordWrap: 'on',
      automaticLayout: true,
      scrollBeyondLastLine: false,
      readOnly,
    });

    // Add placeholder support
    if (placeholder && !value) {
      editor.onDidChangeModelContent(() => {
        const model = editor.getModel();
        if (model && model.getValue() === '') {
          // Show placeholder
        }
      });
    }
  };

  const handleEditorChange = (newValue: string | undefined) => {
    onChange(newValue || '');
  };

  return (
    <Editor
      height={height}
      language={language === 'jslt' ? 'jslt' : 'json'}
      value={value}
      onChange={handleEditorChange}
      onMount={handleEditorDidMount}
      theme="vs-dark"
      options={{
        selectOnLineNumbers: true,
        minimap: { enabled: false },
        fontSize: 14,
        wordWrap: 'on',
        automaticLayout: true,
        scrollBeyondLastLine: false,
        readOnly,
      }}
    />
  );
};

export default CodeEditor;