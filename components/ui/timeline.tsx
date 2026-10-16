"use client";
import React, { useEffect, useRef } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data, title = "Experience", subtitle }: { data: TimelineEntry[], title?: string, subtitle?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lightBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number;
    let currentProgress = 0;
    let targetProgress = 0;
    let absoluteTop = 0;
    let scrollDistance = 1;
    let windowHeight = window.innerHeight;
    let isAnimating = false;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

    const updateAnimation = () => {
      if (!lightBarRef.current) return;
      const diff = targetProgress - currentProgress;
      if (Math.abs(diff) < 0.001) {
        currentProgress = targetProgress;
        lightBarRef.current.style.transform = `scaleY(${currentProgress})`;
        lightBarRef.current.style.opacity = currentProgress > 0.01 ? "1" : "0";
        isAnimating = false;
        return;
      }
      currentProgress = reduceMotion ? targetProgress : currentProgress + diff * 0.08;
      lightBarRef.current.style.transform = `scaleY(${currentProgress})`;
      lightBarRef.current.style.opacity = currentProgress > 0.01 ? "1" : "0";
      rafId = requestAnimationFrame(updateAnimation);
    };

    const onScroll = () => {
      const startY = windowHeight * 0.1;
      const currentRectTop = absoluteTop - window.scrollY;
      targetProgress = Math.max(0, Math.min(1, (startY - currentRectTop) / scrollDistance));
      if (!isAnimating) {
        isAnimating = true;
        rafId = requestAnimationFrame(updateAnimation);
      }
    };

    window.addEventListener("resize", measure);
    window.addEventListener("scroll", onScroll, { passive: true });
    setTimeout(() => { measure(); onScroll(); }, 100);
    measure();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="w-full px-6 sm:px-12 md:px-20 text-synthText" ref={containerRef}>
      <div className="max-w-7xl py-20">
        <h2 className="text-3xl md:text-5xl mb-4 font-semibold max-w-4xl synth-heading pointer-events-auto">
          {title}
        </h2>
        {subtitle && (
          <p className="text-synthText/80 text-sm md:text-base max-w-sm pointer-events-auto">{subtitle}</p>
        )}
      </div>

      <div className="relative max-w-7xl pb-20">
        {data.map((item, index) => (
          <div key={index} className="flex justify-start pt-10 md:pt-40 md:gap-10">
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="glass-pill absolute left-2 md:left-2 h-12 w-12 rounded-full bg-synthBlack/70 flex items-center justify-center">
                <div className="h-3.5 w-3.5 rounded-full bg-synthPink shadow-[0_0_14px_4px_rgba(254,83,187,0.75)]" />
              </div>
              <h3 className="hidden md:inline-flex glass-pill ml-20 rounded-full px-5 py-2 text-base font-semibold uppercase tracking-[0.18em] text-synthText pointer-events-auto">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden glass-pill mb-4 inline-flex rounded-full px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.18em] text-synthText pointer-events-auto">
                {item.title}
              </h3>
              <div className="glass-panel [--glass-fill:rgb(26_4_32/0.42)] rounded-xl p-6 md:p-8 pointer-events-auto select-text">
                {item.content}
              </div>
            </div>
          </div>
        ))}
        <div
          className="absolute md:left-[31px] left-[31px] top-0 h-full overflow-hidden w-[3px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-synthPink/25 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <div
            ref={lightBarRef}
            style={{ transformOrigin: "top", transform: "scaleY(0)", opacity: 0 }}
            className="absolute inset-x-0 top-0 h-full w-[3px] bg-gradient-to-t from-synthPink via-synthTeal to-transparent from-[0%] via-[10%] rounded-full will-change-transform"
          />
        </div>
      </div>
    </div>
  );
};
