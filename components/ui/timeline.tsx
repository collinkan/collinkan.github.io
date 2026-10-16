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
    const container = containerRef.current;
    const bar = lightBarRef.current;
    const track = bar?.parentElement;
    if (!container || !bar || !track) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dots = Array.from(container.querySelectorAll<HTMLElement>("[data-timeline-dot]"));

    let rafId = 0;
    let isAnimating = false;
    let inView = true;
    let current = 0;
    let target = 0;
    let containerTop = 0; // document-space, cached
    let scrollDistance = 1;
    let trackTop = 0; // document-space, cached
    let trackHeight = 1;
    let viewportH = window.innerHeight;
    let lastScale = -1;
    let lastOpacity = "";

    // Layout is read here only (mount, resize, content resize), never inside the scroll path.
    const measure = () => {
      const rect = container.getBoundingClientRect();
      const trackRect = track.getBoundingClientRect();
      containerTop = rect.top + window.scrollY;
      trackTop = trackRect.top + window.scrollY;
      trackHeight = Math.max(1, trackRect.height);
      viewportH = window.innerHeight;
      scrollDistance = Math.max(1, rect.height - viewportH * 0.4);
      onScroll();
    };

    // Dots are sticky, so their viewport position changes while pinned. Read every rect first and
    // write every attribute second, so the browser lays out once per update instead of per dot.
    const updateDots = () => {
      const headY = trackTop - window.scrollY + current * trackHeight;
      const centres = dots.map((dot) => {
        const r = dot.getBoundingClientRect();
        return r.top + r.height / 2;
      });
      dots.forEach((dot, i) => {
        const active = String(current > 0.001 && headY >= centres[i]);
        if (dot.dataset.active !== active) dot.dataset.active = active;
      });
    };

    const paint = () => {
      const scale = Math.round(current * 1000) / 1000;
      if (scale !== lastScale) {
        lastScale = scale;
        bar.style.transform = `scaleY(${scale})`;
        const opacity = scale > 0.01 ? "1" : "0";
        if (opacity !== lastOpacity) {
          lastOpacity = opacity;
          bar.style.opacity = opacity;
        }
      }
      updateDots();
    };

    const tick = () => {
      const diff = target - current;
      if (Math.abs(diff) < 0.001) {
        current = target;
        isAnimating = false;
      } else {
        current = reduceMotion ? target : current + diff * 0.08;
        rafId = requestAnimationFrame(tick);
      }
      paint();
    };

    function onScroll() {
      if (!inView) return;
      const startY = viewportH * 0.1;
      target = Math.max(0, Math.min(1, (startY - (containerTop - window.scrollY)) / scrollDistance));
      if (!isAnimating) {
        isAnimating = true;
        rafId = requestAnimationFrame(tick);
      }
    }

    // Do no work at all while the timeline is off screen.
    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) onScroll();
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(container);

    const ro = new ResizeObserver(measure);
    ro.observe(container);

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);

    return () => {
      cancelAnimationFrame(rafId);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
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
              <div
                data-timeline-dot
                data-active="false"
                className="group/dot glass-pill absolute left-2 md:left-2 h-12 w-12 rounded-full bg-synthBlack/70 flex items-center justify-center"
              >
                <div className="h-3.5 w-3.5 rounded-full bg-synthPink shadow-[0_0_14px_4px_rgba(254,83,187,0.75)] transition-[background-color,box-shadow] duration-500 group-data-[active=true]/dot:bg-synthTeal group-data-[active=true]/dot:shadow-[0_0_16px_5px_rgba(45,226,230,0.8)]" />
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
