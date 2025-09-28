import { useCallback, useState } from 'react';
import { transformJson, validateJSLT } from '../utils/api';
import type { JSLTValidationResponse, TransformResponse } from '@/types/api';

export const useTransform = () => {
  const [isTransforming, setIsTransforming] = useState(false);
  const [transformResult, setTransformResult] = useState<TransformResponse | null>(null);
  const [validationResult, setValidationResult] = useState<JSLTValidationResponse | null>(null);

  const transform = useCallback(async (inputJson: string, jsltExpression: string) => {
    setIsTransforming(true);
    try {
      const parsedInput = JSON.parse(inputJson);
      const result = await transformJson({
        input_json: parsedInput,
        jslt_expression: jsltExpression,
      });
      setTransformResult(result);
      return result;
    } catch (error) {
      const errorResult: TransformResponse = {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        execution_time_ms: 0,
      };
      setTransformResult(errorResult);
      return errorResult;
    } finally {
      setIsTransforming(false);
    }
  }, []);

  const validate = useCallback(async (jsltExpression: string) => {
    try {
      const result = await validateJSLT({ jslt_expression: jsltExpression });
      setValidationResult(result);
      return result;
    } catch (error) {
      const errorResult: JSLTValidationResponse = {
        valid: false,
        error: error instanceof Error ? error.message : 'Validation failed',
      };
      setValidationResult(errorResult);
      return errorResult;
    }
  }, []);

  return {
    transform,
    validate,
    isTransforming,
    transformResult,
    validationResult,
  };
};