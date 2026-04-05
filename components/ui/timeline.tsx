"use client";
import React, { useEffect, useRef } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lightBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number;
    let currentProgress = 0;
    let absoluteTop = 0;
    let scrollDistance = 1;
    let windowHeight = window.innerHeight;

    const measure = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        absoluteTop = rect.top + window.scrollY;
        windowHeight = window.innerHeight;
        const startY = windowHeight * 0.1;
        const endY = windowHeight * 0.5;
        scrollDistance = Math.max(1, rect.height - (endY - startY));
      }
    };

    window.addEventListener("resize", measure);
    setTimeout(measure, 100);
    measure();

    const updateAnimation = () => {
      if (containerRef.current && lightBarRef.current) {
        const currentScrollY = window.scrollY;
        
        const startY = windowHeight * 0.1;
        const currentRectTop = absoluteTop - currentScrollY;
        
        let targetProgress = (startY - currentRectTop) / scrollDistance;
        targetProgress = Math.max(0, Math.min(1, targetProgress));
        
        currentProgress += (targetProgress - currentProgress) * 0.08;
        
        lightBarRef.current.style.transform = `scaleY(${currentProgress})`;
        lightBarRef.current.style.opacity = currentProgress > 0.01 ? "1" : "0";
      }
      rafId = requestAnimationFrame(updateAnimation);
    };
    
    rafId = requestAnimationFrame(updateAnimation);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div className="w-full font-sans px-20 text-synthText" ref={containerRef}>
      <div className="max-w-7xl py-20">
        <h2 className="text-5xl mb-4 font-semibold max-w-4xl text-synthText">
          Experience
        </h2>
        <p className="text-synthText/80 text-sm md:text-base max-w-sm">
          My journey as a software engineer.
        </p>
      </div>

      <div className="relative max-w-7xl pb-20">
        {data.map((item, index) => (
          <div key={index} className="flex justify-start pt-10 md:pt-40 md:gap-10">
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-background flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-synthYellow border border-border p-2" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-synthText">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-synthText">
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}
        <div
          className="absolute md:left-8 left-8 top-0 h-full overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-synthText/20 dark:via-synthText/20 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <div
            ref={lightBarRef}
            style={{ transformOrigin: "top", transform: "scaleY(0)", opacity: 0 }}
            className="absolute inset-x-0 top-0 h-full w-[2px] bg-gradient-to-t from-synthYellow via-synthTeal to-transparent from-[0%] via-[10%] rounded-full will-change-transform"
          />
        </div>
      </div>
    </div>
  );
};