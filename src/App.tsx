import { useState, useEffect } from 'react';
import StoryList from './components/StoryList';
import { StoryGroup } from './types';
import { storyData } from './data/stories';
import { Instagram } from 'lucide-react';

function App() {
  const [stories, setStories] = useState<StoryGroup[]>([]);
  const [loading, setLoading] = useState(true);

  // Simulate fetching data from an API
  useEffect(() => {
    const fetchStories = async () => {
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setStories(storyData);
      } catch (error) {
        console.error('Error fetching stories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-semibold flex items-center">
            <Instagram className="mr-2" /> InstagramStories
          </h1>
        </div>
      </header>

      <main className="container mx-auto">
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="w-8 h-8 border-2 border-gray-600 border-t-white rounded-full animate-spin"></div>
          </div>
        ) : (
          <StoryList storyGroups={stories} />
        )}
      </main>

      <div className="p-4 mt-8">
        <div className="max-w-lg mx-auto">
          <h2 className="text-xl font-semibold mb-4">How to use:</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-300">
            <li>Click on any avatar to view their stories</li>
            <li>Tap the left side to go to the previous story</li>
            <li>Tap the right side to go to the next story</li>
            <li>Tap and hold to pause the current story</li>
            <li>Click the X to exit the viewer</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;