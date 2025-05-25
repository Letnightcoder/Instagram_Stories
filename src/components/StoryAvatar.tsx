import { useState } from 'react';
import { StoryGroup } from '../types';

interface StoryAvatarProps {
  storyGroup: StoryGroup;
  onClick: () => void;
  viewed: boolean;
}

const StoryAvatar: React.FC<StoryAvatarProps> = ({ storyGroup, onClick, viewed }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div 
      className="flex flex-col items-center px-2 cursor-pointer"
      onClick={onClick}
    >
      <div className={`relative rounded-full p-[2px] ${viewed ? 'bg-gray-500' : 'bg-gradient-to-tr from-yellow-400 to-fuchsia-600'}`}>
        <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-black">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
              <div className="w-6 h-6 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
            </div>
          )}
          <img 
            src={storyGroup.userImage} 
            alt={storyGroup.username}
            className={`w-full h-full object-cover ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
          />
        </div>
      </div>
      <span className="text-xs mt-1 max-w-16 truncate text-white">
        {storyGroup.username}
      </span>
    </div>
  );
};

export default StoryAvatar;