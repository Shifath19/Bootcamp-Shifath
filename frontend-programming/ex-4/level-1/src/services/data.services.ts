import { getEnvironmentConfig } from './config';
import type { User } from '../types';

export class DataService {
  private config = getEnvironmentConfig();

  async fetchUsers(): Promise<User[]> {
    if (this.config.enableMockData) {
      return this.getMockData();
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.config.apiTimeout);

      const response = await fetch(`${this.config.apiUrl}/users`, {
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      if (this.config.debugMode) {
        console.error('Data fetch error:', error);
      }
      throw new Error('Failed to fetch users');
    }
  }

  private getMockData(): Promise<User[]> {
    return Promise.resolve([
      { id: 1, name: 'John Doe', age: 25, grade: 'A' },
      { id: 2, name: 'Jane Smith', age: 22, grade: 'B' },
      { id: 3, name: 'Bob Johnson', age: 28, grade: 'A' }
    ]);
  }
}