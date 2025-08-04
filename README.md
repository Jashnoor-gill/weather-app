# Weather App

A beautiful, responsive weather application built with React, TypeScript, and Tailwind CSS. The app fetches real-time weather data from the OpenWeatherMap API and provides a modern, intuitive user interface.

## Features

- 🌤️ **Real-time Weather Data**: Get current weather information for any city
- 🎨 **Dynamic Backgrounds**: Background changes based on weather conditions
- 🌙 **Dark/Light Mode**: Toggle between light and dark themes
- 📱 **Responsive Design**: Works perfectly on desktop and mobile devices
- 🔍 **Search Functionality**: Easy city search with autocomplete
- 📊 **Detailed Information**: Temperature, humidity, wind speed, pressure, and more
- ⏰ **Sunrise/Sunset Times**: Display local sunrise and sunset times
- 🎯 **Weather Icons**: Visual weather condition indicators

## Prerequisites

Before running this app, you'll need:

1. **Node.js** (version 14 or higher)
2. **npm** or **yarn**
3. **OpenWeatherMap API Key** (free at [openweathermap.org](https://openweathermap.org/api))

## Setup Instructions

### 1. Clone or Download the Project
```bash
# If you have the project files, navigate to the weather-app directory
cd weather-app
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Get Your API Key
1. Go to [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Get your API key from the dashboard
4. Replace `YOUR_API_KEY` in `src/App.tsx` with your actual API key

### 4. Start the Development Server
```bash
npm start
```

The app will open in your browser at `http://localhost:3000`

## Usage

1. **Search for a City**: Enter any city name in the search bar
2. **View Weather**: See current temperature, conditions, and detailed metrics
3. **Toggle Theme**: Click the sun/moon icon to switch between light and dark modes
4. **Responsive Design**: The app automatically adapts to your screen size

## API Configuration

To use the weather API, you need to:

1. Replace `YOUR_API_KEY` in the `src/App.tsx` file (line 35) with your actual OpenWeatherMap API key
2. The API endpoint used is: `https://api.openweathermap.org/data/2.5/weather`

## Project Structure

```
weather-app/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── SearchBar.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── WeatherCard.tsx
│   ├── types/
│   │   └── weather.ts
│   ├── App.tsx
│   ├── index.tsx
│   └── index.css
├── package.json
├── tailwind.config.js
└── README.md
```

## Technologies Used

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling and responsive design
- **Lucide React** - Icons
- **OpenWeatherMap API** - Weather data

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (not recommended)

## Customization

### Adding New Weather Conditions
You can customize the background colors by modifying the `getBackgroundClass` function in `src/App.tsx`.

### Styling Changes
The app uses Tailwind CSS with custom components. You can modify styles in:
- `src/index.css` - Global styles and custom components
- Individual component files - Component-specific styles

## Troubleshooting

### Common Issues

1. **API Key Error**: Make sure you've replaced `YOUR_API_KEY` with your actual API key
2. **City Not Found**: Ensure the city name is spelled correctly
3. **Build Errors**: Try deleting `node_modules` and running `npm install` again

### Getting Help

If you encounter any issues:
1. Check the browser console for error messages
2. Verify your API key is correct
3. Ensure all dependencies are installed

## License

This project is open source and available under the MIT License.

## Contributing

Feel free to submit issues and enhancement requests!

---

**Note**: This app requires an internet connection to fetch weather data from the OpenWeatherMap API. 