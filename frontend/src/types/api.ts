export interface TransformRequest {
  input_json: Record<string, any>;
  jslt_expression: string;
}

export interface TransformResponse {
  success: boolean;
  output?: Record<string, any>;
  error?: string;
  execution_time_ms: number;
}

export interface JSLTValidationRequest {
  jslt_expression: string;
}

export interface JSLTValidationResponse {
  valid: boolean;
  error?: string;
  suggestions?: string[];
}