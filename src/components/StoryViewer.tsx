import { useState, useEffect, useCallback } from 'react';
import { StoryGroup } from '../types';
import ProgressBar from './ProgressBar';
import { X } from 'lucide-react';

interface StoryViewerProps {
  storyGroups: StoryGroup[];
  initialGroupIndex: number;
  onClose: () => void;
  onStoryComplete: (userId: string) => void;
}

const STORY_DURATION = 5000; // 5 seconds

const StoryViewer: React.FC<StoryViewerProps> = ({ 
  storyGroups, 
  initialGroupIndex, 
  onClose,
  onStoryComplete
}) => {
  const [currentGroupIndex, setCurrentGroupIndex] = useState(initialGroupIndex);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const currentGroup = storyGroups[currentGroupIndex];
  const currentStory = currentGroup?.stories[currentStoryIndex];
  
  const totalStories = currentGroup?.stories.length || 0;

  const handleNextStory = useCallback(() => {
    if (currentStoryIndex < totalStories - 1) {
      // Next story in current group
      setCurrentStoryIndex(prev => prev + 1);
    } else if (currentGroupIndex < storyGroups.length - 1) {
      // First story in next group
      onStoryComplete(currentGroup.userId);
      setCurrentGroupIndex(prev => prev + 1);
      setCurrentStoryIndex(0);
    } else {
      // End of all stories
      onStoryComplete(currentGroup.userId);
      onClose();
    }
  }, [currentStoryIndex, totalStories, currentGroupIndex, storyGroups.length, onClose, onStoryComplete, currentGroup]);

  const handlePreviousStory = useCallback(() => {
    if (currentStoryIndex > 0) {
      // Previous story in current group
      setCurrentStoryIndex(prev => prev - 1);
    } else if (currentGroupIndex > 0) {
      // Last story in previous group
      setCurrentGroupIndex(prev => prev - 1);
      const prevGroupStories = storyGroups[currentGroupIndex - 1].stories.length;
      setCurrentStoryIndex(prevGroupStories - 1);
    }
  }, [currentStoryIndex, currentGroupIndex, storyGroups]);

  // Handle key presses
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleNextStory();
      } else if (e.key === 'ArrowLeft') {
        handlePreviousStory();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNextStory, handlePreviousStory, onClose]);

  // Reset loading state when story changes
  useEffect(() => {
    setIsLoading(true);
  }, [currentStory]);

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Close button */}
      <button 
        className="absolute top-4 right-4 z-50 text-white p-2 rounded-full"
        onClick={onClose}
      >
        <X size={24} />
      </button>

      {/* Progress bars */}
      <div className="absolute top-0 left-0 right-0 flex p-2 z-40">
        {currentGroup?.stories.map((_, index) => (
          <ProgressBar
            key={index}
            index={index}
            activeIndex={currentStoryIndex}
            isActive={index === currentStoryIndex && !isPaused && !isLoading}
            duration={STORY_DURATION}
            onComplete={handleNextStory}
          />
        ))}
      </div>

      {/* User info */}
      <div className="absolute top-6 left-4 flex items-center z-40 mt-2">
        <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white">
          <img 
            src={currentStory?.userImage} 
            alt={currentStory?.username} 
            className="w-full h-full object-cover"
          />
        </div>
        <span className="text-white ml-2 font-medium">{currentStory?.username}</span>
      </div>

      {/* Story content */}
      <div className="flex-1 relative">
        {/* Loading indicator */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 z-30">
            <div className="w-12 h-12 border-4 border-gray-600 border-t-white rounded-full animate-spin"></div>
          </div>
        )}

        {/* Story image */}
        {currentStory && (
          <img
            src={currentStory.image}
            alt="Story"
            className="w-full h-full object-contain"
            onLoad={() => setIsLoading(false)}
            onError={() => setIsLoading(false)}
          />
        )}

        {/* Navigation areas */}
        <div 
          className="absolute inset-y-0 left-0 w-1/3 z-20"
          onClick={handlePreviousStory}
        />
        <div 
          className="absolute inset-y-0 right-0 w-1/3 z-20"
          onClick={handleNextStory}
        />
        <div 
          className="absolute inset-y-0 left-1/3 right-1/3 z-20"
          onMouseDown={() => setIsPaused(true)}
          onMouseUp={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        />
      </div>
    </div>
  );
};

export default StoryViewer;