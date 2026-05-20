"use client";
import { cn } from "@/lib/utils";
import React, { useRef, useEffect, forwardRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";

export const DraggableCardBody = ({
  className,
  children,
  constraintsRef,
}: {
  className?: string;
  children?: React.ReactNode;
  constraintsRef?: React.RefObject<HTMLDivElement | null>;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rafRef = useRef<number | null>(null);

  // Glare follows mouse X for a subtle shine — not a 3D transform, so it
  // doesn't trigger GPU compositing and doesn't break backdrop-filter.
  const glareX = useMotionValue(0);
  const glareOpacity = useSpring(
    useTransform(glareX, [-300, 0, 300], [0.12, 0, 0.12]),
    { stiffness: 100, damping: 20, mass: 0.5 },
  );

  useEffect(() => () => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
  }, []);

  const stopPhysics = () => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  const startBounce = (
    velX: number,
    velY: number,
    bounds: { minX: number; maxX: number; minY: number; maxY: number },
  ) => {
    stopPhysics();
    // Framer Motion reports velocity in px/s; convert to px/frame at ~60 fps
    let vx = velX / 60;
    let vy = velY / 60;
    const RESTITUTION = 0.6;
    const FRICTION = 0.985;

    const step = () => {
      let cx = x.get() + vx;
      let cy = y.get() + vy;

      if (cx > bounds.maxX) { cx = bounds.maxX; vx = -Math.abs(vx) * RESTITUTION; }
      else if (cx < bounds.minX) { cx = bounds.minX; vx =  Math.abs(vx) * RESTITUTION; }
      if (cy > bounds.maxY) { cy = bounds.maxY; vy = -Math.abs(vy) * RESTITUTION; }
      else if (cy < bounds.minY) { cy = bounds.minY; vy =  Math.abs(vy) * RESTITUTION; }

      vx *= FRICTION;
      vy *= FRICTION;
      x.set(cx);
      y.set(cy);

      if (Math.abs(vx) > 0.15 || Math.abs(vy) > 0.15) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        rafRef.current = null;
      }
    };

    rafRef.current = requestAnimationFrame(step);
  };

  return (
    <motion.div
      ref={cardRef}
      drag
      dragConstraints={constraintsRef}
      dragMomentum={false}
      onDragStart={() => {
        stopPhysics();
        document.body.style.cursor = "grabbing";
      }}
      onDragEnd={(_e, info) => {
        document.body.style.cursor = "default";
        const container = constraintsRef?.current;
        const card = cardRef.current;
        if (!container || !card) return;

        const cr = container.getBoundingClientRect();
        const ca = card.getBoundingClientRect();
        const cx = x.get();
        const cy = y.get();

        // Measure how far the card can travel in each direction right now
        startBounce(info.velocity.x, info.velocity.y, {
          maxX: cx + (cr.right  - ca.right),
          minX: cx - (ca.left   - cr.left),
          maxY: cy + (cr.bottom - ca.bottom),
          minY: cy - (ca.top    - cr.top),
        });
      }}
      style={{ x, y }}
      onMouseMove={(e) => {
        const r = cardRef.current?.getBoundingClientRect();
        if (r) glareX.set(e.clientX - (r.left + r.width / 2));
      }}
      onMouseLeave={() => glareX.set(0)}
      className={cn("relative overflow-hidden rounded-md p-6 shadow-2xl", className)}
    >
      {children}
      <motion.div
        style={{ opacity: glareOpacity }}
        className="pointer-events-none absolute inset-0 bg-white select-none"
      />
    </motion.div>
  );
};

export const DraggableCardContainer = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => (
  <div ref={ref} className={cn("", className)}>
    {children}
  </div>
));
