import { useTracker } from '../../hooks/useTracker';

const SleepingBunny = () => {
  const { nextEasterFormatted } = useTracker();

  return (
    <div className="flex flex-col items-center justify-center py-8 px-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-easter-purple mb-3">
          The Easter Bunny is Sleeping
        </h2>
        <p className="text-gray-600 mb-4">
          The Easter Bunny is resting until the next Easter Sunday!
        </p>
        <p className="text-lg font-medium text-easter-pink">
          Come back on {nextEasterFormatted} to track the bunny's journey!
        </p>
      </div>
      
      <div className="w-full max-w-md relative">
        <div className="bg-easter-blue/20 rounded-full w-64 h-64 mx-auto flex items-center justify-center">
          <div className="relative">
            {/* Sleeping bunny emoji with zzz animation */}
            <span className="text-8xl">🐰</span>
            <div className="absolute -top-4 -right-4 animate-bounce">
              <span className="text-3xl">💤</span>
            </div>
          </div>
        </div>
        
        {/* Easter eggs decoration */}
        <div className="absolute bottom-0 left-0 transform -translate-x-1/4">
          <span className="text-4xl">🥚</span>
        </div>
        <div className="absolute bottom-4 right-0 transform translate-x-1/4">
          <span className="text-4xl">🥚</span>
        </div>
        <div className="absolute top-4 right-8">
          <span className="text-3xl">🥕</span>
        </div>
      </div>
      
      <div className="mt-8 bg-white p-4 rounded-lg shadow-md max-w-lg">
        <h3 className="font-bold text-lg text-easter-green mb-2">Fun Fact</h3>
        <p>
          The Easter Bunny works very hard one day a year, delivering baskets
          to children around the world! For the rest of the year, the bunny rests,
          prepares Easter eggs, and practices hopping skills.
        </p>
      </div>
    </div>
  );
};

export default SleepingBunny;