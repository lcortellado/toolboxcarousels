import {decode as atob} from 'base-64';

const API_BASE_URL = 'https://echo-serv.tbxnet.com';

class ApiService {
  constructor() {
    this.token = null;
    this.tokenType = null;
    this.tokenExpiry = null;
  }

  async login() {
    try {
      const response = await fetch(`${API_BASE_URL}/v1/mobile/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
        body: JSON.stringify({
          sub: 'ToolboxMobileTest',
        }),
      });

      if (!response.ok) {
        throw new Error(`Login failed: ${response.status}`);
      }

      const data = await response.json();

      this.token = data.token;
      this.tokenType = data.type;

      // Parse JWT expiration date
      const tokenPayload = JSON.parse(atob(data.token.split('.')[1]));
      this.tokenExpiry = new Date(tokenPayload.expireDate);

      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  isTokenExpired() {
    if (!this.token || !this.tokenExpiry) {
      return true;
    }

    const margin = 5 * 60 * 1000; // 5 munutes
    return new Date() >= new Date(this.tokenExpiry.getTime() - margin);
  }

  async getCarouselData() {
    try {
      if (this.isTokenExpired()) {
        await this.login();
      }

      const response = await fetch(`${API_BASE_URL}/v1/mobile/data`, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          authorization: `${this.tokenType} ${this.token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Data fetch failed: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Get carousel data error:', error);
      throw error;
    }
  }
}

export default new ApiService();
