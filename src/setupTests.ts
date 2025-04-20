// Setup file for tests
// This will be executed before each test file
import { vi } from 'vitest';
import React from 'react';

// Mock for Leaflet
vi.mock('leaflet', () => {
  return {
    default: {
      Icon: {
        Default: {
          prototype: {
            _getIconUrl: undefined
          },
          mergeOptions: vi.fn()
        }
      },
      icon: vi.fn().mockReturnValue({}),
      marker: vi.fn().mockReturnValue({
        bindPopup: vi.fn().mockReturnThis(),
        addTo: vi.fn().mockReturnThis()
      }),
      map: vi.fn().mockReturnValue({
        setView: vi.fn(),
        getZoom: vi.fn().mockReturnValue(10)
      })
    }
  };
});

// Mock for react-leaflet
vi.mock('react-leaflet', () => {
  return {
    MapContainer: vi.fn().mockImplementation(({ children }) => <div>{children}</div>),
    TileLayer: vi.fn().mockImplementation(() => <div />),
    Marker: vi.fn().mockImplementation(({ children }) => <div>{children}</div>),
    Popup: vi.fn().mockImplementation(({ children }) => <div>{children}</div>),
    useMap: vi.fn().mockReturnValue({
      setView: vi.fn(),
      getZoom: vi.fn().mockReturnValue(10)
    })
  };
});