const express = require('express');
const axios = require('axios');
const cors = require('cors');
const config = require('./config');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(cors());

const openWeatherApiKey = config.openWeatherApiKey;
const newsApiKey = config.newsApiKey;
const currencyExchangeApiKey = config.currencyExchangeApiKey;

// Ensure API keys are provided in the config
if (!openWeatherApiKey || !newsApiKey || !currencyExchangeApiKey) {
  console.error('Please provide API keys in the config.js file.');
  process.exit(1);
}

// Weather endpoint
app.get('/weather', async (req, res) => {
  try {
    const city = req.query.city || 'Nur-Sultan'; // Use the provided city or default to 'Nur-Sultan'

    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openWeatherApiKey}`);
    const weatherData = response.data;

    const {
      main,
      description,
      icon,
      coord,
      wind,
      sys,
      rain
    } = weatherData;

    const formattedData = {
      temperature: main.temp,
      description: description,
      icon: icon,
      coordinates: {
        latitude: coord.lat,
        longitude: coord.lon
      },
      feelsLike: main.feels_like,
      humidity: main.humidity,
      pressure: main.pressure,
      windSpeed: wind.speed,
      countryCode: sys.country,
      rainVolumeLast3Hours: rain ? rain['3h'] : 0
    };

    res.json(formattedData);
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

// News endpoint
app.get('/news', async (req, res) => {
  try {
    const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${newsApiKey}`);
    const newsData = response.data.articles.slice(0, 5);

    res.json(newsData);
  } catch (error) {
    console.error('Error fetching news data:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

// Exchange rates endpoint
app.get('/exchange-rates', async (req, res) => {
  try {
    const response = await axios.get(`https://open.er-api.com/v6/latest/USD?app_id=${currencyExchangeApiKey}`, {
      params: {
        base: 'USD',
        symbols: 'EUR,GBP,JPY'
      }
    });

    const exchangeRatesData = response.data.rates;

    res.json(exchangeRatesData);
  } catch (error) {
    console.error('Error fetching exchange rates data:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
