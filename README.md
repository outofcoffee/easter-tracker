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

## Getting Started

### Prerequisites

- Node.js (v16 or newer)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/eastertracker.git
cd eastertracker

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

2. Edit the `.env` file to set:
   - `VITE_MOCK_TIME`: A specific ISO-format time (e.g., `2025-04-20T12:30:00Z` for 12:30 PM on Easter)

3. Enable debug mode to see the current simulated time:
   ```
   VITE_DEBUG=true
   ```

### Build for Production

```bash
npm run build
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

The Easter Bunny Tracker simulates the Easter Bunny's journey on Easter day (April 20, 2025). It calculates the bunny's current position based on the time of day, creating a realistic journey from east to west around the world.

The tracker shows:
- The bunny's current location on a map
- Which city the bunny is currently visiting
- The number of Easter baskets delivered so far
- How far along the journey the bunny is
- When the bunny will arrive at the user's location

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Map data from OpenStreetMap
- Easter facts from various cultural sources
- Inspiration from the NORAD Santa Tracker

---

Created with ❤️ for Easter 2025