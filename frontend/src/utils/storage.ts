class storage {
    // Token Management
    static setToken(token: string | null): void {
      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('isAuthenticated', 'true');
      } else {
        this.clearToken();
      }
    }
  
    static getToken(): string | null {
      return localStorage.getItem('token');
    }
  
    static clearToken(): void {
      localStorage.removeItem('token');
      localStorage.removeItem('isAuthenticated');
    }
  
    // Authentication Status
    static setAuthStatus(status: boolean): void {
      localStorage.setItem('isAuthenticated', status.toString());
    }
  
    static getAuthStatus(): boolean {
      const status = localStorage.getItem('isAuthenticated');
      return status === 'true';
    }
  
    // User Information (optional, can be expanded)
    static setUserInfo(userInfo: Record<string, any>): void {
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
    }
  
    static getUserInfo(): Record<string, any> | null {
      const userInfo = localStorage.getItem('userInfo');
      return userInfo ? JSON.parse(userInfo) : null;
    }
  
    static clearUserInfo(): void {
      localStorage.removeItem('userInfo');
    }
  
    // Clear All Authentication-related Storage
    static clearAll(): void {
      this.clearToken();
      this.clearUserInfo();
    }
  }
  
  export default storage;