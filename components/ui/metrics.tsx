import React from "react";

// Highlights numbers like "90%", "40+ hours" or "1M+" so results stand out from the prose.
const METRIC = /((?<![\w-])\$?\d[\d,.]*(?:k|M)?(?:\s?TB(?:\/day)?)?\+?%?(?:\/yr)?(?:\s(?:hours?|min|annually|students|repositories|services|engineering hours per (?:year|week)|Kubernetes clusters))?(?!\w))/g;

export function Metrics({ children }: { children: string }) {
  return (
    <>
      {children.split(METRIC).map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="whitespace-nowrap font-semibold text-white">
            {part}
          </strong>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        ),
      )}
    </>
  );
}
