import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import CodeEditor from './CodeEditor';
import { useTransform } from '../hooks/useTransform';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #1e1e1e;
  color: #d4d4d4;
`;

const Header = styled.header`
  padding: 1rem 2rem;
  background-color: #2d2d30;
  border-bottom: 1px solid #3e3e42;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  color: #ffffff;
`;

const Controls = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  transition: background-color 0.2s;

  ${props => props.variant === 'primary' ? `
    background-color: #0e639c;
    color: white;

    &:hover {
      background-color: #1177bb;
    }

    &:disabled {
      background-color: #094771;
      cursor: not-allowed;
    }
  ` : `
    background-color: #3c3c3c;
    color: #d4d4d4;

    &:hover {
      background-color: #4c4c4c;
    }
  `}
`;

const StatusBar = styled.div`
  padding: 0.5rem 2rem;
  background-color: #007acc;
  color: white;
  font-size: 0.875rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  min-height: 0;
`;

const Panel = styled.div<{ flex?: number }>`
  flex: ${props => props.flex || 1};
  display: flex;
  flex-direction: column;
  min-width: 0;
  border-right: 1px solid #3e3e42;

  &:last-child {
    border-right: none;
  }
`;

const PanelHeader = styled.div`
  padding: 0.75rem 1rem;
  background-color: #2d2d30;
  border-bottom: 1px solid #3e3e42;
  font-size: 0.875rem;
  font-weight: 500;
  color: #cccccc;
`;

const PanelContent = styled.div`
  flex: 1;
  position: relative;
`;

const ErrorMessage = styled.div`
  background-color: #f14c4c;
  color: white;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
`;

const SuccessMessage = styled.div`
  background-color: #28a745;
  color: white;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
`;

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
    <Container>
      <Header>
        <Title>JSLT Playground</Title>
        <Controls>
          <Button variant="secondary" onClick={handleClear}>
            Clear
          </Button>
          <Button variant="primary" onClick={handleTransform} disabled={isTransforming}>
            {isTransforming ? 'Transforming...' : 'Transform'}
          </Button>
        </Controls>
      </Header>

      {transformResult && !transformResult.success && (
        <ErrorMessage>
          Error: {transformResult.error}
        </ErrorMessage>
      )}

      {transformResult && transformResult.success && (
        <SuccessMessage>
          Transformation completed in {transformResult.execution_time_ms.toFixed(3)}ms
        </SuccessMessage>
      )}

      {validationResult && !validationResult.valid && (
        <ErrorMessage>
          JSLT Validation Error: {validationResult.error}
          {validationResult.suggestions && validationResult.suggestions.length > 0 && (
            <div style={{ marginTop: '0.5rem' }}>
              Suggestions: {validationResult.suggestions.join(', ')}
            </div>
          )}
        </ErrorMessage>
      )}

      <MainContent>
        <Panel>
          <PanelHeader>Input JSON</PanelHeader>
          <PanelContent>
            <CodeEditor
              value={inputJson}
              onChange={setInputJson}
              language="json"
              placeholder="Enter your input JSON here..."
            />
          </PanelContent>
        </Panel>

        <Panel>
          <PanelHeader>JSLT Expression</PanelHeader>
          <PanelContent>
            <CodeEditor
              value={jsltExpression}
              onChange={setJsltExpression}
              language="jslt"
              placeholder="Enter your JSLT transformation here..."
            />
          </PanelContent>
        </Panel>

        <Panel>
          <PanelHeader>Output JSON</PanelHeader>
          <PanelContent>
            <CodeEditor
              value={outputJson}
              onChange={() => {}} // Read-only
              language="json"
              placeholder="Transformed output will appear here..."
              readOnly
            />
          </PanelContent>
        </Panel>
      </MainContent>

      <StatusBar>
        <div>
          JSLT Playground - JSON Language Transformation
        </div>
        <div>
          {validationResult?.valid ? '✓ Valid JSLT' : validationResult ? '✗ Invalid JSLT' : 'Ready'}
        </div>
      </StatusBar>
    </Container>
  );
};

export default PlaygroundLayout;