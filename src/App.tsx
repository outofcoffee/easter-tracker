import { useEffect, useState } from 'react';
import Header from './components/UI/Header';
import Footer from './components/UI/Footer';
import Map from './components/Map/Map';
import ProgressTracker from './components/ProgressTracker/ProgressTracker';
import LocationInfo from './components/LocationInfo/LocationInfo';
import DebugInfo from './components/UI/DebugInfo';
import SleepingBunny from './components/UI/SleepingBunny';
import { useTracker } from './hooks/useTracker';
import { getRandomFact } from './data/easterFacts';

function App() {
  const { currentPosition, isEasterDay } = useTracker();
  const [loading, setLoading] = useState(true);
  const [fact, setFact] = useState(getRandomFact());

  // Simulate loading time to ensure all data is ready
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Change fact every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setFact(getRandomFact());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-easter-blue/20">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center p-8">
            <div className="inline-block animate-hop mb-4">
              <span className="text-5xl">🐰</span>
            </div>
            <h2 className="text-xl font-bold text-easter-dark-purple">Loading the Easter Bunny Tracker...</h2>
            <p className="mt-3 text-gray-600 italic">{fact.text}</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-easter-blue/20">
      <Header />
      
      <main className="flex-1 container mx-auto p-4 pb-8">
        {isEasterDay ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Sidebar with stats */}
            <div className="lg:col-span-1 space-y-4">
              <ProgressTracker />
              <LocationInfo />
              
              {/* Easter Fact Card */}
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-easter-green mb-3">Easter Fun Fact</h2>
                <div className="bg-easter-yellow/40 p-3 rounded-lg">
                  <p className="italic">{fact.text}</p>
                </div>
              </div>
            </div>
            
            {/* Main map area */}
            <div className="lg:col-span-3 flex flex-col">
              <div className="h-[500px] mb-4">
                <Map />
              </div>
              
              {/* Current location banner */}
              {currentPosition?.currentCity && (
                <div className="mb-8 bg-easter-pink text-white p-3 rounded-lg text-center animate-pulse">
                  <p className="font-bold">
                    The Easter Bunny is currently in {currentPosition.currentCity.name}, {currentPosition.currentCity.country}!
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg">
            <SleepingBunny />
          </div>
        )}
      </main>
      
      <Footer />
      <DebugInfo />
    </div>
  );
}

export default App;