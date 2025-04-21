# 🐰 Easter Bunny Tracker

A fun, interactive web application that tracks the Easter Bunny's journey around the world on Easter day. Watch as the bunny hops from city to city, delivering Easter baskets to children worldwide!

## Features

- 🗺️ Real-time tracking of the Easter Bunny on an interactive world map
- 🏙️ Journey through major cities around the world
- 🧺 Live counter of Easter baskets delivered
- 📍 Personalized arrival time based on your location
- 🎨 Child-friendly, colorful design
- 🌎 Educational Easter facts from around the world

## Technology Stack

- React with TypeScript
- Vite for fast development
- TailwindCSS for styling
- Leaflet.js for interactive maps
- Vitest for testing

## Live Demo

Check out the Easter Bunny Tracker live at: [https://outofcoffee.github.io/easter-tracker/](https://outofcoffee.github.io/easter-tracker/)

## Getting Started

### Prerequisites

- Node.js (v22 or newer)
- npm

If you use Node Version Manager (nvm), you can set up the correct Node.js version with:
```bash
nvm use
```
The repository includes an `.nvmrc` file that specifies the correct version.

### Installation

```bash
# Clone the repository
git clone https://github.com/outofcoffee/easter-tracker.git
cd easter-tracker

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Testing with Mock Time

For testing different times of day, you can use environment variables to control the Easter Bunny's position:

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Edit the `.env` file to set one of the following:
   - `VITE_MOCK_TIME`: Set specific date AND time (e.g., `2025-04-20T12:30:00Z` for 12:30 PM on Easter)
   - `VITE_MOCK_DATE`: Set only the date but use real time (e.g., `2025-04-20` for Easter day)

3. Enable debug mode to see the current simulated time:
   ```
   VITE_DEBUG=true
   ```

### Build for Production

```bash
npm run build

# The built files will be in the dist/ directory
```

## Testing

```bash
npm test
```

## Project Structure

```
eastertracker/
├── src/
│   ├── components/
│   │   ├── Map/           # Map and bunny location components
│   │   ├── BunnySprite/   # Bunny animation and marker
│   │   ├── ProgressTracker/ # Delivery progress components
│   │   ├── LocationInfo/  # User location components
│   │   └── UI/            # Header, footer, and other UI components
│   ├── data/
│   │   ├── cities.ts      # City database
│   │   └── easterFacts.ts # Easter facts from around the world
│   ├── hooks/             # Custom React hooks
│   ├── context/           # Global state management
│   ├── utils/             # Utility functions
│   └── assets/            # Images and other static assets
└── public/                # Public assets
```

## How It Works

The Easter Bunny Tracker simulates the Easter Bunny's journey around the world. Since Easter is celebrated on different times across the world's timezones, the bunny's journey spans approximately 50 hours - from when Easter day begins in the easternmost timezone (UTC+14) until Easter day ends in the westernmost timezone (UTC-12).

Key Features:
- **Global Easter Period**: The bunny is active during the entire ~50 hour global Easter period
- **Timezone-Aware Delivery**: The bunny visits each city at midnight local time, when children are asleep
- **Realistic Journey**: The bunny travels from east to west, following the progression of midnight across timezones
- **Live Tracking**: See the bunny's current location, city, and progress in real-time
- **Basket Counting**: Watch as the bunny delivers Easter baskets across the world
- **Location-Aware**: Get personalized information about when the bunny will visit your location
- **Sleeping Bunny**: On non-Easter days, see the bunny resting until the next Easter

## License

This project is open source and available under the [MIT License](LICENSE).

## Deployment

This project uses GitHub Actions to automatically deploy to GitHub Pages whenever changes are pushed to the main branch.

The deployment workflow:
1. Sets up Node.js v22
2. Builds the React application
3. Deploys the built files to GitHub Pages
4. Makes the application available at [https://outofcoffee.github.io/easter-tracker/](https://outofcoffee.github.io/easter-tracker/)

The deployment configuration can be found in the `.github/workflows/deploy.yml` file.

## Acknowledgments

- Map data from OpenStreetMap
- Easter facts from various cultural sources
- Inspiration from the NORAD Santa Tracker

---

Created with ❤️ for Easter 2025