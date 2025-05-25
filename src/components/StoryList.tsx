import { useState } from 'react';
import { StoryGroup } from '../types';
import StoryAvatar from './StoryAvatar';
import StoryViewer from './StoryViewer';

interface StoryListProps {
  storyGroups: StoryGroup[];
}

const StoryList: React.FC<StoryListProps> = ({ storyGroups }) => {
  const [selectedGroupIndex, setSelectedGroupIndex] = useState<number | null>(null);
  const [viewedGroups, setViewedGroups] = useState<Set<string>>(new Set());

  const openStoryViewer = (index: number) => {
    setSelectedGroupIndex(index);
  };

  const closeStoryViewer = () => {
    setSelectedGroupIndex(null);
  };

  const markAsViewed = (userId: string) => {
    setViewedGroups(prev => new Set([...prev, userId]));
  };

  return (
    <div className="relative w-full">
      <div className="py-4 overflow-x-auto scrollbar-hide">
        <div className="flex space-x-2 px-2">
          {storyGroups.map((storyGroup, index) => (
            <StoryAvatar
              key={storyGroup.userId}
              storyGroup={storyGroup}
              onClick={() => openStoryViewer(index)}
              viewed={viewedGroups.has(storyGroup.userId)}
            />
          ))}
        </div>
      </div>

      {selectedGroupIndex !== null && (
        <StoryViewer
          storyGroups={storyGroups}
          initialGroupIndex={selectedGroupIndex}
          onClose={closeStoryViewer}
          onStoryComplete={markAsViewed}
        />
      )}
    </div>
  );
};

export default StoryList;