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

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 100, damping: 20, mass: 0.5 };

  const rotateX = useSpring(
    useTransform(mouseY, [-300, 300], [20, -20]),
    springConfig,
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-300, 300], [-20, 20]),
    springConfig,
  );

  const glareOpacity = useSpring(
    useTransform(mouseX, [-300, 0, 300], [0.12, 0, 0.12]),
    springConfig,
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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = cardRef.current?.getBoundingClientRect();
    if (!r) return;
    mouseX.set(e.clientX - (r.left + r.width / 2));
    mouseY.set(e.clientY - (r.top + r.height / 2));
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      drag
      dragConstraints={constraintsRef}
      dragMomentum={false}
      onDragStart={() => {
        stopPhysics();
        mouseX.set(0);
        mouseY.set(0);
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

        startBounce(info.velocity.x, info.velocity.y, {
          maxX: cx + (cr.right  - ca.right),
          minX: cx - (ca.left   - cr.left),
          maxY: cy + (cr.bottom - ca.bottom),
          minY: cy - (ca.top    - cr.top),
        });
      }}
      style={{ x, y }}
      className={cn("relative overflow-hidden rounded-md shadow-2xl backdrop-blur-sm", className)}
    >
      {/* backdrop-blur-sm lives on this outer div (2D-only transform) so it is never
          broken by the 3D rotateX/rotateY on the inner div below */}
      <motion.div
        style={{ rotateX, rotateY }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="absolute inset-0 flex flex-col items-center justify-center p-4"
      >
        {children}
        <motion.div
          style={{ opacity: glareOpacity }}
          className="pointer-events-none absolute inset-0 bg-white select-none"
        />
      </motion.div>
    </motion.div>
  );
};

export const DraggableCardContainer = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => (
  <div ref={ref} className={cn("[perspective:3000px] relative", className)}>
    {children}
  </div>
));
