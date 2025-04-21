import { useContext } from 'react';
import { TrackerContext } from '../context/TrackerContextDefinition';

// Export the useTracker hook
export const useTracker = () => useContext(TrackerContext);