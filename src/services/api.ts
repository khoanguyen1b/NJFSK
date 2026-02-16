import apiClient from '@/lib/api-client';
import { ApiResponse, AuthResponse, User } from '@/types/api';

export const authService = {
  login: async (data: any) => {
    const response = await apiClient.post<ApiResponse<AuthResponse>>('/auth/login', data);
    return response.data;
  },
  logout: async () => {
    const response = await apiClient.post<ApiResponse<null>>('/auth/logout');
    return response.data;
  },
  refresh: async (refreshToken: string) => {
    const response = await apiClient.post<ApiResponse<AuthResponse>>('/auth/refresh', {
      refresh_token: refreshToken,
    });
    return response.data;
  },
};

export const userService = {
  list: async () => {
    const response = await apiClient.get<ApiResponse<User[]>>('/users');
    return response.data;
  },
  get: async (id: string) => {
    const response = await apiClient.get<ApiResponse<User>>(`/users/${id}`);
    return response.data;
  },
  create: async (data: Partial<User>) => {
    const response = await apiClient.post<ApiResponse<User>>('/users', data);
    return response.data;
  },
  update: async (id: string, data: Partial<User>) => {
    const response = await apiClient.put<ApiResponse<User>>(`/users/${id}`, data);
    return response.data;
  },
  delete: async (id: string) => {
    const response = await apiClient.delete<ApiResponse<null>>(`/users/${id}`);
    return response.data;
  },
};

export const customerService = {
  list: async () => {
    const response = await apiClient.get<ApiResponse<any[]>>('/customers');
    return response.data;
  },
  get: async (id: string) => {
    const response = await apiClient.get<ApiResponse<any>>(`/customers/${id}`);
    return response.data;
  },
  create: async (data: any) => {
    const response = await apiClient.post<ApiResponse<any>>('/customers', data);
    return response.data;
  },
  update: async (id: string, data: any) => {
    const response = await apiClient.put<ApiResponse<any>>(`/customers/${id}`, data);
    return response.data;
  },
  delete: async (id: string) => {
    const response = await apiClient.delete<ApiResponse<null>>(`/customers/${id}`);
    return response.data;
  },
};
