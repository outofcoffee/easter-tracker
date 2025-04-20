// Setup file for tests
// This will be executed before each test file
import { vi } from 'vitest';

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
  // @ts-ignore
  const mockChildren = ({ children }: { children: any }) => {
    return { children };
  };
  
  return {
    MapContainer: vi.fn().mockImplementation(mockChildren),
    TileLayer: vi.fn().mockImplementation(() => ({})),
    Marker: vi.fn().mockImplementation(mockChildren),
    Popup: vi.fn().mockImplementation(mockChildren),
    useMap: vi.fn().mockReturnValue({
      setView: vi.fn(),
      getZoom: vi.fn().mockReturnValue(10)
    })
  };
});