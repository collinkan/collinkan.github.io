"use client";
import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Tilts its children toward the cursor, with a moving glare. Same feel as the skill cards:
 * the perspective lives on the flat wrapper so the 3D rotation never flattens the children.
 */
export const TiltFrame = ({
  children,
  className,
  max = 16,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spring = { stiffness: 100, damping: 20, mass: 0.5 };

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [max, -max]), spring);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-max, max]), spring);
  const glare = useSpring(useTransform(mouseX, [-0.5, 0, 0.5], [0.22, 0, 0.22]), spring);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mouseX.set((e.clientX - (r.left + r.width / 2)) / r.width);
    mouseY.set((e.clientY - (r.top + r.height / 2)) / r.height);
  };
  const onLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div className={cn("[perspective:1400px]", className)} onPointerMove={onMove} onPointerLeave={onLeave}>
      <motion.div ref={ref} style={{ rotateX, rotateY }} className="relative h-full w-full rounded-[inherit]">
        {children}
        <motion.div
          aria-hidden="true"
          style={{ opacity: glare }}
          className="pointer-events-none absolute inset-0 rounded-[inherit] bg-white"
        />
      </motion.div>
    </div>
  );
};
