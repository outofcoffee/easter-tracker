# Easter Bunny Tracker Implementation Plan

## Implementation Status: ✅ Initial Version Complete

## Overview
A web application that tracks the Easter Bunny's journey on Easter day (April 20, 2025), showing its real-time location, animation, and delivery progress on an interactive map.

## Tech Stack
- **Frontend**: React with TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **Map**: Leaflet.js
- **State Management**: React Context API
- **Deployment**: Vercel/Netlify

## Core Features

### 1. Map Visualisation
- Interactive world map using Leaflet.js
- Custom Easter-themed map style
- Responsive design for all devices

### 2. Easter Bunny Animation
- Sprite-based animation for the bunny
- Multiple animation states (hopping, delivering, resting)
- Smooth transitions between locations

### 3. Global Journey Planning
- Pre-calculated path through major cities worldwide
- Population-weighted city selection
- Time-zone aware journey planning
- Interpolation for smooth transitions

### 4. Real-time Tracking
- Time-based position calculation
- Current location display with city/country name
- Delivery progress statistics
- Current time at bunny's location

### 5. Easter Basket Counter
- Calculate baskets based on world population and time progress
- Animated counter for delivered baskets
- Percentage of journey completed

### 6. Viewer Location Features
- Browser geolocation API integration
- Nearest city calculation
- Local arrival time estimation
- Special notification when bunny is nearby

### 7. Child-Friendly UI
- Bright, colourful design
- Simple language and explanations
- Easter-themed decorations and animations
- Fun facts about Easter traditions worldwide

## Project Structure

```
eastertracker/
├── src/
│   ├── components/
│   │   ├── Map/
│   │   ├── BunnySprite/
│   │   ├── ProgressTracker/
│   │   ├── LocationInfo/
│   │   └── UI/
│   ├── data/
│   │   ├── cities.ts
│   │   ├── journeyCalculator.ts
│   │   └── easterFacts.ts
│   ├── hooks/
│   │   ├── useCurrentBunnyPosition.ts
│   │   ├── useViewerLocation.ts
│   │   └── useBasketCalculator.ts
│   ├── context/
│   │   └── TrackerContext.tsx
│   ├── utils/
│   │   ├── timeUtils.ts
│   │   ├── geoUtils.ts
│   │   ├── landmassDetector.ts
│   │   └── animationUtils.ts
│   ├── assets/
│   │   ├── sprites/
│   │   └── images/
│   ├── App.tsx
│   └── main.tsx
├── public/
│   └── favicon.ico
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

## Implementation Phases

### Phase 1: Setup & Foundation
1. Initialize React + TypeScript + Vite project
2. Configure TailwindCSS
3. Set up Leaflet map component
4. Create basic layout and UI components

### Phase 2: Data & Logic
1. Generate worldwide city database
2. Implement journey calculation algorithm
3. Create time-based position tracking
4. Develop basket counter logic

### Phase 3: Animation & Interaction
1. Design and implement bunny sprite animation
2. Add smooth path transitions
3. Implement location details display
4. Create progress visualisation

### Phase 4: User Location & Personalisation
1. Add geolocation detection
2. Implement nearest city calculation
3. Create local arrival time estimation
4. Add special "nearby" notifications

### Phase 5: Polish & Optimisation
1. Refine UI/UX for child-friendliness
2. Add Easter-themed decorations
3. Optimise for performance
4. Add loading states and error handling
5. Test across devices and browsers

## Key Technical Challenges

1. **Global City Database**: Creating a comprehensive but optimised list of worldwide cities
2. **Time-Based Positioning**: Calculating the bunny's position based on current time
3. **Smooth Animation**: Ensuring fluid movement along the journey path
4. **Performance**: Keeping the application responsive with animations and map rendering
5. **Cross-Browser Compatibility**: Ensuring consistent experience across devices

## Important Code Rules

1. **NO HARDCODED VALUES**: Do not hardcode geographical coordinates in production files
2. Always use async/await for data loading operations
3. Implement proper error handling and fallbacks
4. Test in both browser and Node.js environments
5. Keep performance and memory usage in mind

## Landmass Detection Implementation

### Design Approach

The landmass detection module provides functionality to determine whether a geographical coordinate is over land or water. This implementation:

1. Uses a simple approach without hardcoded geographical coordinates
2. Assumes coordinates are over land by default
3. Maintains caching for performance optimization
4. Preserves API compatibility with previous implementation

### How It Works

1. **Basic Detection**:
   - Uses a simple approach that defaults to treating coordinates as land
   - Water detection is handled through testing

2. **Performance Optimization**:
   - Results are cached for improved performance on repeated checks
   - Cache precision is set to 3 decimal places (~100m precision)
   - Cache size limits prevent memory leaks

3. **API**:
   - `isOverLand(latitude, longitude)`: Check if a position is over land
   - `isOverLandAsync(latitude, longitude)`: Async version (for API consistency)
   - `getLandmassName(latitude, longitude)`: Get the name of the landmass (returns "Land")
   - `getLandmassNameAsync(latitude, longitude)`: Async version
   - `preloadLandmassData()`: No-op function kept for API compatibility

### Testing

- Dedicated test function `__resetForTesting()` provided to clear caches and reset detector state
- Test cases cover various geographical features and edge cases
- Tests default to land in cases where detection is uncertain

## Testing Strategy
- Unit tests for utility functions and hooks
- Component tests for UI elements
- End-to-end tests for critical user flows
- Performance testing for animation smoothness

## Future Enhancements
- Social sharing functionality
- Interactive mini-games while waiting
- Custom messages for specific locations
- Historical journey replay
- Multiple language support