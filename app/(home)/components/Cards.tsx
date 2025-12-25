import { useRef } from "react";
import { DraggableCardBody, DraggableCardContainer } from "@/components/ui/draggable-card";

export default function Cards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const items = [
    {
      title: "Diamond",
      image:
        "https://freepngimg.com/save/19496-minecraft-diamond-png/605x497",
    },
    {
      title: "Diamond",
      image:
        "https://freepngimg.com/save/19496-minecraft-diamond-png/605x497",
    },
    {
      title: "Diamond",
      image:
        "https://freepngimg.com/save/19496-minecraft-diamond-png/605x497",
    },
    {
      title: "Diamond",
      image:
        "https://freepngimg.com/save/19496-minecraft-diamond-png/605x497",
    },
    {
      title: "Diamond",
      image:
        "https://freepngimg.com/save/19496-minecraft-diamond-png/605x497",
    }
  ];
  return (
    <DraggableCardContainer ref={containerRef} className="border-2 border-red-500 absolute top-[125vh] flex h-[50vh] w-full items-center justify-center overflow-clip gap-5">
      {items.map((item, index) => (
        <DraggableCardBody key={index} constraintsRef={containerRef}>
          <img
            src={item.image}
            alt={item.title}
            className="pointer-events-none relative z-10 h-80 object-cover"
          />
          <h3 className="mt-4 text-center text-2xl font-bold text-neutral-700 dark:text-neutral-300">
            {item.title}
          </h3>
        </DraggableCardBody>
      ))}
    </DraggableCardContainer>
  );
}
