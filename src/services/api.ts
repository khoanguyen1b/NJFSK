import apiClient from '@/lib/api-client';
import { ApiResponse, AuthResponse, User, Customer, Note } from '@/types/api';

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
    const response = await apiClient.get<ApiResponse<Customer[]>>('/customers');
    return response.data;
  },
  get: async (id: string) => {
    const response = await apiClient.get<ApiResponse<Customer>>(`/customers/${id}`);
    return response.data;
  },
  create: async (data: Partial<Customer>) => {
    const response = await apiClient.post<ApiResponse<Customer>>('/customers', data);
    return response.data;
  },
  update: async (id: string, data: Partial<Customer>) => {
    const response = await apiClient.put<ApiResponse<Customer>>(`/customers/${id}`, data);
    return response.data;
  },
  delete: async (id: string) => {
    const response = await apiClient.delete<ApiResponse<null>>(`/customers/${id}`);
    return response.data;
  },
  handleSendEmail: async (customerId: string) => {
    try {
      const response = await apiClient.post<ApiResponse<null>>(`/customers/${customerId}/send-email`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  exportPdf: async () => {
    const response = await apiClient.get('/customers/export/pdf', { responseType: 'blob' });
    return response.data;
  },
  exportExcel: async () => {
    const response = await apiClient.get('/customers/export/excel', { responseType: 'blob' });
    return response.data;
  },
};

export const noteService = {
  list: async (customerId?: string) => {
    const params = customerId ? { customer_id: customerId } : {};
    const response = await apiClient.get<ApiResponse<Note[]>>('/notes', { params });
    return response.data;
  },
  get: async (id: string) => {
    const response = await apiClient.get<ApiResponse<Note>>(`/notes/${id}`);
    return response.data;
  },
  create: async (data: { content: string; customer_id: string }) => {
    const response = await apiClient.post<ApiResponse<Note>>('/notes', data);
    return response.data;
  },
  update: async (id: string, data: { content: string }) => {
    const response = await apiClient.put<ApiResponse<Note>>(`/notes/${id}`, data);
    return response.data;
  },
  delete: async (id: string) => {
    const response = await apiClient.delete<ApiResponse<null>>(`/notes/${id}`);
    return response.data;
  },
};
