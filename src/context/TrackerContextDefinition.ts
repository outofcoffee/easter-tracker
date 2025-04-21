import { createContext } from 'react';
import { TrackerContextType, defaultContext } from './TrackerContext.types';

// Create and export the context
export const TrackerContext = createContext<TrackerContextType>(defaultContext);