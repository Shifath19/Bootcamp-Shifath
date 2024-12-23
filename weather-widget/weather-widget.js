// weather-widget.js
export class CityWeather extends HTMLElement {
  constructor() {
      super();
      this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
      return ['city'];
  }

  connectedCallback() {
      this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'city' && oldValue !== newValue) {
          this.render();
      }
  }

  async getWeatherData(city) {
      // Mock weather data - in production, replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
      return {
          temperature: Math.floor(Math.random() * 30) + 10,
          condition: ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy'][Math.floor(Math.random() * 4)],
          humidity: Math.floor(Math.random() * 50) + 30,
          windSpeed: Math.floor(Math.random() * 20) + 5
      };
  }

  async render() {
      const city = this.getAttribute('city') || 'Los Angeles';
      
      // Show loading state
      this.shadowRoot.innerHTML = this.getLoadingTemplate();
      
      try {
          const weather = await this.getWeatherData(city);
          this.shadowRoot.innerHTML = this.getWeatherTemplate(city, weather);
      } catch (error) {
          this.shadowRoot.innerHTML = this.getErrorTemplate(city);
      }
  }

  getLoadingTemplate() {
      return `
          <style>${this.getStyles()}</style>
          <div class="weather-card loading">
              <div class="loading-text">Loading weather data...</div>
          </div>
      `;
  }

  getErrorTemplate(city) {
      return `
          <style>${this.getStyles()}</style>
          <div class="weather-card error">
              <div class="error-text">
                  Unable to load weather data for ${city}
              </div>
          </div>
      `;
  }

  getWeatherTemplate(city, weather) {
      return `
          <style>${this.getStyles()}</style>
          <div class="weather-card">
              <div class="city-name">${city}</div>
              <div class="temperature">${weather.temperature}°C</div>
              <div class="condition">${weather.condition}</div>
              <div class="details">
                  <div class="detail-item">
                      <span class="label">Humidity:</span>
                      <span class="value">${weather.humidity}%</span>
                  </div>
                  <div class="detail-item">
                      <span class="label">Wind:</span>
                      <span class="value">${weather.windSpeed} km/h</span>
                  </div>
              </div>
          </div>
      `;
  }

  getStyles() {
      return `
          .weather-card {
              font-family: Arial, sans-serif;
              background: linear-gradient(135deg, #4a90e2, #87ceeb);
              color: white;
              padding: 20px;
              border-radius: 12px;
              box-shadow: 0 4px 6px rgba(0,0,0,0.1);
              width: 300px;
              margin: 20px;
              transition: all 0.3s ease;
          }

          .weather-card:hover {
              transform: translateY(-5px);
              box-shadow: 0 6px 12px rgba(0,0,0,0.15);
          }

          .city-name {
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 15px;
          }

          .temperature {
              font-size: 48px;
              font-weight: bold;
              margin: 10px 0;
          }

          .condition {
              font-size: 20px;
              margin: 10px 0;
              opacity: 0.9;
          }

          .details {
              margin-top: 20px;
              border-top: 1px solid rgba(255,255,255,0.3);
              padding-top: 15px;
          }

          .detail-item {
              display: flex;
              justify-content: space-between;
              margin: 5px 0;
          }

          .label {
              opacity: 0.8;
          }

          .loading {
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 200px;
          }

          .loading-text {
              font-size: 18px;
              opacity: 0.8;
          }

          .error {
              background: linear-gradient(135deg, #e74c3c, #c0392b);
          }

          .error-text {
              text-align: center;
              font-size: 16px;
              opacity: 0.9;
          }
      `;
  }
}

customElements.define('city-weather', CityWeather);