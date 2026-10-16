"use client";

import { useCallback, useRef, useState } from "react";

type Point = [number, number]
type Facet = { points: string; fill: string }

const VIEW_W = 1440
const VIEW_H = 190

function makeRand(seed: number) {
    let s = seed
    return () => {
        s = (s * 1664525 + 1013904223) % 4294967296
        return s / 4294967296
    }
}

function mix(a: string, b: string, t: number): string {
    const pa = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16))
    const pb = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16))
    return `rgb(${pa.map((v, i) => Math.round(v + (pb[i] - v) * t)).join(",")})`
}

// Deterministic jagged ridge: tall at the edges, low in the middle so the sun stays clear.
function buildRidge(seed: number, base: number, amp: number, step: number): Point[] {
    const rand = makeRand(seed)
    const pts: Point[] = []
    for (let x = 0; x <= VIEW_W; x += step) {
        const t = Math.abs(x - VIEW_W / 2) / (VIEW_W / 2)
        const envelope = 0.3 + 0.7 * Math.pow(t, 1.2)
        const peak = 0.55 * rand() ** 1.3 + 0.45 * Math.abs(Math.sin(x / 95 + seed))
        pts.push([x, base - amp * envelope * (0.25 + 0.75 * peak)])
    }
    return pts
}

// Low-poly faces: rows of jittered points under the ridge, split into triangles and shaded
// by depth, with the sun-facing (rising) slopes lit brighter.
function buildFacets(ridge: Point[], seed: number, rows: number, top: string, bottom: string): Facet[] {
    const rand = makeRand(seed + 1000)
    const last = ridge.length - 1
    const grid: Point[][] = [ridge]
    for (let r = 1; r <= rows; r++) {
        const k = r / rows
        grid.push(
            ridge.map(([x, y], i) => {
                if (r === rows) return [x, VIEW_H] as Point
                const jx = i === 0 || i === last ? 0 : (rand() - 0.5) * 30
                return [x + jx, y + (VIEW_H - y) * k + (rand() - 0.5) * 22] as Point
            }),
        )
    }
    const facets: Facet[] = []
    for (let r = 0; r < rows; r++) {
        for (let i = 0; i < last; i++) {
            const a = grid[r][i], b = grid[r][i + 1], c = grid[r + 1][i], d = grid[r + 1][i + 1]
            const flip = (i + r) % 2 === 0
            const tris: Point[][] = flip ? [[a, b, c], [b, d, c]] : [[a, b, d], [a, d, c]]
            tris.forEach((tri, n) => {
                const depth = (r + 0.5 + n * 0.4) / rows
                const slope = (ridge[i + 1][1] - ridge[i][1]) / 60 // negative while rising
                const lit = Math.max(-0.2, Math.min(0.2, -slope * 0.15))
                const t = Math.max(0, Math.min(1, depth * 0.85 + (rand() - 0.5) * 0.35 - lit * (1 - depth)))
                facets.push({ points: tri.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" "), fill: mix(top, bottom, t) })
            })
        }
    }
    return facets
}

const toPath = (pts: Point[]) => pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ")

const RIDGE_BACK = buildRidge(7, 185, 175, 36)
const RIDGE_FRONT = buildRidge(21, 190, 150, 42)
const FACETS_BACK = buildFacets(RIDGE_BACK, 7, 4, "#2b2a7a", "#0d0221")
const FACETS_FRONT = buildFacets(RIDGE_FRONT, 21, 4, "#5a1a86", "#0d0221")

type Ripple = { id: number; x: number; y: number };

export default function GridBackground() {
    const planeRef = useRef<HTMLDivElement>(null);
    const nextId = useRef(0);
    const [ripples, setRipples] = useState<Ripple[]>([]);

    // offsetX/Y are already expressed in the plane's own (pre-perspective) coordinates,
    // so the glow and ripples stay circular on the floor and look elliptical on screen.
    const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
        const plane = planeRef.current;
        if (!plane || e.target !== plane) return;
        plane.style.setProperty("--mx", `${e.nativeEvent.offsetX}px`);
        plane.style.setProperty("--my", `${e.nativeEvent.offsetY}px`);
        plane.dataset.hover = "true";
    }, []);

    const handlePointerLeave = useCallback(() => {
        if (planeRef.current) planeRef.current.dataset.hover = "false";
    }, []);

    const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
        if (e.target !== planeRef.current) return;
        const id = nextId.current++;
        setRipples((prev) => [...prev.slice(-5), { id, x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY }]);
    }, []);

    const removeRipple = useCallback((id: number) => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
    }, []);

    return (
        <div className="fixed inset-0">
            <div
                className="absolute top-[35vh] bottom-0 w-full overflow-hidden"
                style={{ perspective: "max(1250px, 140vh)" }}
            >
                {/* The floor is wider and deeper than any viewport, so its edges never show.
                    Perspective scales with viewport height so tall screens stay covered. */}
                <div
                    ref={planeRef}
                    data-hover="false"
                    className="grid-plane absolute top-0 left-1/2 w-[130vw] -ml-[65vw] transform-gpu"
                    style={{
                        height: "max(1213px, 136vh)",
                        transformOrigin: "top",
                        transform: "rotateX(65deg)",
                    }}
                    onPointerMove={handlePointerMove}
                    onPointerLeave={handlePointerLeave}
                    onPointerDown={handlePointerDown}
                >
                    <div className="grid-fade pointer-events-none absolute inset-0">
                        <div className="grid-lines absolute inset-0" />
                        <div className="grid-glow absolute inset-0" />
                        {ripples.map((r) => (
                            <div
                                key={r.id}
                                className="grid-ripple absolute inset-0"
                                style={{ "--rx": `${r.x}px`, "--ry": `${r.y}px` } as React.CSSProperties}
                                onAnimationEnd={() => removeRipple(r.id)}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Neon mountain ridge sitting on the horizon, low in the middle so the sun stays clear */}
            <svg
                aria-hidden="true"
                className="pointer-events-none absolute left-0 top-[35vh] h-[21vh] min-h-[120px] w-full -translate-y-full overflow-visible"
                viewBox="0 0 1440 190"
                preserveAspectRatio="none"
            >
                {/* Back ridge: cool blue-violet facets with a dim cyan outline, for depth */}
                <g stroke="#2de2e6" strokeOpacity="0.12" strokeWidth="0.6">
                    {FACETS_BACK.map((f, i) => (
                        <polygon key={i} points={f.points} fill={f.fill} vectorEffect="non-scaling-stroke" />
                    ))}
                </g>
                <path
                    d={toPath(RIDGE_BACK)}
                    fill="none"
                    stroke="#2de2e6"
                    strokeOpacity="0.55"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                    style={{ filter: "drop-shadow(0 0 4px rgba(45,226,230,0.7))" }}
                />
                {/* Front ridge: magenta facets with a pink outline */}
                <g stroke="#fe53bb" strokeOpacity="0.2" strokeWidth="0.6">
                    {FACETS_FRONT.map((f, i) => (
                        <polygon key={i} points={f.points} fill={f.fill} vectorEffect="non-scaling-stroke" />
                    ))}
                </g>
                <path
                    d={toPath(RIDGE_FRONT)}
                    fill="none"
                    stroke="#fe53bb"
                    strokeWidth="1.5"
                    vectorEffect="non-scaling-stroke"
                    style={{ filter: "drop-shadow(0 0 5px rgba(254,83,187,0.9))" }}
                />
            </svg>

            {/* Atmospheric haze where the ridge meets the horizon, strongest while the sun is up */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute left-0 top-[35vh] h-[10vh] w-full -translate-y-full bg-gradient-to-t from-synthPink/30 via-synthOrange/10 to-transparent mix-blend-screen"
                style={{ opacity: "calc(0.35 + 0.65 * var(--sun-lift, 1))" }}
            />

            {/* Horizon glow: where the sun sets into the floor */}
            <div className="pointer-events-none absolute top-[35vh] left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-synthPink to-transparent shadow-[0_0_28px_6px_rgba(254,83,187,0.4)]" style={{ opacity: "calc(0.45 + 0.55 * var(--sun-lift, 1))" }} />
        </div>
    );
}
