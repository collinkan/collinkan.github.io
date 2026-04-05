"use client";

import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";

export default function GridBackground() {
    return (
        <div className="fixed inset-0">
            <div className="absolute top-[35vh] bottom-0 w-full h-auto perspective-[1250px] overflow-hidden">
                <div
                    className="
                    absolute
                    w-full
                    h-full
                    transform-gpu
                    origin-top
                    rotate-x-[65deg]"
                >
                    <BackgroundRippleEffect rows={13} cols={21} cellSize={82.3} />
                </div>
            </div>
        </div>
    );
};
