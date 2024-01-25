# Weather, News, and Exchange App

This application provides real-time weather information, top business headlines, and exchange rates. It uses various APIs to fetch data and display it in a user-friendly manner.

## Table of Contents
- [Weather Information]
- [News]
- [Exchange Rates]

## Weather Information

The Weather section displays real-time weather data, including temperature, description, icon, coordinates, feels-like temperature, humidity, pressure, wind speed, country code, and rain volume for the last 3 hours.

## News

The News section shows top business headlines in the US right now.

## Exchange Rates

The Exchange Rates section displays the latest exchange rates for EUR, GBP, JPY, and other currencies against USD.

## Install dependencies: npm install express axios

## Create a config.js file in the project root and provide API keys:

module.exports = {
  openWeatherApiKey: 'YOUR_OPENWEATHERMAP_API_KEY',
  newsApiKey: 'YOUR_NEWS_API_KEY',
  currencyExchangeApiKey: 'YOUR_CURRENCY_EXCHANGE_API_KEY',
};

## Start the server:

npm start

## API Keys:

Make sure to obtain API keys for the following services:

OpenWeatherMap API: OpenWeatherMap API

News API: News API

Open Exchange Rates API: Open Exchange Rates API

Provide these API keys in the config.js file.

