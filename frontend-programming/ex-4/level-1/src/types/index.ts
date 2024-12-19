export interface User {
  id: number;
  name: string;
  age: number;
  grade: string;
}

export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  column: keyof User;
  direction: SortDirection;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

export interface TableOptions {
  sortable: boolean;
  filterable: boolean;
}