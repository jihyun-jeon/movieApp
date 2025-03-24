import React, { useState, useEffect, useRef } from 'react';

interface CarouselProps {
  children: React.ReactNode;
  autoPlay?: boolean;
  interval?: number;
  showIndicators?: boolean;
  showArrows?: boolean;
  itemsPerPage?: number;
}

const TRANSITION_DURATION = 300;

const Carousel: React.FC<CarouselProps> = ({
  children,
  autoPlay = false,
  showIndicators = false,
  showArrows = true,
  itemsPerPage = 5,
  interval = 0,
}) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const childrenArray = React.Children.toArray(children);
  const totalItems = childrenArray.length;

  const goToNext = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.ceil(totalItems / itemsPerPage));
    }
  };

  const goToPrev = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + Math.ceil(totalItems / itemsPerPage)) % Math.ceil(totalItems / itemsPerPage),
      );
    }
  };

  const goToSlide = (index: number) => {
    if (!isTransitioning && index !== currentIndex) {
      setIsTransitioning(true);
      setCurrentIndex(index);
    }
  };

  useEffect(() => {
    // 애니메이션이 완료된 300ms 후에, 다음 전환이 가능하도록 처리
    const transitionEndTimer = setTimeout(() => {
      setIsTransitioning(false);
    }, TRANSITION_DURATION);

    return () => clearTimeout(transitionEndTimer);
  }, [currentIndex]);

  const autoPlayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (autoPlay) {
      autoPlayTimerRef.current = setInterval(goToNext, interval);
    }

    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    };
  }, [autoPlay, interval]);

  const itemGroups = [];
  for (let i = 0; i < totalItems; i += itemsPerPage) {
    itemGroups.push(childrenArray.slice(i, i + itemsPerPage));
  }

  return (
    <div className="relative overflow-hidden">
      <div
        className="flex transition-transform ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          transitionDuration: `${TRANSITION_DURATION}ms`,
        }}
      >
        {itemGroups.map((group, idx) => (
          <div key={idx} className="w-full flex-shrink-0">
            <div className="flex">{group}</div>
          </div>
        ))}
      </div>

      {showArrows && (
        <>
          <button
            onClick={goToPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/30 p-2 rounded-full hover:bg-white/50 transition-colors"
            aria-label="이전 슬라이드"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/30 p-2 rounded-full hover:bg-white/50 transition-colors"
            aria-label="다음 슬라이드"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </>
      )}

      {showIndicators && totalItems > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {Array.from({ length: Math.ceil(totalItems / itemsPerPage) }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? 'bg-white' : 'bg-white/50'
              }`}
              aria-label={`슬라이드 ${index + 1}로 이동`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;
