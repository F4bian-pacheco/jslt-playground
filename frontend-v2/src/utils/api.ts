import axios from 'axios';
import type { JSLTValidationRequest, JSLTValidationResponse, TransformRequest, TransformResponse } from '../types/api';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: `${API_BASE_URL}/api/v1`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const transformJson = async (request: TransformRequest): Promise<TransformResponse> => {
  const response = await api.post<TransformResponse>('/transform', request);
  return response.data;
};

export const validateJSLT = async (request: JSLTValidationRequest): Promise<JSLTValidationResponse> => {
  const response = await api.post<JSLTValidationResponse>('/validate', request);
  return response.data;
};

export const healthCheck = async (): Promise<{ status: string; service: string }> => {
  const response = await api.get('/health');
  return response.data;
};