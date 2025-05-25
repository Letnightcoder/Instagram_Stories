import { useEffect, useState } from 'react';

interface ProgressBarProps {
  duration: number;
  index: number;
  activeIndex: number;
  isActive: boolean;
  onComplete: () => void;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  duration, 
  index, 
  activeIndex, 
  isActive, 
  onComplete 
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let startTime: number;
    
    if (isActive) {
      setProgress(0);
      startTime = Date.now();
      
      interval = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        const newProgress = Math.min((elapsedTime / duration) * 100, 100);
        
        setProgress(newProgress);
        
        if (newProgress >= 100) {
          clearInterval(interval);
          onComplete();
        }
      }, 16); // ~60fps
    } else if (index < activeIndex) {
      // If this bar is for a previous story, show it as complete
      setProgress(100);
    } else if (index > activeIndex) {
      // If this bar is for a future story, show it as not started
      setProgress(0);
    }
    
    return () => clearInterval(interval);
  }, [isActive, duration, onComplete, index, activeIndex]);

  return (
    <div className="h-1 bg-gray-600 rounded-full overflow-hidden flex-1 mx-0.5">
      <div 
        className="h-full bg-white transition-all duration-100 ease-linear"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;